import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/TitleCard.module.css";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";

function TitleCard({ message, id, action, backColor }) {
  const theme = useTheme();

  return (
    <div
      className={styles["box"]}
      style={{
        "--text-color": theme.palette.primary.dark, // Set main color variable
        "--back-color": backColor || theme.palette.secondary.main, // Set light color variable
      }}
      id={id}
    >
      <div className={styles["title"]}>
        <Typography variant="h3">
          <b className={styles["font"]}>{message}</b>
        </Typography>
        <div>{action}</div>
      </div>
    </div>
  );
}

export default TitleCard;
