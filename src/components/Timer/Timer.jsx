import { useQuiz } from "../../context/QuizContext";
import { TOTAL_TIME } from "../../data/quizData";

export default function Timer() {
  const { timeLeft, quizEnded } = useQuiz();

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / TOTAL_TIME;
  const dashOffset = circumference * (1 - progress);

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const secs = (timeLeft % 60).toString().padStart(2, "0");

  // Color logic: red < 1min, amber < 3min, green otherwise
  const strokeColor = quizEnded || timeLeft < 60
    ? "#ef4444"
    : timeLeft < 180
    ? "#f59e0b"
    : "#2D8B69";

  const textColor = quizEnded || timeLeft < 60
    ? "text-red-500"
    : timeLeft < 180
    ? "text-amber-500"
    : "text-gray-800";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex flex-col items-center gap-2">
        {/* Circular SVG timer */}
        <div className="relative w-28 h-28">
          <svg
            className="w-full h-full -rotate-90"
            viewBox="0 0 100 100"
            aria-label={`${mins}:${secs} remaining`}
          >
            {/* Track */}
            <circle
              cx="50" cy="50" r={radius}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="7"
            />
            {/* Progress arc */}
            <circle
              cx="50" cy="50" r={radius}
              fill="none"
              stroke={strokeColor}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{
                transition: "stroke-dashoffset 1s linear, stroke 0.4s ease",
              }}
            />
          </svg>

          {/* Time text centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`text-xl font-bold tabular-nums ${textColor}`}
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {mins}:{secs}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-500 font-medium tracking-wide">
          {quizEnded ? "⏱ Time's Up!" : "Timer Remaining"}
        </p>
      </div>
    </div>
  );
}
