import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/CardPicture.module.css";
import TitleIcon from "@mui/icons-material/Title";
import { Divider } from "@mui/material";

function CardPicture({ pic, description, last = false }) {
  const theme = useTheme();
  const [color, setColor] = useState(theme.palette.secondary.main);
  return (
    <div className={styles["container"]}>
      <div className={styles["box"]}>{pic}</div>
      <div className={`${styles["divider"]} ${last ? styles["margin"] : ""}`}>
        <Divider />
      </div>
      <div className={styles["margin"]}>{description}</div>
    </div>
  );
}

export default CardPicture;
