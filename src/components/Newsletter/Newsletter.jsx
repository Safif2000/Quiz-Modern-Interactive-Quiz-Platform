import { useState } from "react";
import { Check, Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = () => {
    if (!email) { setError("Please enter your email."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
  };

  return (
    <section
      className="rounded-2xl p-8 sm:p-10"
      style={{
        background: "linear-gradient(135deg, #1a6b4a 0%, #2D8B69 55%, #3dbb86 100%)",
      }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Text */}
        <div>
          <h3
            className="text-xl sm:text-2xl font-bold text-white mb-1"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            <span className="text-amber-300">Subscribe</span> Our Newsletter
          </h3>
          <p className="text-emerald-100 text-sm">
            Get the most update from our news
          </p>
        </div>

        {/* Form */}
        {subscribed ? (
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold text-sm">
            <Check size={16} />
            Thanks for subscribing!
          </div>
        ) : (
          <div className="w-full sm:w-auto">
            <div className="flex gap-2">
              <div className="relative flex-1 sm:w-64">
                <Mail
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  placeholder="Your email address"
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border-0 focus:outline-none focus:ring-2
                             focus:ring-amber-400 text-gray-700 placeholder-gray-400"
                />
              </div>
              <button
                onClick={handleSubscribe}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-white text-sm
                           font-semibold rounded-xl transition-all whitespace-nowrap shadow-md shadow-amber-900/20"
              >
                Subscribe
              </button>
            </div>
            {error && (
              <p className="text-amber-200 text-xs mt-1.5 ml-1">{error}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
