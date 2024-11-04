import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/HeaderMoreInfo.module.css";
import TitleIcon from "@mui/icons-material/Title";

function HeaderMoreInfo({ info }) {
  const theme = useTheme();
  return (
    <div>
      {info.map((e, index) => (
        <div className={styles.container} key={index}>
          {e.title}
          {e.content.map((l, index2) => (
            <Typography
              variant="h6"
              gutterBottom
              className={styles.button}
              key={index2}
            >
              <b>{l.name}</b>
            </Typography>
          ))}
        </div>
      ))}
    </div>
  );
}

export default HeaderMoreInfo;
