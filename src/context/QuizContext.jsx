import { createContext, useContext, useState, useEffect } from "react";
import { QUIZ_DATA, TOTAL_TIME } from "../data/quizData";

const QuizContext = createContext(null);

export function QuizProvider({ children }) {
  const [quizStarted,       setQuizStarted]       = useState(false);
  const [currentQ,          setCurrentQ]          = useState(0);
  const [selectedOption,    setSelectedOption]    = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Map());
  const [timeLeft,          setTimeLeft]          = useState(TOTAL_TIME);
  const [quizEnded,         setQuizEnded]         = useState(false);
  const [submitted,         setSubmitted]         = useState(false);
  const [quizFinished,      setQuizFinished]      = useState(false);

  const question     = QUIZ_DATA[currentQ];
  const totalAnswered = answeredQuestions.size;
  const progressPct  = (totalAnswered / QUIZ_DATA.length) * 100;

  // ── Timer (only runs when quiz is active) ─────────────────────────────────
  useEffect(() => {
    if (!quizStarted || quizEnded || quizFinished) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(interval); setQuizEnded(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [quizStarted, quizEnded, quizFinished]);

  // ── Restore selection when navigating ─────────────────────────────────────
  useEffect(() => {
    if (!quizStarted) return;
    const prev = answeredQuestions.get(question.id);
    setSelectedOption(prev || null);
    setSubmitted(!!prev);
  }, [currentQ, quizStarted]);

  // ── Actions ────────────────────────────────────────────────────────────────
  const startQuiz = () => setQuizStarted(true);

  const handleSelect = (optionId) => {
    if (submitted || quizEnded || quizFinished) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption || quizEnded || quizFinished) return;
    const updated = new Map(answeredQuestions).set(question.id, selectedOption);
    setAnsweredQuestions(updated);
    setSubmitted(true);
    if (currentQ < QUIZ_DATA.length - 1) {
      setTimeout(() => setCurrentQ((q) => q + 1), 800);
    } else {
      setTimeout(() => setQuizFinished(true), 800);
    }
  };

  const goToQuestion = (index) => setCurrentQ(index);
  const goNext = () => { if (currentQ < QUIZ_DATA.length - 1) setCurrentQ((q) => q + 1); };
  const goPrev = () => { if (currentQ > 0) setCurrentQ((q) => q - 1); };

  const restartQuiz = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setAnsweredQuestions(new Map());
    setTimeLeft(TOTAL_TIME);
    setQuizEnded(false);
    setSubmitted(false);
    setQuizFinished(false);
    setQuizStarted(false); // show instructions modal again
  };

  return (
    <QuizContext.Provider value={{
      quizStarted,
      currentQ,
      selectedOption,
      answeredQuestions,
      timeLeft,
      quizEnded,
      submitted,
      quizFinished,
      question,
      totalAnswered,
      progressPct,
      startQuiz,
      handleSelect,
      handleSubmit,
      goToQuestion,
      goNext,
      goPrev,
      restartQuiz,
    }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used inside QuizProvider");
  return ctx;
}
