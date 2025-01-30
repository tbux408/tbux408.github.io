import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, CircleF } from "@react-google-maps/api";
import { StandaloneSearchBox, MarkerF } from "@react-google-maps/api";
import styles from "../styles/Experience.module.css";
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
import Card from "../components/Card";
import CardCarousel from "../components/CardCarousel";
import ContentEmailIcon1 from "@mui/icons-material/ContentCopy";
import { useTheme } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import LinkIcon from "@mui/icons-material/Link";
import WebIcon from "@mui/icons-material/Web";
import Tooltip from "@mui/material/Tooltip";
import TerminalIcon from "@mui/icons-material/Terminal";
import LayersIcon from "@mui/icons-material/Layers";
import { useLocation } from "react-router-dom";
import { Chip, Collapse, Divider } from "@mui/material";
import { CenterFocusStrong } from "@mui/icons-material";
import CardFull from "../components/CardFull";

function Experience() {
  const theme = useTheme();
  const location = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const params = new URLSearchParams(location.search);
    const elementId = params.get("id");

    if (elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, [location.search]);

  const year2025 = [
    {
      title: "Graduate Teaching Assistant",
      description: "Comparative Languages",
      time: "Spring",
      pic: "/Virginia-Tech-Logo.png",
      picStyle: "vt-logo",
      alt: "vt logo",
    },
  ];

  const year2024 = [
    {
      title: "Graduate Teaching Assistant",
      description: "Comparative Languages",
      time: "Fall",
      pic: "/Virginia-Tech-Logo.png",
      picStyle: "vt-logo",
      alt: "vt logo",
    },
    {
      title: "🎉 Accepted Publication",
      description: "Tracking Students' Perception",
      time: "Summer",
      pic: "/FIE.png",
      picStyle: "gmail-logo",
      alt: "FIE logo",
    },
    {
      title: "Internship",
      description: "Software Engineer @ FedEx",
      time: "Summer",
      pic: "/fedex.png",
      picStyle: "vt-logo",
      alt: "fedex logo",
    },
    {
      title: "🎓 Graduated",
      description: "Completed Undergraduate Degree",
      time: "May",
      pic: "/Virginia-Tech-Logo.png",
      picStyle: "vt-logo",
      alt: "vt logo",
    },
    {
      title: "Teaching Assistant",
      description: "Software Design & Data Structures",
      time: "Spring",
      pic: "/Virginia-Tech-Logo.png",
      picStyle: "vt-logo",
      alt: "vt logo",
    },
  ];

  const year2023 = [
    {
      title: "🎉 Started New Program",
      description: "Accelerated Master's Program",
      time: "Fall",
      pic: "/Virginia-Tech-Logo.png",
      picStyle: "vt-logo",
      alt: "vt logo",
    },
    {
      title: "Fraternity",
      description: "Received Official Charter",
      time: "Spring",
      pic: "/LMBD.webp",
      picStyle: "gmail-logo",
      alt: "vt logo",
    },
    {
      title: "Teaching Assistant",
      description: "Software Design & Data Structures",
      time: "Fall",
      pic: "/Virginia-Tech-Logo.png",
      picStyle: "vt-logo",
      alt: "vt logo",
    },
    {
      title: "Internship",
      description: "Software Engineer @ FedEx",
      time: "Summer",
      pic: "/fedex.png",
      picStyle: "vt-logo",
      alt: "fedex logo",
    },
    {
      title: "Math Grader",
      description: "Applied Combinatorics",
      time: "Spring",
      pic: "/Virginia-Tech-Logo.png",
      picStyle: "vt-logo",
      alt: "vt logo",
    },
  ];

  const year2022 = [
    {
      title: "Teaching Assistant",
      description: "Introduction to Software Design",
      time: "Fall",
      pic: "/Virginia-Tech-Logo.png",
      picStyle: "vt-logo",
      alt: "vt logo",
    },
    {
      title: "First Year Student Mentor",
      description: "Center for the Enhancement of Engineering Diversity",
      time: "Fall",
      pic: "/ceed.jpg",
      picStyle: "gmail-logo",
      alt: "vt logo",
    },
    {
      title: "Future Engineers Mentor",
      description: "Center for the Enhancement of Engineering Diversity",
      time: "Summer",
      pic: "/ceed.jpg",
      picStyle: "gmail-logo",
      alt: "vt logo",
    },
  ];

  const year2021 = [
    {
      title: "Started College",
      description: "Virginia Tech",
      time: "Fall",
      pic: "/Virginia-Tech-Logo.png",
      picStyle: "vt-logo",
      alt: "vt logo",
    },
  ];
  const [collapse25, setCollapse25] = useState(true);
  const [collapse24, setCollapse24] = useState(true);
  const [collapse23, setCollapse23] = useState(true);
  const [collapse22, setCollapse22] = useState(true);
  const [collapse21, setCollapse21] = useState(true);

  return (
    <div className={styles["container"]}>
      <TitleCard message={"Experience"} action={""} />
      <Divider variant="middle">
        <Chip
          id="2025"
          label="2025"
          size="small"
          onClick={() => setCollapse25(!collapse25)}
        />
      </Divider>
      <Collapse in={collapse25} className={styles["collapse"]}>
        <div className={styles["year-container"]}>
          {year2025.map((c, i) => (
            <Card
              key={i}
              title={
                <div className={styles["description"]}>
                  <Typography variant="h5">{c.title}</Typography>
                </div>
              }
              pic={
                <img
                  className={styles[c.picStyle]}
                  src={c.pic}
                  alt={c.alt}
                  style={{
                    borderRadius: "15px",
                  }}
                />
              }
              description={
                <div className={styles["description"]}>
                  <Typography variant="subtitle1">{c.description}</Typography>
                  <Typography variant="subtitle1">{c.time}</Typography>
                </div>
              }
              onClick={() => null}
              full={true}
            />
          ))}
        </div>
      </Collapse>
      <Divider variant="middle">
        <Chip
          id="2024"
          label="2024"
          size="small"
          onClick={() => setCollapse24(!collapse24)}
        />
      </Divider>
      <Collapse in={collapse24} className={styles["collapse"]}>
        <div className={styles["year-container"]}>
          {year2024.map((c, i) => (
            <Card
              key={i}
              title={
                <div className={styles["description"]}>
                  <Typography variant="h5">{c.title}</Typography>
                </div>
              }
              pic={
                <img
                  className={styles[c.picStyle]}
                  src={c.pic}
                  alt={c.alt}
                  style={{
                    borderRadius: "15px",
                  }}
                />
              }
              description={
                <div className={styles["description"]}>
                  <Typography variant="subtitle1">{c.description}</Typography>
                  <Typography variant="subtitle1">{c.time}</Typography>
                </div>
              }
              onClick={() => null}
              full={true}
            />
          ))}
        </div>
      </Collapse>
      <Divider variant="middle">
        <Chip
          id="2023"
          label="2023"
          size="small"
          onClick={() => setCollapse23(!collapse23)}
        />
      </Divider>
      <Collapse in={collapse23} className={styles["collapse"]}>
        <div className={styles["year-container"]}>
          {year2023.map((c, i) => (
            <Card
              key={i}
              title={
                <div className={styles["description"]}>
                  <Typography variant="h5">{c.title}</Typography>
                </div>
              }
              pic={
                <img
                  className={styles[c.picStyle]}
                  src={c.pic}
                  alt={c.alt}
                  style={{
                    borderRadius: "15px",
                  }}
                />
              }
              description={
                <div className={styles["description"]}>
                  <Typography variant="subtitle1">{c.description}</Typography>
                  <Typography variant="subtitle1">{c.time}</Typography>
                </div>
              }
              onClick={() => null}
              full={true}
            />
          ))}
        </div>
      </Collapse>
      <Divider variant="middle">
        <Chip
          id="2022"
          label="2022"
          size="small"
          onClick={() => setCollapse22(!collapse22)}
        />
      </Divider>
      <Collapse in={collapse22} className={styles["collapse"]}>
        <div className={styles["year-container"]}>
          {year2022.map((c, i) => (
            <Card
              key={i}
              title={
                <div className={styles["description"]}>
                  <Typography variant="h5">{c.title}</Typography>
                </div>
              }
              pic={
                <img
                  className={styles[c.picStyle]}
                  src={c.pic}
                  alt={c.alt}
                  style={{
                    borderRadius: "15px",
                  }}
                />
              }
              description={
                <div className={styles["description"]}>
                  <Typography
                    variant="subtitle1"
                    className={styles["description-text"]}
                  >
                    {c.description}
                  </Typography>
                  <Typography variant="subtitle1">{c.time}</Typography>
                </div>
              }
              onClick={() => null}
              full={true}
            />
          ))}
        </div>
      </Collapse>
      <Divider variant="middle">
        <Chip
          id="2021"
          label="2021"
          size="small"
          onClick={() => setCollapse21(!collapse21)}
        />
      </Divider>
      <Collapse in={collapse21} className={styles["collapse"]}>
        <div className={styles["year-container"]}>
          {year2021.map((c, i) => (
            <Card
              key={i}
              title={
                <div className={styles["description"]}>
                  <Typography variant="h5">{c.title}</Typography>
                </div>
              }
              pic={
                <img
                  className={styles[c.picStyle]}
                  src={c.pic}
                  alt={c.alt}
                  style={{
                    borderRadius: "15px",
                  }}
                />
              }
              description={
                <div className={styles["description"]}>
                  <Typography
                    variant="subtitle1"
                    className={styles["description-text"]}
                  >
                    {c.description}
                  </Typography>
                  <Typography variant="subtitle1">{c.time}</Typography>
                </div>
              }
              onClick={() => null}
              full={true}
            />
          ))}
        </div>
      </Collapse>
    </div>
  );
}

export default Experience;
