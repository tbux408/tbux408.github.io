import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, CircleF } from "@react-google-maps/api";
import { StandaloneSearchBox, MarkerF } from "@react-google-maps/api";
import styles from "../styles/Resume.module.css";
import { useNavigate } from "react-router-dom";
import PictureButton from "../components/PictureButton";
import ResumeButton from "../components/ResumeButton";
import ExperienceButton from "../components/ExperienceButton";
import ProjectButton from "../components/ProjectButton";
import TitleCard from "../components/TitleCard";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

function Resume() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDownload = () => {
    const fileUrl = "/Buxton_Resume_09.2024_v2.pdf"; // Replace with your file URL
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = "Buxton_Resume.pdf"; // Replace with the desired file name
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const action = (
    <div>
      <IconButton aria-label="download" onClick={handleDownload}>
        <DownloadForOfflineIcon style={{ fontSize: "40px" }} />
      </IconButton>
    </div>
  );

  return (
    <div style={{ width: "100%" }}>
      <TitleCard message={"Resume"} id={1} action={action} />
      <div className={styles["container"]}>
        <div className={styles.pdfViewer}>
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
          >
            <Viewer fileUrl="/Buxton_Resume_09.2024_v2.pdf" width={"100%"} />
          </Worker>
        </div>
      </div>
    </div>
  );
}

export default Resume;
