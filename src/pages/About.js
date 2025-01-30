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
import CardFull from "../components/CardFull";
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
import CardFullMoreInfo from "../components/CardFullMoreInfo";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

function About() {
  const theme = useTheme();
  const copyIcon = (
    <ContentEmailIcon1 sx={{ color: theme.palette.secondary.dark }} />
  );
  const [emailIcon1, setEmailIcon1] = useState(copyIcon);
  const [emailIcon2, setEmailIcon2] = useState(copyIcon);

  const copyHelper = (setCopyIcon) => {
    setCopyIcon(<CheckIcon sx={{ color: theme.palette.secondary.dark }} />);
    navigator.clipboard.writeText("tbux@vt.edu");
    setTimeout(() => {
      setCopyIcon(copyIcon);
    }, 5000);
  };
  const handleLinkClick = (event, url) => {
    if (event.ctrlKey || event.metaKey) {
      window.open(url, "_blank");
    } else {
      window.open(url, "_self");
    }
  };

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

  const cards = [
    <CardFullMoreInfo
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Tyler Buxton</Typography>
          <UnfoldMoreIcon />
        </div>
      }
      pic={
        <img
          className={styles["fullCard"]}
          src="/tyler.jpg"
          alt="Tyler"
          style={{
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />
      }
      description={`I am a Master’s student in Computer Science at Virginia Tech, specializing in Computer Science Education. My research focuses on creating web application tools to enhance learning experiences.

I am currently serving as a graduate teaching assistant for CS3304. After graduating in the spring, I am starting my career in software engineering, focusing on full-stack development with a strong interest in frontend technologies. 

My goal is to develop my career and skills while building impactful software solutions.`}
      onClick={() => copyHelper(setEmailIcon1)}
      color={"white"}
    />,
    <CardFull
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
          className={styles["fullCard"]}
          src="/torgbridge.png"
          alt="torg bridge"
          style={{
            objectFit: "cover",
            objectPosition: "30% 50%",
            borderRadius: "15px",
          }}
        />
      }
      description={<Typography variant="subtitle1"></Typography>}
      onClick={(event) =>
        handleLinkClick(event, "https://maps.app.goo.gl/huAw6wiTuKHKKLXW9")
      }
      color={"white"}
    />,
    <CardFull
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
          className={styles["fullCard"]}
          src="/roanoke.jpg"
          alt="roanoke"
          style={{
            objectFit: "cover",
            objectPosition: "70% 50%",
            borderRadius: "15px",
          }}
        />
      }
      description={<Typography variant="subtitle1"></Typography>}
      onClick={(event) =>
        handleLinkClick(event, "https://maps.app.goo.gl/oJXauBhzwjb6kENFA")
      }
      color={"white"}
    />,
    <CardFull
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
          className={styles["fullCard"]}
          src="/washington.jpg"
          alt="washington"
          style={{
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />
      }
      description={<Typography variant="subtitle1"></Typography>}
      onClick={(event) =>
        handleLinkClick(event, "https://maps.app.goo.gl/zWhiEp2jX82GdUr86")
      }
      color={"white"}
    />,
    <CardFull
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
          className={styles["fullCard"]}
          src="/newyork.avif"
          alt="new york"
          style={{
            objectFit: "cover",
            borderRadius: "15px",
            objectPosition: "70% 50%",
          }}
        />
      }
      description={<Typography variant="subtitle1"></Typography>}
      onClick={(event) =>
        handleLinkClick(event, "https://maps.app.goo.gl/nKmsUmyYUyk2CopSA")
      }
      color={"white"}
    />,
  ];

  const education = [
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Virginia Tech</Typography>
          <LinkIcon
            sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
          />
        </div>
      }
      pic={
        <img
          className={styles["vt-logo"]}
          src="/Virginia-Tech-Logo.png"
          alt="vt logo 2"
          style={{
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
      onClick={(event) =>
        handleLinkClick(event, "https://graduateschool.vt.edu/")
      }
    />,
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Virginia Tech</Typography>
          <LinkIcon
            sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
          />
        </div>
      }
      pic={
        <img
          className={styles["vt-logo"]}
          src="/Virginia-Tech-Logo.png"
          alt="vt logo 2"
          style={{
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
      onClick={(event) => handleLinkClick(event, "https://eng.vt.edu/")}
    />,
  ];

  const links = [
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">LinkedIn</Typography>
          <LinkIcon
            sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
          />
        </div>
      }
      pic={
        <img
          className={styles["vt-logo"]}
          src="/linkedin.webp"
          alt="linkedin"
          style={{
            borderRadius: "15px",
          }}
        />
      }
      description={<Typography variant="subtitle1">@tbux</Typography>}
      onClick={(event) =>
        handleLinkClick(event, "https://www.linkedin.com/in/tbux/")
      }
    />,
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">GitHub</Typography>
          <LinkIcon
            sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
          />
        </div>
      }
      pic={
        <img
          className={styles["vt-logo"]}
          src="/GitHub.png"
          alt="github"
          style={{
            borderRadius: "15px",
          }}
        />
      }
      description={<Typography variant="subtitle1">@tbux408</Typography>}
      onClick={(event) => handleLinkClick(event, "https://github.com/tbux408")}
    />,
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Google Scholar</Typography>
          <LinkIcon
            sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
          />
        </div>
      }
      pic={
        <img
          className={styles["vt-logo"]}
          src="/google-scholar.jpg"
          alt="google scholar"
          style={{
            borderRadius: "15px",
          }}
        />
      }
      description={<Typography variant="subtitle1">Tyler Buxton</Typography>}
      onClick={(event) =>
        handleLinkClick(
          event,
          "https://scholar.google.com/citations?user=fqV5wFcAAAAJ&hl=en&oi=ao"
        )
      }
    />,
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Email</Typography>
          {emailIcon2}
        </div>
      }
      pic={
        <img
          className={styles["gmail-logo"]}
          src="/gmail.webp"
          alt="gmail"
          style={{
            borderRadius: "15px",
          }}
        />
      }
      description={<Typography variant="subtitle1">tbux@vt.edu</Typography>}
      onClick={() => copyHelper(setEmailIcon2)}
    />,
  ];

  const skills = [
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Deployment</Typography>
          <Tooltip title="Back-end">
            <TerminalIcon
              sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
            />
          </Tooltip>
        </div>
      }
      pic={
        <img
          className={styles["gmail-logo"]}
          src="/docker.svg"
          alt="docker"
          style={{
            borderRadius: "15px",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">Docker, Kubernetes, Adminer</Typography>
      }
    />,
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Artificial Intelligence</Typography>
          <Tooltip title="Back-end">
            <TerminalIcon
              sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
            />
          </Tooltip>
        </div>
      }
      pic={
        <img
          className={styles["vt-logo"]}
          src="/gemini.png"
          alt="gemini"
          style={{
            borderRadius: "15px",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">OpenAI, Gemini, Ollama</Typography>
      }
    />,
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Frameworks</Typography>
          <Tooltip title="Front-end">
            <WebIcon
              sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
            />
          </Tooltip>
        </div>
      }
      pic={
        <img
          className={styles["gmail-logo"]}
          src="/react.png"
          alt="react"
          style={{
            borderRadius: "15px",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">
          React.js, Next.js, Angular, Vue
        </Typography>
      }
    />,
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Back-end</Typography>
          <Tooltip title="Back-end">
            <TerminalIcon
              sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
            />
          </Tooltip>
        </div>
      }
      pic={
        <img
          className={styles["vt-logo"]}
          src="/django.png"
          alt="django"
          style={{
            borderRadius: "15px",
          }}
        />
      }
      description={<Typography variant="subtitle1">Django, Poetry</Typography>}
    />,
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Front-end Languages</Typography>
          <Tooltip title="Front-end">
            <WebIcon
              sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
            />
          </Tooltip>
        </div>
      }
      pic={
        <img
          className={styles["gmail-logo"]}
          src="/typescript.webp"
          alt="typescript"
          style={{
            borderRadius: "15px",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">
          HTML, CSS, JavaScript, TypeScript
        </Typography>
      }
    />,

    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Back-end Languages</Typography>
          <Tooltip title="Back-end">
            <TerminalIcon
              sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
            />
          </Tooltip>
        </div>
      }
      pic={
        <img
          className={styles["vt-logo"]}
          src="/python.png"
          alt="python"
          style={{
            borderRadius: "15px",
          }}
        />
      }
      description={<Typography variant="subtitle1">Python, Java</Typography>}
    />,
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Databases</Typography>
          <Tooltip title="Databases">
            <LayersIcon
              sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
            />
          </Tooltip>
        </div>
      }
      pic={
        <img
          className={styles["gmail-logo"]}
          src="/sql.png"
          alt="sql"
          style={{
            borderRadius: "15px",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">
          SQL, MariaDB, SQLite, Firebase
        </Typography>
      }
    />,
  ];

  const groups = [
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Lambda Chi Alpha</Typography>
          <LinkIcon
            sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
          />
        </div>
      }
      pic={
        <img
          className={styles["gmail-logo"]}
          src="/LMBD.webp"
          alt="lambda chi alpha"
          style={{
            borderRadius: "15px",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">
          🥇 Academic Scholarship Winner
        </Typography>
      }
      onClick={(event) => handleLinkClick(event, "https://www.lambdachi.org/")}
    />,
    <Card
      title={
        <div className={styles["description"]}>
          <Typography variant="h5">Phi Beta Kappa</Typography>
          <LinkIcon
            sx={{ color: theme.palette.secondary.dark, fontSize: 30 }}
          />
        </div>
      }
      pic={
        <img
          className={styles["vt-logo"]}
          src="/phi-beta-kappa-logo.webp"
          alt="phi beta kappa"
          style={{
            borderRadius: "15px",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">
          Prestigious academic honor society
        </Typography>
      }
      onClick={(event) => handleLinkClick(event, "https://www.pbk.org/")}
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
        <CardCarousel cards={links} />
      </div>
      <TitleCard message={"Skills"} id={4} action={""} />
      <div className={styles["box"]}>
        <CardCarousel cards={skills} />
      </div>
      <TitleCard message={"Organizations"} id={5} action={""} />
      <div className={styles["box"]}>
        <CardCarousel cards={groups} />
      </div>
    </div>
  );
}

export default About;
