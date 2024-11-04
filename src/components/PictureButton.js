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
          height: "30rem",
          objectFit: "cover",
        }}
      />
      <div className={styles["info-container"]}>
        <div className={styles["box"]}>
          <Typography variant="h3" gutterBottom>
            <b>Tyler Buxton</b>
          </Typography>
          <img
            className={styles["headshot"]}
            src="/tylerclear.png"
            alt="torg bridge"
          />
          <div
            className={styles["button"]}
            style={{
              "--main-color": theme.palette.action.main, // Set main color variable
              "--light-color": theme.palette.action.light, // Set light color variable
            }}
          >
            <Typography variant="subtitle2">Learn more</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PictureButton;
