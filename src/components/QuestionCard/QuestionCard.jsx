import { Check, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { useQuiz } from "../../context/QuizContext";
import { QUIZ_DATA } from "../../data/quizData";

export default function QuestionCard() {
  const {
    currentQ,
    selectedOption,
    submitted,
    quizEnded,
    question,
    handleSelect,
    handleSubmit,
    goNext,
    goPrev,
  } = useQuiz();

  const totalQuestions = QUIZ_DATA.length;
  const hasOptions = question.options.length > 0;

  return (
    <div
      key={currentQ}
      style={{ animation: "fadeInUp 0.35s ease forwards" }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8"
    >
      {/* Question number badge + title */}
      <div className="flex items-start gap-3 mb-8">
        <span className="flex-shrink-0 mt-1 w-8 h-8 rounded-lg bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shadow-sm">
          {String(question.id).padStart(2, "0")}
        </span>
        <h1
          className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          {question.question}
        </h1>
      </div>

      {/* Options */}
      {hasOptions ? (
        <div className="space-y-3 mb-8">
          {question.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isCorrect = submitted && opt.id === question.correct;
            const isWrong = submitted && isSelected && opt.id !== question.correct;

            let cardClass =
              "w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 text-left transition-all duration-200 group ";
            let badgeClass =
              "flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200 ";

            if (isCorrect) {
              cardClass += "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-md shadow-emerald-100";
              badgeClass += "bg-emerald-500 text-white";
            } else if (isWrong) {
              cardClass += "border-red-400 bg-red-50 text-red-700";
              badgeClass += "bg-red-400 text-white";
            } else if (isSelected) {
              cardClass += "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md shadow-emerald-100";
              badgeClass += "bg-emerald-500 text-white";
            } else {
              cardClass +=
                !submitted && !quizEnded
                  ? "border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-sm text-gray-700 cursor-pointer"
                  : "border-gray-200 bg-white text-gray-500 cursor-default";
              badgeClass +=
                !submitted && !quizEnded
                  ? "bg-gray-100 text-gray-600 group-hover:bg-emerald-100 group-hover:text-emerald-700"
                  : "bg-gray-100 text-gray-400";
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                disabled={submitted || quizEnded}
                className={cardClass}
              >
                {/* Letter badge */}
                <span className={badgeClass}>
                  {isCorrect ? <Check size={15} strokeWidth={3} /> : opt.id}
                </span>

                {/* Option text */}
                <span className="text-sm font-medium flex-1">{opt.text}</span>

                {/* Radio indicator (before submission) */}
                {isSelected && !submitted && (
                  <span className="w-5 h-5 border-2 border-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                  </span>
                )}

                {/* Result icon (after submission) */}
                {submitted && isSelected && isWrong && (
                  <span className="text-red-400 font-bold text-lg flex-shrink-0">✗</span>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mb-8 p-10 bg-gray-50 rounded-xl text-gray-400 text-center text-sm">
          Question content not available
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Previous */}
        <button
          onClick={goPrev}
          disabled={currentQ === 0}
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-gray-600
                     border border-gray-300 rounded-xl hover:bg-gray-50 active:bg-gray-100
                     disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={15} />
          Previous
        </button>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!selectedOption || submitted || quizEnded || !hasOptions}
          className={`flex items-center gap-2 px-7 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200
            ${
              submitted
                ? "bg-emerald-100 text-emerald-600 cursor-default"
                : !selectedOption || quizEnded || !hasOptions
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-md shadow-emerald-200 hover:shadow-lg hover:-translate-y-0.5"
            }`}
        >
          {submitted ? (
            <>
              <Check size={15} strokeWidth={3} />
              Submitted
            </>
          ) : (
            <>
              <Send size={14} />
              Submit Answer
            </>
          )}
        </button>

        {/* Next */}
        {currentQ < totalQuestions - 1 && (
          <button
            onClick={goNext}
            className="flex items-center gap-1.5 ml-auto px-4 py-2.5 text-sm font-semibold text-emerald-700
                       border-2 border-emerald-200 rounded-xl hover:bg-emerald-50 active:bg-emerald-100 transition-all"
          >
            Next
            <ChevronRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
