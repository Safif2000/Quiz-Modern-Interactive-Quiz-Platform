import { QuizProvider, useQuiz } from "./context/QuizContext";
import InstructionsModal from "./components/Modal";
import Navbar            from "./components/Navbar";
import QuizHeader        from "./components/QuizHeader";
import QuestionCard      from "./components/QuestionCard";
import ResultsScreen     from "./components/QuestionCard/ResultsScreen";
import Timer             from "./components/Timer";
import QuizProgress      from "./components/QuizProgress";
import Newsletter        from "./components/Newsletter";
import Footer            from "./components/Footer";

// ── Inner layout (needs QuizContext) ─────────────────────────────────────────
function QuizLayout() {
  const { quizStarted, quizFinished, startQuiz } = useQuiz();

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Sora','DM Sans',sans-serif" }}>

      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@500&display=swap');
        *,*::before,*::after { box-sizing:border-box; }
        .scrollbar-thin::-webkit-scrollbar { width:4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background:#f1f5f9; border-radius:4px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background:#bbf7d0; border-radius:4px; }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background:#6ee7b7; }
        @keyframes fadeInUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .fade-in { animation: fadeInUp 0.35s ease forwards; }
      `}</style>

      {/* Instructions modal — shown before quiz starts */}
      {!quizStarted && <InstructionsModal onStart={startQuiz} />}

      {/* Navbar — Signup opens modal, Get Started calls startQuiz */}
      <Navbar onStartTest={startQuiz} />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <QuizHeader />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Question / Results */}
          <div className="flex-1 min-w-0">
            {quizFinished ? <ResultsScreen /> : <QuestionCard />}
          </div>

          {/* Right: Sidebar */}
          <aside className="lg:w-72 flex flex-col gap-4">
            <Timer />
            <QuizProgress />
          </aside>
        </div>

        <div className="mt-12">
          <Newsletter />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QuizProvider>
      <QuizLayout />
    </QuizProvider>
  );
}
