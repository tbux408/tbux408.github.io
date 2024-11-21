import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/PictureButton.module.css";
import TitleIcon from "@mui/icons-material/Title";

function PictureButton({ navigate }) {
  const theme = useTheme();
  const [color, setColor] = useState(theme.palette.secondary.main);
  return (
    <div
      className={styles["container"]}
      onClick={() => {
        navigate("/about");
      }}
    >
      <img
        className={styles["picture"]}
        src="/torgbridge.png"
        alt="torg bridge"
        style={{
          width: "100%",
          height: "692px",
          objectFit: "cover",
        }}
      />
      <div className={styles["info-container"]}>
        <div className={styles["box"]}>
          <Typography variant="h3">
            <b className={styles["title"]}>Tyler Buxton</b>
          </Typography>
          <div
            className={styles["headshot-border"]}
            style={{
              "--light-color": theme.palette.secondary.dark, // Set light color variable
            }}
          >
            <img
              className={styles["headshot"]}
              src="/tyler.jpg"
              alt="tyler buxton"
            />
          </div>

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
  );
}

export default PictureButton;
