import { BookOpen, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const LINKS = {
  About:   ["Our Story", "Team", "Careers", "Press"],
  Support: ["Documentation", "FAQs", "Forum", "Sitemap"],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-400 rounded-md flex items-center justify-center shadow-sm">
                <BookOpen size={15} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: "'Sora',sans-serif" }}>
                elearn
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              Empowering learners worldwide with quality, accessible education at your own pace.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-emerald-400 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} elearning. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
