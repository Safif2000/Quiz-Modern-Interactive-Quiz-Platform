import { ChevronRight, Clock } from "lucide-react";
import { useQuiz } from "../../context/QuizContext";
import { QUIZ_DATA } from "../../data/quizData";

export default function QuizHeader() {
  const { currentQ, totalAnswered, progressPct, quizEnded } = useQuiz();
  const question = QUIZ_DATA[currentQ];

  const shortTitle = question.question.length > 34
    ? question.question.substring(0, 34) + "..."
    : question.question;

  const crumbs = [
    { label: "Home",      href: "#" },
    { label: "Quiz List", href: "#" },
    { label: shortTitle,  href: null },
  ];

  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1 text-sm text-gray-400 mb-5">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1">
            {crumb.href ? (
              <a href={crumb.href} className="hover:text-emerald-600 transition-colors">
                {crumb.label}
              </a>
            ) : (
              <span className="text-emerald-600 font-semibold">{crumb.label}</span>
            )}
            {i < crumbs.length - 1 && (
              <ChevronRight size={13} className="text-gray-300 flex-shrink-0" />
            )}
          </span>
        ))}
      </nav>

      {/* Time's up banner */}
      {quizEnded && (
        <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold flex items-center gap-2">
          <Clock size={16} />
          Time's up! You answered {totalAnswered} out of {QUIZ_DATA.length} questions.
        </div>
      )}

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
          <span className="font-medium">{totalAnswered}/{QUIZ_DATA.length} questions answered</span>
          <span className="font-semibold text-emerald-600">{Math.round(progressPct)}% complete</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
