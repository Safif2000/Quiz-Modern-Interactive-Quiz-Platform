import { useState } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, BookOpen, ChevronRight } from "lucide-react";

export default function SignupModal({ onClose, onStartTest }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name     = "Full name is required";
    if (!form.email.includes("@")) e.email  = "Enter a valid email";
    if (form.password.length < 6) e.password = "Min 6 characters";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const Field = ({ id, label, icon: Icon, type = "text", extra }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      <div className="relative">
        <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type={id === "password" ? (showPass ? "text" : "password") : type}
          value={form[id]}
          onChange={(e) => { setForm({ ...form, [id]: e.target.value }); setErrors({ ...errors, [id]: "" }); }}
          placeholder={label}
          className={`w-full pl-10 pr-${id === "password" ? "10" : "4"} py-2.5 text-sm rounded-xl border
            focus:outline-none focus:ring-2 transition-all
            ${errors[id]
              ? "border-red-300 focus:ring-red-200 bg-red-50"
              : "border-gray-200 focus:ring-emerald-200 focus:border-emerald-400 bg-gray-50 focus:bg-white"
            }`}
        />
        {id === "password" && (
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {errors[id] && <p className="text-xs text-red-500 mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,20,15,0.7)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        style={{ animation: "modalIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
              <BookOpen size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: "'Sora',sans-serif" }}>
                {submitted ? "Account Created! 🎉" : "Create Account"}
              </h2>
              <p className="text-xs text-gray-400">
                {submitted ? "Ready to start your test?" : "Join elearn today"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field id="name"     label="Full Name"      icon={User} />
              <Field id="email"    label="Email Address"  icon={Mail} type="email" />
              <Field id="password" label="Password"       icon={Lock} />

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-emerald-600 text-white text-sm font-bold rounded-xl
                           hover:bg-emerald-700 active:bg-emerald-800 transition-all
                           shadow-md shadow-emerald-200 hover:-translate-y-0.5"
              >
                Create Account & Continue
              </button>

              <p className="text-center text-xs text-gray-400">
                Already have an account?{" "}
                <button type="button" className="text-emerald-600 font-semibold hover:underline">
                  Log in
                </button>
              </p>
            </form>
          ) : (
            /* Success state */
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M6 16L13 23L26 9" stroke="#2D8B69" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: "'Sora',sans-serif" }}>
                Welcome, {form.name.split(" ")[0]}!
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Your account has been created. Ready to take the test?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 text-sm font-semibold text-gray-600 border border-gray-300
                             rounded-xl hover:bg-gray-50 transition-all"
                >
                  Browse Courses
                </button>
                <button
                  onClick={onStartTest}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-bold
                             text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all
                             shadow-md shadow-emerald-200"
                >
                  Start Test
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
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
