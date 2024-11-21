import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/ExperienceButton.module.css";
import TitleIcon from "@mui/icons-material/Title";

function ExperienceButton({ navigate }) {
  const theme = useTheme();
  const [color, setColor] = useState(theme.palette.secondary.main);
  return (
    <div
      className={styles["container"]}
      onClick={() => {
        navigate("/experience");
      }}
    >
      <div
        className={styles["picture"]}
        style={{
          width: "100%",
          height: "580px",
          objectFit: "cover",
        }}
      />
      <div className={styles["info-container"]}>
        <div className={styles["box"]}>
          <img
            className={styles["headshot"]}
            src="/Experience.png"
            alt="torg bridge"
          />

          <div className={styles["details"]}>
            <Typography variant="h3" gutterBottom color="black">
              <b className={styles["title-text"]}>Experience</b>
            </Typography>
            <div
              className={styles["button"]}
              style={{
                "--main-color": theme.palette.action.main, // Set main color variable
                "--light-color": theme.palette.action.light, // Set light color variable
              }}
            >
              <Typography
                variant="subtitle2"
                className={styles["title-sub-text"]}
              >
                Learn more
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceButton;
