import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "./logo";

const NAV_ITEMS = [
  {
    label: "About",
    path: "/about",
    sub: [
      { name: "Bio", link: "/about?id=1" },
      { name: "Education", link: "/about?id=2" },
      { name: "Links", link: "/about?id=3" },
      { name: "Skills", link: "/about?id=4" },
      { name: "Organizations", link: "/about?id=5" },
    ],
  },
  {
    label: "Projects",
    path: "/projects",
    sub: [
      { name: "Empower", link: "/projects?id=empower" },
      { name: "Meals", link: "/projects?id=meals" },
      { name: "Gitit", link: "/projects?id=gitit" },
      { name: "AI Chatbot", link: "/projects?id=chatbot" },
      { name: "Hotel Scouter", link: "/projects?id=hotelscouter" },
      { name: "Questle?", link: "/projects?id=questle" },
      { name: "Ride Share", link: "/projects?id=rideshare" },
      { name: "The Book Warehouse", link: "/projects?id=bookstore" },
    ],
  },
  {
    label: "Experience",
    path: "/experience",
    sub: [
      { name: "2025", link: "/experience?id=2025" },
      { name: "2024", link: "/experience?id=2024" },
      { name: "2023", link: "/experience?id=2023" },
      { name: "2022", link: "/experience?id=2022" },
      { name: "2021", link: "/experience?id=2021" },
    ],
  },
  {
    label: "Resume",
    path: "/resume",
    sub: [{ name: "Download", link: "/resume" }],
  },
];

function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeout = useRef(null);

  const handleNavClick = (path) => {
    navigate(path);
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  const handleSubClick = (link) => {
    navigate(link);
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  const onMouseEnterNav = (label) => {
    clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const onMouseLeaveNav = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const handler = () => { if (mq.matches) setMobileOpen(false); };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main nav bar */}
      <nav
        className="flex items-center justify-between px-5 h-14 bg-[#0a0a0bcc] backdrop-blur-xl border-b border-line"
        style={{ transition: "background-color 0.3s ease" }}
      >
        <Logo />

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => onMouseEnterNav(item.label)}
              onMouseLeave={onMouseLeaveNav}
            >
              <button
                onClick={() => handleNavClick(item.path)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-fg-dim hover:text-fg hover:bg-raised transition-all duration-150"
              >
                {item.label}
                {item.sub && item.sub.length > 1 && (
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`}
                  />
                )}
              </button>

              {/* Dropdown */}
              {item.sub && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                    activeDropdown === item.label
                      ? "opacity-100 pointer-events-auto translate-y-0"
                      : "opacity-0 pointer-events-none -translate-y-1"
                  }`}
                  onMouseEnter={() => onMouseEnterNav(item.label)}
                  onMouseLeave={onMouseLeaveNav}
                >
                  <div className="bg-card border border-line rounded-xl p-1.5 shadow-2xl min-w-[160px]">
                    {item.sub.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => handleSubClick(s.link)}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-fg-dim hover:text-fg hover:bg-raised transition-all duration-100"
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded-lg text-fg-dim hover:text-fg hover:bg-raised transition-all"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 bg-[#0a0a0bf2] backdrop-blur-xl border-b border-line ${
          mobileOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <button
                onClick={() => handleNavClick(item.path)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-fg-dim hover:text-fg hover:bg-raised transition-all"
              >
                {item.label}
              </button>
              {item.sub && (
                <div className="ml-4 pl-4 border-l border-line space-y-1 mt-1 mb-2">
                  {item.sub.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => handleSubClick(s.link)}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-fg-faint hover:text-fg-dim hover:bg-raised transition-all"
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
