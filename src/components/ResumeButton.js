import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/ResumeButton.module.css";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";

function ResumeButton({ navigate }) {
  const theme = useTheme();
  const [color, setColor] = useState(theme.palette.secondary.main);

  return (
    <div
      className={styles["container"]}
      onClick={() => {
        navigate("/resume");
      }}
    >
      <div
        className={styles["picture"]}
        style={{
          width: "100%",
          height: "692px",
          objectFit: "cover",
        }}
      />
      <div className={styles["info-container"]}>
        <div className={styles["box"]}>
          <div className={styles["title"]}>
            <Typography variant="h3">
              <b className={styles["title-text"]}>Resume 2024</b>
            </Typography>
            <Typography
              variant="subtitle1"
              className={styles["title-sub-text"]}
              gutterBottom
            >
              Easy Download.
            </Typography>

            <div
              className={styles["button"]}
              style={{
                "--main-color": theme.palette.secondary.main, // Set main color variable
                "--light-color": theme.palette.secondary.dark, // Set light color variable
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
          <img className={styles["headshot"]} src="/resume.png" alt="project" />
        </div>
      </div>
    </div>
  );
}

export default ResumeButton;
