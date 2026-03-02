import { useState } from "react";
import {
  BookOpen,
  Clock,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  FileText,
  Award,
} from "lucide-react";

const INSTRUCTIONS = [
  {
    icon: FileText,
    color: "bg-blue-100 text-blue-600",
    title: "Total Questions",
    desc: "This test contains 10 multiple choice questions. Each question has 4 options.",
  },
  {
    icon: Clock,
    color: "bg-amber-100 text-amber-600",
    title: "Time Limit",
    desc: "You have 20 minutes to complete the quiz. Timer starts as soon as you begin.",
  },
  {
    icon: CheckCircle,
    color: "bg-emerald-100 text-emerald-600",
    title: "Answering Questions",
    desc: "Select one option per question and click 'Submit Answer'. You cannot change after submitting.",
  },
  {
    icon: AlertTriangle,
    color: "bg-red-100 text-red-600",
    title: "No Skipping",
    desc: "You can navigate between questions but unanswered ones will be marked incorrect.",
  },
  {
    icon: Award,
    color: "bg-purple-100 text-purple-600",
    title: "Results",
    desc: "Your score and detailed review will be shown after all questions are submitted.",
  },
];

export default function InstructionsModal({ onStart }) {
  const [agreed, setAgreed] = useState(false);

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,20,15,0.7)", backdropFilter: "blur(6px)" }}>

      {/* Modal card */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        style={{ animation: "modalIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
      >
        {/* Header */}
        <div
          className="px-7 py-6 flex items-center gap-3"
          style={{ background: "linear-gradient(135deg,#1a6b4a,#2D8B69)" }}
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <BookOpen size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h2
              className="text-lg font-bold text-white"
              style={{ fontFamily: "'Sora',sans-serif" }}
            >
              Test Instructions
            </h2>
            <p className="text-emerald-100 text-xs mt-0.5">
              Please read carefully before starting
            </p>
          </div>
        </div>

        {/* Instructions list */}
        <div className="px-7 py-5 space-y-4 max-h-72 overflow-y-auto scrollbar-thin">
          {INSTRUCTIONS.map(({ icon: Icon, color, title, desc }, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${color}`}
              >
                <Icon size={17} />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Agree checkbox + CTA */}
        <div className="px-7 pb-7 pt-4 border-t border-gray-100">
          <label className="flex items-start gap-3 cursor-pointer group mb-5">
            <div className="relative flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
                  ${agreed
                    ? "bg-emerald-600 border-emerald-600"
                    : "border-gray-300 group-hover:border-emerald-400"
                  }`}
              >
                {agreed && (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm text-gray-600 leading-relaxed">
              I have read all the instructions and agree to the{" "}
              <span className="text-emerald-600 font-semibold">test rules</span>.
            </span>
          </label>

          <button
            onClick={() => agreed && onStart()}
            disabled={!agreed}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold
              transition-all duration-200
              ${agreed
                ? "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-lg shadow-emerald-200 hover:-translate-y-0.5"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
          >
            Start Test
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity:0; transform:scale(0.88) translateY(20px); }
          to   { opacity:1; transform:scale(1)    translateY(0);     }
        }
      `}</style>
    </div>
  );
}
