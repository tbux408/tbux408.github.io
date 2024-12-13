import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/Card.module.css";
import TitleIcon from "@mui/icons-material/Title";
import { Divider } from "@mui/material";

function Card({ title, pic, description, onClick, full = false }) {
  const theme = useTheme();
  const [color, setColor] = useState(theme.palette.secondary.main);
  return (
    <div
      className={full ? styles["container-full"] : styles["container"]}
      onClick={onClick}
    >
      {title}
      <div className={styles["box"]}>{pic}</div>
      <Divider />
      {description}
    </div>
  );
}

export default Card;
