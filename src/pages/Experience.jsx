import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const YEARS = [
  {
    year: "2025",
    events: [
      {
        title: "Full Stack Developer II",
        description: "Software Engineer @ FedEx",
        time: "Jun – Present",
        pic: "/fedex.png",
        alt: "fedex logo",
      },
      {
        title: "🎓 Graduated",
        description: "Completed Master's Degree · Virginia Tech",
        time: "May",
        pic: "/Virginia-Tech-Logo.png",
        alt: "vt logo",
      },
      {
        title: "Graduate Teaching Assistant",
        description: "Comparative Languages",
        time: "Fall",
        pic: "/Virginia-Tech-Logo.png",
        alt: "vt logo",
      },
      {
        title: "Graduate Teaching Assistant",
        description: "Comparative Languages",
        time: "Spring",
        pic: "/Virginia-Tech-Logo.png",
        alt: "vt logo",
      },
    ],
  },
  {
    year: "2024",
    events: [
      {
        title: "Graduate Teaching Assistant",
        description: "Comparative Languages",
        time: "Fall",
        pic: "/Virginia-Tech-Logo.png",
        alt: "vt logo",
      },
      {
        title: "🎉 Accepted Publication",
        description: "Tracking Students' Perception",
        time: "Summer",
        pic: "/FIE.png",
        alt: "FIE logo",
      },
      {
        title: "Internship",
        description: "Software Engineer @ FedEx",
        time: "Summer",
        pic: "/fedex.png",
        alt: "fedex logo",
      },
      {
        title: "🎓 Graduated",
        description: "Completed Undergraduate Degree",
        time: "May",
        pic: "/Virginia-Tech-Logo.png",
        alt: "vt logo",
      },
      {
        title: "Teaching Assistant",
        description: "Software Design & Data Structures",
        time: "Spring",
        pic: "/Virginia-Tech-Logo.png",
        alt: "vt logo",
      },
    ],
  },
  {
    year: "2023",
    events: [
      {
        title: "🎉 Started New Program",
        description: "Accelerated Master's Program",
        time: "Fall",
        pic: "/Virginia-Tech-Logo.png",
        alt: "vt logo",
      },
      {
        title: "Fraternity",
        description: "Received Official Charter",
        time: "Spring",
        pic: "/LMBD.webp",
        alt: "lambda chi alpha",
      },
      {
        title: "Teaching Assistant",
        description: "Software Design & Data Structures",
        time: "Fall",
        pic: "/Virginia-Tech-Logo.png",
        alt: "vt logo",
      },
      {
        title: "Internship",
        description: "Software Engineer @ FedEx",
        time: "Summer",
        pic: "/fedex.png",
        alt: "fedex logo",
      },
      {
        title: "Math Grader",
        description: "Applied Combinatorics",
        time: "Spring",
        pic: "/Virginia-Tech-Logo.png",
        alt: "vt logo",
      },
    ],
  },
  {
    year: "2022",
    events: [
      {
        title: "Teaching Assistant",
        description: "Introduction to Software Design",
        time: "Fall",
        pic: "/Virginia-Tech-Logo.png",
        alt: "vt logo",
      },
      {
        title: "First Year Student Mentor",
        description: "Center for the Enhancement of Engineering Diversity",
        time: "Fall",
        pic: "/ceed.jpg",
        alt: "ceed",
      },
      {
        title: "Future Engineers Mentor",
        description: "Center for the Enhancement of Engineering Diversity",
        time: "Summer",
        pic: "/ceed.jpg",
        alt: "ceed",
      },
    ],
  },
  {
    year: "2021",
    events: [
      {
        title: "Started College",
        description: "Virginia Tech",
        time: "Fall",
        pic: "/Virginia-Tech-Logo.png",
        alt: "vt logo",
      },
    ],
  },
];

function Experience() {
  const location = useLocation();
  const [openYears, setOpenYears] = useState({ "2025": true, "2024": true, "2023": true, "2022": true, "2021": true });

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

  const toggle = (year) => setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }));

  return (
    <div className="bg-bg min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-16">
        {/* Page header */}
        <div className="pb-6 border-b border-line mb-8">
          <h1 className="text-3xl font-bold text-fg tracking-tight">Experience</h1>
          <p className="text-fg-dim mt-1 text-sm">2021 – 2025</p>
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          {YEARS.map(({ year, events }) => (
            <div key={year} id={year} className="rounded-2xl border border-line overflow-hidden">
              {/* Year header */}
              <button
                onClick={() => toggle(year)}
                className="w-full flex items-center justify-between px-5 py-4 bg-card hover:bg-card-hi transition-colors"
              >
                <span className="text-lg font-bold text-fg">{year}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-fg-faint">
                    {events.length} {events.length === 1 ? "event" : "events"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-fg-dim transition-transform duration-300 ${
                      openYears[year] ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Events list */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openYears[year] ? "max-h-[800px]" : "max-h-0"
                }`}
              >
                <div className="border-t border-line">
                  {events.map((event, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-4 px-5 py-4 ${
                        i < events.length - 1 ? "border-b border-line" : ""
                      } hover:bg-raised transition-colors`}
                    >
                      {/* Timeline indicator */}
                      <div className="shrink-0 w-1 self-stretch flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-blue mt-2" />
                        {i < events.length - 1 && (
                          <div className="w-px flex-1 bg-line mt-1" />
                        )}
                      </div>

                      {/* Logo */}
                      <img
                        src={event.pic}
                        alt={event.alt}
                        className="w-9 h-9 rounded-xl object-contain bg-white p-0.5 border border-line shrink-0"
                      />

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-fg text-sm">{event.title}</div>
                        <div className="text-fg-dim text-sm mt-0.5 truncate">{event.description}</div>
                      </div>

                      {/* Time badge */}
                      <span className="shrink-0 px-2.5 py-1 rounded-full bg-raised border border-line text-fg-faint text-xs">
                        {event.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Experience;
