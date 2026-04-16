import React from "react";

function Footer() {
  return (
    <footer className="bg-bg-subtle border-t border-line mt-16">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-4">
        <p className="text-xs text-fg-faint leading-relaxed">
          <span className="font-medium text-fg-dim">Credits:</span>{" "}
          Headshot (Tyler Buxton), Virginia Tech Logo (logos-world.net),
          Torgersen Bridge (vtprism.com), Roanoke (southernliving.com),
          Washington D.C. (tclf.org), New York City (newyorkpass.com),
          FedEx Logo (fedex.com), Docker (docker.com), React (react.dev),
          Google Gemini (gemini.google.com), LinkedIn (linkedin.com),
          GitHub (github.com), Gmail (workspace.google.com),
          Google Scholar (scholar.google.com), TypeScript (icon-icons.com),
          Python (logos-world.net), Django (djangoproject.com),
          Lambda Chi Alpha (lambdachi.org), Phi Beta Kappa (trinity.edu),
          FIE 2024 (2024.fie-conference.org), CEED (eng.vt.edu/ceed.html).
        </p>
        <p className="text-xs text-fg-faint">
          <span className="font-medium text-fg-dim">Privacy Policy:</span>{" "}
          This application does not collect, store, or share any personal data.
          No information is tracked or stored on servers or through third-party services.
        </p>
        <hr className="border-line" />
        <div className="flex items-center justify-between">
          <p className="text-xs text-fg-faint">© {new Date().getFullYear()} Tyler Buxton · tbux@vt.edu</p>
          <p className="text-xs text-fg-faint">United States</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
