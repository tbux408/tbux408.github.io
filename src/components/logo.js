import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/logo.module.css";
import TitleIcon from "@mui/icons-material/Title";

function Logo({ navigate }) {
  const theme = useTheme();
  const [color, setColor] = useState(theme.palette.secondary.main);
  return (
    <div
      className={styles.logo}
      onMouseEnter={() => setColor(theme.palette.secondary.dark)}
      onMouseLeave={() => setColor(theme.palette.secondary.main)}
      onClick={() => {
        navigate("/");
      }}
      style={{ backgroundColor: color, color: theme.palette.primary.dark }}
    >
      T
      {/* <svg className={styles.circle} viewBox="0 0 400 400">
        <defs>
          <mask id="mask">
            <circle cx="200" cy="200" r="200" fill={color} />
            <text
              x="50%"
              y="88%"
              textAnchor="middle"
              fontSize="300"
              fontFamily="Arial"
              fontWeight="bold"
              fill="black"
            >
              T
            </text>
          </mask>
        </defs>
        <circle cx="200" cy="200" r="200" fill={color} mask="url(#mask)" />
      </svg> */}
    </div>
  );
}

export default Logo;
