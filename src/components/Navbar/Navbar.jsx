import { useState } from "react";
import { ShoppingCart, BookOpen, Menu, X } from "lucide-react";
import SignupModal from "../SignupModal";

export default function Navbar({ onStartTest }) {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      {/* ── Main Navbar ──────────────────────────────────────────────────── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3.5 flex items-center gap-6">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-amber-400 rounded-md flex items-center justify-center shadow-sm">
              <BookOpen size={15} className="text-white" strokeWidth={2.5} />
            </div>
            <span
              className="text-xl font-bold text-gray-900"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              elearn
            </span>
          </a>

          {/* Nav links desktop */}
          {/* <div className="hidden md:flex items-center gap-6 ml-2">
            <button className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
              Categories
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
              Courses
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
              Instructors
            </button>
          </div> */}

          {/* Right controls */}
          <div className="flex items-center gap-3 ml-auto">
            

            {/* Signup opens modal */}
            <button
              onClick={() => setShowSignup(true)}
              className="px-5 py-2 text-sm font-bold text-emerald-700 border-2 border-emerald-600 rounded-xl hover:bg-emerald-50 active:bg-emerald-100 transition-all"
            >
              Signup
            </button>

            {/* Get Started starts test */}
            <button
              onClick={onStartTest}
              className="hidden sm:block px-5 py-2 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 active:bg-emerald-800 transition-all shadow-sm shadow-emerald-200"
            >
              Get Started
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 text-gray-500 hover:text-emerald-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-5 py-4 space-y-1 shadow-lg">
            {["Categories", "Courses", "Instructors"].map((item) => (
              <button key={item} className="block w-full text-left text-sm font-medium text-gray-700 hover:text-emerald-600 py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-colors">
                {item}
              </button>
            ))}
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <button
                onClick={() => { setMenuOpen(false); setShowSignup(true); }}
                className="w-full py-2.5 text-sm font-bold text-emerald-700 border-2 border-emerald-600 rounded-xl hover:bg-emerald-50 transition-all"
              >
                Signup
              </button>
              <button
                onClick={() => { setMenuOpen(false); onStartTest(); }}
                className="w-full py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onStartTest={() => { setShowSignup(false); onStartTest(); }}
        />
      )}
    </>
  );
}
