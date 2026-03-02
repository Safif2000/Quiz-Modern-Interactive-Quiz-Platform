import { Check, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useQuiz } from "../../context/QuizContext";
import { QUIZ_DATA } from "../../data/quizData";

export default function QuizProgress() {
  const { currentQ, answeredQuestions, goToQuestion } = useQuiz();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span
          className="text-sm font-semibold text-gray-800"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          Quiz Questions List
        </span>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-all"
          aria-label={collapsed ? "Expand list" : "Collapse list"}
        >
          <ChevronUp
            size={15}
            className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Question list */}
      {!collapsed && (
        <div className="p-3 space-y-1.5 max-h-80 overflow-y-auto scrollbar-thin">
          {QUIZ_DATA.map((q, i) => {
            const answered = answeredQuestions.has(q.id);
            const isCurrent = currentQ === i;

            return (
              <button
                key={q.id}
                onClick={() => goToQuestion(i)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium
                            transition-all duration-200 group
                  ${
                    isCurrent
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm"
                      : answered
                      ? "bg-gray-50 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                      : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                  }`}
              >
                <span>Quiz question {q.id}</span>

                {answered ? (
                  <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Check size={10} className="text-white" strokeWidth={3} />
                  </span>
                ) : isCurrent ? (
                  <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                ) : (
                  <span className="w-5 h-5 border-2 border-gray-200 rounded-full flex-shrink-0 group-hover:border-gray-300" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Summary footer */}
      {!collapsed && (
        <div className="border-t border-gray-50 px-4 py-2.5">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{answeredQuestions.size} answered</span>
            <span>{QUIZ_DATA.length - answeredQuestions.size} remaining</span>
          </div>
        </div>
      )}
    </div>
  );
}
