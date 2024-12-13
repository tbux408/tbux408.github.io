import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, CircleF } from "@react-google-maps/api";
import { StandaloneSearchBox, MarkerF } from "@react-google-maps/api";
import styles from "../styles/Project.module.css";
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
import CardPicture from "../components/CardPicture";
import { Divider } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ConstructionIcon from "@mui/icons-material/Construction";
import CodeIcon from "@mui/icons-material/Code";
import ProjectBox from "../components/ProjectBox";

function Projects() {
  const theme = useTheme();
  const location = useLocation();

  const handleLinkClick = (event, url) => {
    if (event.ctrlKey || event.metaKey) {
      window.open(url, "_blank");
    } else {
      window.open(url, "_self");
    }
  };

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

  const project1 = {
    title: "Gitit",
    id: "gitit",
    role: ["Research project"],
    collab: ["1 client"],
    tools: ["React", "Django", "Docker", "Kubernetes"],
    languages: ["JavaScript", "Python"],
    cards: [
      <CardPicture
        pic={
          <img
            className={[styles["image"]]}
            src="/projviz.png"
            alt="vt visualization"
          />
        }
        description={
          <Typography variant="subtitle1" styles={{ wordBreak: "break-word" }}>
            Gitit helps students learn core computer science concepts through
            interactive visualizations. The tools features interactive exercises
            for Command Line and Git.
          </Typography>
        }
      />,
      <CardPicture
        pic={
          <img
            className={[styles["image"]]}
            src="/viz2.png"
            alt="vt visualization 2"
          />
        }
        description={
          <Typography variant="subtitle1">
            Gitit enables the creation of online courses, providing instructors
            with the ability to assign customized exercises to their students.
            Instructors can track student progress, offering insights into
            performance and engagement to better support students' learning.
          </Typography>
        }
      />,
      <CardPicture
        pic={
          <img
            className={[styles["image"]]}
            src="/viz3.png"
            alt="vt visualization 2"
          />
        }
        description={
          <Typography variant="subtitle1">
            Instructors can create custom exercises at varying levels of
            difficulty for their curriculum, enabling them to address specific
            learning objectives and skill levels. These personalized activities
            help engage students more effectively and reinforce critical early
            practical concepts through visual interaction.
          </Typography>
        }
        last={true}
      />,
    ],
    link: (
      <IconButton
        aria-label="open"
        title="open"
        onClick={(event) =>
          handleLinkClick(event, "https://visualizations.endeavour.cs.vt.edu")
        }
      >
        <LinkIcon />
      </IconButton>
    ),
  };

  const project2 = {
    title: "Questle?",
    id: "questle",
    role: ["Google Developer Competition"],
    collab: ["Individual"],
    tools: ["React", "Django"],
    languages: ["JavaScript", "Python"],
    cards: [
      <CardPicture
        pic={
          <iframe
            className={[styles["youtube"]]}
            src="https://www.youtube.com/embed/pocbUB50fsM?si=etIZgamugKHyT6WU"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        }
        description={
          <Typography variant="subtitle1" styles={{ wordBreak: "break-word" }}>
            Questle? is a reverse 20 questions game powered by AI.
          </Typography>
        }
        last="true"
      />,
    ],
    link: (
      <IconButton
        aria-label="open"
        title="open"
        onClick={(event) =>
          handleLinkClick(
            event,
            "https://youtu.be/pocbUB50fsM?si=4YmFRULLfVAeRbYH"
          )
        }
      >
        <LinkIcon />
      </IconButton>
    ),
  };

  const project3 = {
    title: "Hotel Scouter",
    id: "hotelscouter",
    role: ["Code Fest", "Front-end developer"],
    collab: ["5 person team"],
    tools: ["React", "Google Map API"],
    languages: ["JavaScript", "HTML", "CSS"],
    cards: [
      <CardPicture
        pic={
          <img
            className={[styles["image"]]}
            src="/Slide1.png"
            alt="Marriott 1"
          />
        }
        description={
          <Typography variant="subtitle1" styles={{ wordBreak: "break-word" }}>
            Optimal property acquisition tool that uses machine learning.
          </Typography>
        }
      />,
      <CardPicture
        pic={
          <img
            className={[styles["image"]]}
            src="/Slide2.png"
            alt="Marriott 2"
          />
        }
        description={
          <Typography variant="subtitle1" styles={{ wordBreak: "break-word" }}>
            Finds all hotels and points of interest in a given area across the
            United States. Predicts the average price of a room and displays the
            actual price for easy comparison.
          </Typography>
        }
        last="true"
      />,
    ],
    link: (
      <IconButton
        aria-label="open"
        title="open"
        onClick={(event) =>
          handleLinkClick(event, "https://github.com/tbux408/marriott")
        }
      >
        <LinkIcon />
      </IconButton>
    ),
  };

  const project4 = {
    title: "Ride Share",
    id: "rideshare",
    role: ["Fraternity Project"],
    collab: ["Individual project"],
    tools: ["Vue", "Django"],
    languages: ["JavaScript", "Python"],
    cards: [
      <CardPicture
        pic={
          <img className={[styles["image"]]} src="/drive1.png" alt="Drive 1" />
        }
        description={
          <Typography variant="subtitle1" styles={{ wordBreak: "break-word" }}>
            Allows anyone to safely get a ride from a departure and destination
            by adding their information to a queue.{" "}
          </Typography>
        }
      />,
      <CardPicture
        pic={
          <img className={[styles["image"]]} src="/drive2.png" alt="Drive 2" />
        }
        description={
          <Typography variant="subtitle1" styles={{ wordBreak: "break-word" }}>
            Event editor allows an admin to create an event and assign drivers
            and monitors.
          </Typography>
        }
        last="true"
      />,
    ],
    link: <div></div>,
  };
  const project5 = {
    title: "The Book Warehouse",
    id: "bookstore",
    role: ["Course project"],
    collab: ["Individual"],
    tools: ["Vue", "Gradle"],
    languages: ["JavaScript", "Java"],
    cards: [
      <CardPicture
        pic={
          <img
            className={[styles["image"]]}
            src="/bookstore1.png"
            alt="Drive 1"
          />
        }
        description={
          <Typography
            variant="subtitle1"
            styles={{ wordBreak: "break-word" }}
          ></Typography>
        }
      />,
      <CardPicture
        pic={
          <img
            className={[styles["image"]]}
            src="/bookstore2.png"
            alt="Drive 2"
          />
        }
        description={
          <Typography
            variant="subtitle1"
            styles={{ wordBreak: "break-word" }}
          ></Typography>
        }
        last="true"
      />,
    ],
    link: <div></div>,
  };

  const project6 = {
    title: "AI Chatbot",
    id: "chatbot",
    role: ["Capstone project"],
    collab: ["4 person team", "1 client"],
    tools: ["React", "Quart", "Ollama", "OpenAI"],
    languages: ["JavaScript", "Python"],
    cards: [
      <CardPicture
        pic={<img className={[styles["image"]]} src="/eft1.png" alt="eft 1" />}
        description={
          <Typography variant="subtitle1" styles={{ wordBreak: "break-word" }}>
            User signup with JWT authentication.
          </Typography>
        }
      />,
      <CardPicture
        pic={<img className={[styles["image"]]} src="/eft2.png" alt="eft 2" />}
        description={
          <Typography variant="subtitle1" styles={{ wordBreak: "break-word" }}>
            AI chatbot designed to implement episodic future thinking cue text
            generation for the treatment of obesity and type 2 diabetes.
          </Typography>
        }
      />,
      <CardPicture
        pic={<img className={[styles["image"]]} src="/eft4.png" alt="eft 4" />}
        description={
          <Typography
            variant="subtitle1"
            styles={{ wordBreak: "break-word" }}
          ></Typography>
        }
      />,
      <CardPicture
        pic={<img className={[styles["image"]]} src="/eft3.png" alt="eft 3" />}
        description={
          <Typography
            variant="subtitle1"
            styles={{ wordBreak: "break-word" }}
          ></Typography>
        }
        last={true}
      />,
    ],
    link: (
      <IconButton
        aria-label="open"
        title="open"
        onClick={(event) =>
          handleLinkClick(
            event,
            "https://vtechworks.lib.vt.edu/server/api/core/bitstreams/11516088-01bd-4923-8adc-b3c83212579f/content"
          )
        }
      >
        <LinkIcon />
      </IconButton>
    ),
  };
  return (
    <div>
      <ProjectBox project={project1} />
      <div className={styles["space"]}></div>
      <ProjectBox project={project6} />
      <div className={styles["space"]}></div>
      <ProjectBox project={project3} />
      <div className={styles["space"]}></div>
      <ProjectBox project={project2} />
      <div className={styles["space"]}></div>
      <ProjectBox project={project4} />
      <div className={styles["space"]}></div>
      <ProjectBox project={project5} />
      <div className={styles["space"]}></div>
      {/* <div className={styles["comingsoon"]}>More Coming Soon...</div> */}
    </div>
  );
}

export default Projects;
