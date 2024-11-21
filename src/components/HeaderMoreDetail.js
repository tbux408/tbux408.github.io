import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/HeaderMoreInfo.module.css";
import TitleIcon from "@mui/icons-material/Title";
import { useNavigate } from "react-router-dom";

function HeaderMoreInfo({ info, setChecked }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = (link) => {
    navigate(link);
    setChecked(false);
  };

  return (
    <div className={styles.display}>
      {info.map((e, index) => (
        <div className={styles.container} key={index}>
          {e.title}
          {e.content.map((l, index2) => (
            <Typography variant="h6" key={index2}>
              <b onClick={() => handleClick(l.link)} className={styles.button}>
                {l.name}
              </b>
            </Typography>
          ))}
        </div>
      ))}
    </div>
  );
}

export default HeaderMoreInfo;
