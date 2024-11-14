import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, CircleF } from "@react-google-maps/api";
import { StandaloneSearchBox, MarkerF } from "@react-google-maps/api";
import styles from "../styles/About.module.css";
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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTheme } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import LinkIcon from "@mui/icons-material/Link";

function About() {
  const theme = useTheme();
  const [copyIcon, setCopyIcon] = useState(
    <ContentCopyIcon sx={{ color: theme.palette.secondary.dark }} />
  );

  const copyHelper = () => {
    setCopyIcon(<CheckIcon sx={{ color: theme.palette.secondary.dark }} />);
    navigator.clipboard.writeText("tbux@vt.edu");
    setTimeout(() => {
      setCopyIcon(
        <ContentCopyIcon sx={{ color: theme.palette.secondary.dark }} />
      );
    }, 5000);
  };

  const cards = [
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Tyler Buxton</Typography>
          {copyIcon}
        </div>
      }
      pic={
        <img
          className={styles["headshot"]}
          src="/tyler.jpg"
          alt="Tyler"
          style={{
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">Email: tbux@vt.edu</Typography>
      }
      onClick={copyHelper}
    />,
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Blacksburg, VA</Typography>
          <LinkIcon
            sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
          />
        </div>
      }
      pic={
        <img
          className={styles["headshot"]}
          src="/torgbridge.png"
          alt="torg bridge"
          style={{
            objectFit: "cover",
            objectPosition: "30% 50%",
            borderRadius: "15px",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">Area of Interest</Typography>
      }
    />,
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Roanoke, VA</Typography>
          <LinkIcon
            sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
          />
        </div>
      }
      pic={
        <img
          className={styles["headshot"]}
          src="/roanoke.jpg"
          alt="torg bridge"
          style={{
            objectFit: "cover",
            objectPosition: "70% 50%",
            borderRadius: "15px",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">Area of Interest</Typography>
      }
    />,
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Washington, D.C.</Typography>
          <LinkIcon
            sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
          />
        </div>
      }
      pic={
        <img
          className={styles["headshot"]}
          src="/washington.jpg"
          alt="washington"
          style={{
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">Area of Interest</Typography>
      }
    />,
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">New York City, NY</Typography>
          <LinkIcon
            sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
          />
        </div>
      }
      pic={
        <img
          className={styles["headshot"]}
          src="/newyork.jpg"
          alt="new york"
          style={{
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">Area of Interest</Typography>
      }
    />,
  ];

  const education = [
    <Card
      title={<Typography variant="h5">Virginia Tech</Typography>}
      pic={
        <img
          className={styles["vt-logo"]}
          src="/Virginia-Tech-Logo.png"
          alt="new york"
          style={{
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />
      }
      description={
        <div className={styles["description"]}>
          <Typography variant="subtitle1">
            M.S. Thesis Computer Science & Applications
          </Typography>
          <Typography variant="subtitle1">May 2025</Typography>
        </div>
      }
    />,
    <Card
      title={<Typography variant="h5">Virginia Tech</Typography>}
      pic={
        <img
          className={styles["vt-logo"]}
          src="/Virginia-Tech-Logo.png"
          alt="new york"
          style={{
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />
      }
      description={
        <div className={styles["description"]}>
          <Typography variant="subtitle1">B.S. Computer Science</Typography>
          <Typography variant="subtitle1">May 2024</Typography>
        </div>
      }
    />,
  ];

  return (
    <div className={styles["container"]}>
      <TitleCard message={"About"} id={1} action={""} />
      <div className={styles["box"]}>
        <CardCarousel cards={cards} />
      </div>
      <TitleCard message={"Education"} id={2} action={""} />
      <div className={styles["box"]}>
        <CardCarousel cards={education} />
      </div>
      <TitleCard message={"Links"} id={3} action={""} />
      <div className={styles["box"]}>
        <CardCarousel cards={cards} />
      </div>
      <TitleCard message={"Skills"} id={4} action={""} />
      <div className={styles["box"]}>
        <CardCarousel cards={cards} />
      </div>
      <TitleCard message={"Groups"} id={5} action={""} />
      <div className={styles["box"]}>
        <CardCarousel cards={cards} />
      </div>
    </div>
  );
}

export default About;
