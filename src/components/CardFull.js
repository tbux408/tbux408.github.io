import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/CardFull.module.css";
import TitleIcon from "@mui/icons-material/Title";
import { Divider } from "@mui/material";

function CardFull({ title, pic, description, onClick, color = "black" }) {
  const theme = useTheme();
  // const [color, setColor] = useState(theme.palette.secondary.main);
  return (
    <div className={styles["container"]} onClick={onClick}>
      <div className={styles["box"]} style={{ color: color }}>
        {title}
        <div>
          <Divider sx={{ backgroundColor: color }} />
          {description}
        </div>
      </div>
      <div className={styles["pic"]}>{pic}</div>
    </div>
  );
}

export default CardFull;
