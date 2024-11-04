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

function About({ navigate }) {
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

  const cards = [
    <Card
      title={<Typography variant="h5">Tyler Buxton</Typography>}
      pic={
        <img
          className={styles["headshot"]}
          src="/tyler.jpg"
          alt="Tyler"
          style={{
            objectFit: "cover",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">Email: tbux@vt.edu</Typography>
      }
    />,
    <Card
      title={<Typography variant="h5">Blacksburg, VA</Typography>}
      pic={
        <img
          className={styles["headshot"]}
          src="/torgbridge.png"
          alt="torg bridge"
          style={{
            objectFit: "cover",
            objectPosition: "30% 50%",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">Area of Interest</Typography>
      }
    />,
    <Card
      title={<Typography variant="h5">Roanoke, VA</Typography>}
      pic={
        <img
          className={styles["headshot"]}
          src="/roanoke.jpg"
          alt="torg bridge"
          style={{
            objectFit: "cover",
            objectPosition: "70% 50%",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">Area of Interest</Typography>
      }
    />,
    <Card
      title={<Typography variant="h5">Washington, D.C.</Typography>}
      pic={
        <img
          className={styles["headshot"]}
          src="/washington.jpg"
          alt="washington"
          style={{
            objectFit: "cover",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">Area of Interest</Typography>
      }
    />,
    <Card
      title={<Typography variant="h5">New York City, NY</Typography>}
      pic={
        <img
          className={styles["headshot"]}
          src="/newyork.jpg"
          alt="new york"
          style={{
            objectFit: "cover",
          }}
        />
      }
      description={
        <Typography variant="subtitle1">Area of Interest</Typography>
      }
    />,
  ];

  const education = [<Card title={"tyler"} pic={"pic"} description={"des"} />];

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
