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
            Gitit is an innovative tool designed to help students master core
            computer science concepts with engaging, interactive visualizations.
            Featuring hands-on exercises for Command Line and Git, Gitit makes
            learning practical, engaging, and effective.
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
            Gitit empowers educators to create dynamic online courses with
            personalized exercises tailored to their students' needs.
            Instructors can effortlessly track progress and gain valuable
            insights into student performance and engagement. Gitit provides
            instructors a tool to effectively support and enhance student
            learning.
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
            practical concepts through visual interaction. Additionally, Gitit
            offers a rich database of pre-created exercises, making it easy for
            anyone to start learning and for instructors to assign ready-made
            activities.
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
            Questle? is an exciting reverse 20 Questions game powered by Google
            Gemini, blending the nostalgia of the classic handheld 20 Questions
            game with the addictive charm of modern Wordle-style gameplay. Each
            day, players face a new challenge as they try to guess the word of
            the day by asking strategic yes-or-no questions. With its unique
            fusion of tradition and innovation, Questle? offers a fresh,
            interactive puzzle experience.
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
            Hotel Scouter is an advanced property acquisition tool that
            leverages machine learning to optimize investment decisions in the
            hospitality industry. Designed with predictive analytics, the
            platform provides Marriott executives and analysts with ranked
            location recommendations based on factors such as average daily
            rates and proximity to popular attractions. With a modular
            architecture, integration of APIs like Google, and an intuitive
            front-end powered by Google Maps, Hotel Scouter streamlines
            decision-making for strategic property acquisitions in the U.S.,
            delivering data-driven insights to maximize return on investment.
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
            Hotel Scouter identifies all hotels and nearby points of interest
            within a specified area, offering a detailed view of the local
            landscape. Using advanced machine learning, it predicts the average
            daily room rates and compares them to actual prices, enabling quick
            and informed decisions for optimal property acquisition.
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
            Lambda Drive is a tailored management system designed specifically
            for fraternities, streamlining member organization and task
            assignments. Its standout feature is a secure ride-sharing system
            that allows users to safely arrange transportation by entering their
            departure and destination details into a dynamic queue. By
            prioritizing safety and efficiency, Lambda Drive provides a seamless
            solution for managing responsibilities and ensuring reliable
            transportation within campus communities.
          </Typography>
        }
      />,
      <CardPicture
        pic={
          <img className={[styles["image"]]} src="/drive2.png" alt="Drive 2" />
        }
        description={
          <Typography variant="subtitle1" styles={{ wordBreak: "break-word" }}>
            Lambda Drive is a versatile fraternity management system designed to
            streamline event planning and member coordination. At its core is a
            calendar system, allowing administrators to create and manage events
            effortlessly. The event editor enables admins to assign specific
            responsibilities to members, ensuring clear communication and
            accountability within the organization.
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
          <Typography variant="subtitle1" styles={{ wordBreak: "break-word" }}>
            The Book Warehouse is a class project showcasing a fully functional
            bookstore system with an integrated database and user-friendly
            interface. Users can explore books across various categories, add
            their selections to a shopping cart, and seamlessly complete the
            checkout process.
          </Typography>
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
            The AI Chatbot system provides a seamless user signup process,
            enabling participants to create accounts by supplying their name,
            email, and password. Each user is authenticated using JSON Web
            Tokens (JWTs), which securely encode session data to ensure privacy
            and security. This approach not only protects user credentials but
            also facilitates scalable, efficient access to the chatbot's
            personalized features and services.
          </Typography>
        }
      />,
      <CardPicture
        pic={<img className={[styles["image"]]} src="/eft2.png" alt="eft 2" />}
        description={
          <Typography variant="subtitle1" styles={{ wordBreak: "break-word" }}>
            The AI Chatbot is a tool designed to implement episodic future
            thinking (EFT) cue text generation, aimed at supporting the
            treatment of obesity and type 2 diabetes. Powered by OpenAI’s large
            language models (LLMs), the chatbot delivers personalized, AI-driven
            guidance, helping users visualize future scenarios that encourage
            healthier decision-making and lifestyle changes. This innovative
            approach enhances accessibility and scalability, offering a
            powerful, research-backed resource for improving long-term health
            outcomes.
          </Typography>
        }
      />,
      <CardPicture
        pic={<img className={[styles["image"]]} src="/eft4.png" alt="eft 4" />}
        description={
          <Typography variant="subtitle1" styles={{ wordBreak: "break-word" }}>
            At the conclusion of each interaction with the AI Chatbot, users are
            guided through a comprehensive usability assessment designed to
            evaluate their experience. This assessment, based on established
            metrics like the System Usability Scale (SUS), gathers valuable
            feedback on user satisfaction, interface design, and overall
            functionality. The insights collected are essential for refining the
            chatbot, ensuring it remains user-friendly and effective in
            delivering episodic future thinking interventions for improved
            health outcomes.
          </Typography>
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
