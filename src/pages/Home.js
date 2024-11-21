import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, CircleF } from "@react-google-maps/api";
import { StandaloneSearchBox, MarkerF } from "@react-google-maps/api";
import styles from "../styles/Home.module.css";
import { useNavigate } from "react-router-dom";
import PictureButton from "../components/PictureButton";
import ResumeButton from "../components/ResumeButton";
import ExperienceButton from "../components/ExperienceButton";
import ProjectButton from "../components/ProjectButton";

function Home() {
  const [coordinates, setCoordinates] = useState("usCenter");
  const navigate = useNavigate();
  useEffect(() => {}, []);

  // `/find?lat=${coordinates.lat}&lng=${coordinates.lng}&radius=${radius}
  return (
    <div style={{ width: "100%" }}>
      <PictureButton navigate={navigate} />
      <ResumeButton navigate={navigate} />
      <div className={styles["box-container"]}>
        <div className={styles["box-1"]}>
          <ExperienceButton navigate={navigate} />
        </div>
        <div className={styles["box-2"]}>
          <ProjectButton navigate={navigate} />
        </div>
      </div>
    </div>
  );
}

export default Home;
