import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Download } from "lucide-react";

const PDF_URL = "/Buxton_Resume_09.2024_v2.pdf";

function Resume() {
  const handleDownload = () => {
    const anchor = document.createElement("a");
    anchor.href = PDF_URL;
    anchor.download = "Buxton_Resume.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className="bg-bg min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-line max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-fg tracking-tight">Resume</h2>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-raised border border-line text-fg-dim text-sm font-medium hover:text-fg hover:border-line-hi transition-all"
        >
          <Download size={16} />
          Download
        </button>
      </div>

      {/* PDF viewer */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="rounded-2xl overflow-hidden border border-line shadow-2xl">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={PDF_URL} />
          </Worker>
        </div>
      </div>
    </div>
  );
}

export default Resume;
