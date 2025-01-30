import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/CardFullMoreInfo.module.css";
import TitleIcon from "@mui/icons-material/Title";
import { Divider } from "@mui/material";

function CardFullMoreInfo({
  title,
  pic,
  description,
  onClick,
  color = "black",
}) {
  const theme = useTheme();

  const [isExpanded, setIsExpanded] = useState(false);

  const onClickDiv = (event) => {
    event.stopPropagation();
    setIsExpanded(true);
  };

  // const [color, setColor] = useState(theme.palette.secondary.main);
  return (
    <div className={styles["container"]} onClick={() => setIsExpanded(false)}>
      <div className={styles["box"]} style={{ color: color }}>
        <div className={styles["title"]}>{title}</div>
        <Typography
          variant="subtitle1"
          className={`${styles["description"]} ${
            isExpanded ? styles["expanded"] : ""
          }`}
          onClick={onClickDiv}
        >
          <Divider sx={{ backgroundColor: color }} />
          {description}
        </Typography>
      </div>
      <div className={styles["pic"]}>{pic}</div>
    </div>
  );
}

export default CardFullMoreInfo;
