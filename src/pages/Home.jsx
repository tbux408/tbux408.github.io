import React from "react";
import { useNavigate } from "react-router-dom";
import { User, FolderOpen, Briefcase, FileText, ArrowRight, Linkedin } from "lucide-react";

const NAV_CARDS = [
  {
    icon: <User size={22} />,
    label: "About",
    description: "Bio, education, skills, and more.",
    path: "/about",
  },
  {
    icon: <FolderOpen size={22} />,
    label: "Projects",
    description: "Full-stack apps, research tools, and hackathon projects.",
    path: "/projects",
  },
  {
    icon: <Briefcase size={22} />,
    label: "Experience",
    description: "Teaching, internships, and research from 2021 – 2025.",
    path: "/experience",
  },
  {
    icon: <FileText size={22} />,
    label: "Resume",
    description: "View and download my full resume.",
    path: "/resume",
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-16 pb-20 overflow-hidden">
        {/* Subtle gradient glow behind hero */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,113,227,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Headshot */}
        <div className="relative mb-6 animate-fade-in-up">
          <div
            className="w-28 h-28 rounded-full overflow-hidden border-2 border-blue mx-auto"
            style={{ boxShadow: "0 0 32px rgba(0,113,227,0.3)" }}
          >
            <img
              src="/tyler.jpg"
              alt="Tyler Buxton"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Name & title */}
        <div className="animate-fade-in-up delay-100">
          <h1 className="text-5xl sm:text-6xl font-bold text-fg tracking-tight mb-3">
            Tyler Buxton
          </h1>
          <p className="text-lg text-fg-dim mb-2">
            Software Engineer @ FedEx
          </p>
          <p className="text-base text-fg-faint mb-8">
            Virginia Tech · FedEx · Full-Stack Development
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3 justify-center animate-fade-in-up delay-200">
          <button
            onClick={() => navigate("/about")}
            className="px-6 py-2.5 rounded-full bg-blue text-white text-sm font-semibold hover:bg-blue-hi transition-colors shadow-lg"
            style={{ boxShadow: "0 4px 20px rgba(0,113,227,0.4)" }}
          >
            View Portfolio
          </button>
         
          <a
            href="https://www.linkedin.com/in/tbux/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-raised border border-line text-fg-dim text-sm font-semibold hover:text-fg hover:border-line-hi transition-all"
          >
            <Linkedin size={15} />
            LinkedIn
          </a>
        </div>
      </section>

      {/* Navigation cards */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {NAV_CARDS.map((card, i) => (
            <button
              key={card.label}
              onClick={() => navigate(card.path)}
              className={`
                group text-left rounded-2xl bg-card border border-line p-6
                hover:bg-card-hi hover:border-line-hi
                transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl
                animate-fade-in-up
              `}
              style={{ animationDelay: `${300 + i * 80}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-raised border border-line text-blue mb-4">
                  {card.icon}
                </div>
                <ArrowRight
                  size={16}
                  className="text-fg-faint group-hover:text-fg-dim group-hover:translate-x-0.5 transition-all mt-1"
                />
              </div>
              <h3 className="text-lg font-semibold text-fg mb-1">{card.label}</h3>
              <p className="text-sm text-fg-dim leading-relaxed">{card.description}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
