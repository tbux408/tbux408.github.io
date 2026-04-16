import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Copy, Check, ExternalLink } from "lucide-react";
import TitleCard from "../components/TitleCard";
import CardCarousel from "../components/CardCarousel";
import CardFull from "../components/CardFull";

// --- Data ---

const LOCATIONS = [
  {
    name: "Blacksburg, VA",
    src: "/torgbridge.png",
    alt: "torg bridge",
    objectPosition: "30% 50%",
    url: "https://maps.app.goo.gl/huAw6wiTuKHKKLXW9",
  },
  {
    name: "Roanoke, VA",
    src: "/roanoke.jpg",
    alt: "roanoke",
    objectPosition: "70% 50%",
    url: "https://maps.app.goo.gl/oJXauBhzwjb6kENFA",
  },
  {
    name: "Washington, D.C.",
    src: "/washington.jpg",
    alt: "washington",
    objectPosition: "50% 50%",
    url: "https://maps.app.goo.gl/zWhiEp2jX82GdUr86",
  },
  {
    name: "New York City, NY",
    src: "/newyork.avif",
    alt: "new york",
    objectPosition: "70% 50%",
    url: "https://maps.app.goo.gl/nKmsUmyYUyk2CopSA",
  },
];

const EDUCATION = [
  {
    school: "Virginia Tech",
    degree: "M.S. Computer Science & Applications",
    detail: "Thesis Track · May 2025",
    logo: "/Virginia-Tech-Logo.png",
    url: "https://graduateschool.vt.edu/",
  },
  {
    school: "Virginia Tech",
    degree: "B.S. Computer Science",
    detail: "May 2024",
    logo: "/Virginia-Tech-Logo.png",
    url: "https://eng.vt.edu/",
  },
];

const LINKS = [
  {
    name: "LinkedIn",
    handle: "@tbux",
    logo: "/linkedin.webp",
    url: "https://www.linkedin.com/in/tbux/",
  },
  {
    name: "GitHub",
    handle: "@tbux408",
    logo: "/GitHub.png",
    url: "https://github.com/tbux408",
  },
  {
    name: "Google Scholar",
    handle: "Tyler Buxton",
    logo: "/google-scholar.jpg",
    url: "https://scholar.google.com/citations?user=fqV5wFcAAAAJ&hl=en&oi=ao",
  },
];

const SKILL_GROUPS = [
  { label: "Deployment", items: ["Docker", "Kubernetes", "Adminer"] },
  { label: "AI", items: ["OpenAI", "Gemini", "Ollama"] },
  { label: "Frameworks", items: ["React.js", "Next.js", "Angular", "Vue"] },
  { label: "Back-end", items: ["Django", "Poetry", "Quart"] },
  { label: "Front-end Languages", items: ["HTML", "CSS", "JavaScript", "TypeScript"] },
  { label: "Back-end Languages", items: ["Python", "Java"] },
  { label: "Databases", items: ["SQL", "MariaDB", "SQLite", "Firebase"] },
];

const ORGANIZATIONS = [
  {
    name: "Lambda Chi Alpha",
    detail: "🥇 Academic Scholarship Winner",
    logo: "/LMBD.webp",
    url: "https://www.lambdachi.org/",
  },
  {
    name: "Phi Beta Kappa",
    detail: "Prestigious academic honor society",
    logo: "/phi-beta-kappa-logo.webp",
    url: "https://www.pbk.org/",
  },
];

// --- Helpers ---

function handleLinkClick(event, url) {
  if (event.ctrlKey || event.metaKey) {
    window.open(url, "_blank");
  } else {
    window.open(url, "_self");
  }
}

// --- About Page ---

function About() {
  const location = useLocation();
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const params = new URLSearchParams(location.search);
    const elementId = params.get("id");
    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, [location.search]);

  const copyEmail = () => {
    navigator.clipboard.writeText("tbux@vt.edu");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 4000);
  };

  // Build location cards for carousel
  const locationCards = LOCATIONS.map((loc) => (
    <CardFull
      key={loc.name}
      title={
        <div className="flex items-center justify-between">
          <span className="font-semibold text-base">{loc.name}</span>
          <ExternalLink size={16} className="opacity-70" />
        </div>
      }
      pic={
        <img
          src={loc.src}
          alt={loc.alt}
          className="w-full h-full object-cover"
          style={{ objectPosition: loc.objectPosition }}
        />
      }
      description={null}
      onClick={(e) => handleLinkClick(e, loc.url)}
      color="white"
    />
  ));

  return (
    <div className="bg-bg min-h-screen">
      {/* --- Section 1: Bio --- */}
      <TitleCard message="About" id="1" />
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Headshot */}
          <div className="shrink-0">
            <div
              className="w-32 h-32 rounded-2xl overflow-hidden border border-line"
              style={{ boxShadow: "0 0 24px rgba(0,113,227,0.15)" }}
            >
              <img
                src="/tyler.jpg"
                alt="Tyler Buxton"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
          {/* Bio text */}
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-fg">Tyler Buxton</h1>
              <div className="flex items-center gap-2 mt-1">
                <img
                  src="/fedex.png"
                  alt="FedEx"
                  className="h-4 object-contain"
                />
                <span className="text-sm text-fg-dim">Full Stack Developer II · Remote</span>
                <span className="text-xs text-fg-faint">Jun 2025 – Present</span>
              </div>
            </div>
            <p className="text-fg-dim leading-relaxed">
              I am a Software Developer II at FedEx working on Android applications
              for pickup and delivery. I completed my M.S. in Computer Science at
              Virginia Tech, specializing in Computer Science Education, where my
              research focused on creating web application tools to enhance learning
              experiences.
            </p>
            
          </div>
        </div>
      </section>

      {/* Locations carousel */}
      <div className="border-t border-line">
        <CardCarousel cards={locationCards} gapS />
      </div>

      {/* --- Section 2: Education --- */}
      <TitleCard message="Education" id="2" />
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EDUCATION.map((ed) => (
            <button
              key={ed.degree}
              onClick={(e) => handleLinkClick(e, ed.url)}
              className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-line text-left hover:bg-card-hi hover:border-line-hi transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <img
                src={ed.logo}
                alt={ed.school}
                className="w-12 h-12 rounded-xl object-contain bg-white p-1 shrink-0"
              />
              <div>
                <div className="font-semibold text-fg text-sm">{ed.school}</div>
                <div className="text-fg-dim text-sm mt-0.5">{ed.degree}</div>
                <div className="text-fg-faint text-xs mt-0.5">{ed.detail}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* --- Section 3: Links --- */}
      <TitleCard message="Links" id="3" />
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3">
          {LINKS.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleLinkClick(e, link.url)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-line hover:bg-card-hi hover:border-line-hi transition-all duration-200"
            >
              <img
                src={link.logo}
                alt={link.name}
                className="w-8 h-8 rounded-lg object-contain bg-white p-0.5 shrink-0"
              />
              <div className="text-left">
                <div className="text-sm font-medium text-fg">{link.name}</div>
                <div className="text-xs text-fg-faint">{link.handle}</div>
              </div>
              <ExternalLink size={14} className="text-fg-faint ml-1" />
            </button>
          ))}
          {/* Email copy button */}
          <button
            onClick={copyEmail}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-line hover:bg-card-hi hover:border-line-hi transition-all duration-200"
          >
            <img
              src="/gmail.webp"
              alt="email"
              className="w-8 h-8 rounded-lg object-contain bg-white p-0.5 shrink-0"
            />
            <div className="text-left">
              <div className="text-sm font-medium text-fg">Email</div>
              <div className="text-xs text-fg-faint">tbux@vt.edu</div>
            </div>
            <div className="text-fg-faint ml-1">
              {emailCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            </div>
          </button>
        </div>
      </section>

      {/* --- Section 4: Skills --- */}
      <TitleCard message="Skills" id="4" />
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label}>
              <h3 className="text-xs font-semibold text-fg-faint uppercase tracking-widest mb-3">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full bg-raised border border-line text-fg-dim text-sm hover:border-line-hi hover:text-fg transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section 5: Organizations --- */}
      <TitleCard message="Organizations" id="5" />
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ORGANIZATIONS.map((org) => (
            <button
              key={org.name}
              onClick={(e) => handleLinkClick(e, org.url)}
              className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-line text-left hover:bg-card-hi hover:border-line-hi transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <img
                src={org.logo}
                alt={org.name}
                className="w-12 h-12 rounded-xl object-contain bg-white p-1 shrink-0"
              />
              <div>
                <div className="font-semibold text-fg text-sm">{org.name}</div>
                <div className="text-fg-dim text-sm mt-0.5">{org.detail}</div>
              </div>
              <ExternalLink size={14} className="text-fg-faint ml-auto" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
