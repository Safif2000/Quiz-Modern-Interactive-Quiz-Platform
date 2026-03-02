import { Check, X, RotateCcw, Trophy } from "lucide-react";
import { useQuiz } from "../../context/QuizContext";
import { QUIZ_DATA } from "../../data/quizData";

export default function ResultsScreen() {
  const { answeredQuestions, restartQuiz } = useQuiz();

  let correct = 0;
  QUIZ_DATA.forEach((q) => {
    if (answeredQuestions.get(q.id) === q.correct) correct++;
  });

  const total = QUIZ_DATA.length;
  const score = Math.round((correct / total) * 100);

  const grade =
    score >= 90 ? { label: "Excellent!", color: "text-emerald-600", bg: "bg-emerald-50" }
    : score >= 70 ? { label: "Good Job!", color: "text-blue-600", bg: "bg-blue-50" }
    : score >= 50 ? { label: "Keep Practicing!", color: "text-amber-600", bg: "bg-amber-50" }
    : { label: "Try Again!", color: "text-red-600", bg: "bg-red-50" };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
      {/* Trophy */}
      <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Trophy size={36} className="text-amber-500" />
      </div>

      <h2
        className="text-2xl font-bold text-gray-900 mb-1"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        Quiz Completed!
      </h2>
      <p className={`text-lg font-semibold mb-6 ${grade.color}`}>{grade.label}</p>

      {/* Score circle */}
      <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${grade.bg} mb-6`}>
        <div>
          <p className={`text-4xl font-bold ${grade.color}`}>{score}%</p>
          <p className="text-xs text-gray-500 mt-1">{correct}/{total} correct</p>
        </div>
      </div>

      {/* Per-question result list */}
      <div className="text-left space-y-2 mb-8 max-h-64 overflow-y-auto scrollbar-thin">
        {QUIZ_DATA.map((q) => {
          const userAnswer = answeredQuestions.get(q.id);
          const isCorrect = userAnswer === q.correct;
          const wasAnswered = !!userAnswer;

          return (
            <div
              key={q.id}
              className={`flex items-start gap-3 p-3 rounded-xl border text-sm
                ${isCorrect ? "border-emerald-100 bg-emerald-50" : wasAnswered ? "border-red-100 bg-red-50" : "border-gray-100 bg-gray-50"}`}
            >
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5
                  ${isCorrect ? "bg-emerald-500" : wasAnswered ? "bg-red-400" : "bg-gray-300"}`}
              >
                {isCorrect ? (
                  <Check size={12} className="text-white" strokeWidth={3} />
                ) : (
                  <X size={12} className="text-white" strokeWidth={3} />
                )}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">Q{q.id}: {q.question}</p>
                {!wasAnswered && (
                  <p className="text-xs text-gray-400 mt-0.5">Not answered</p>
                )}
                {wasAnswered && !isCorrect && (
                  <p className="text-xs text-red-500 mt-0.5">
                    Your answer: {userAnswer} · Correct: {q.correct}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Restart button */}
      <button
        onClick={restartQuiz}
        className="flex items-center gap-2 mx-auto px-8 py-3 bg-emerald-600 text-white text-sm font-semibold
                   rounded-xl hover:bg-emerald-700 active:bg-emerald-800 transition-all shadow-md shadow-emerald-200
                   hover:shadow-lg hover:-translate-y-0.5"
      >
        <RotateCcw size={15} />
        Restart Quiz
      </button>
    </div>
  );
}
