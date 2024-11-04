import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/CustomTypography.module.css";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "10px",
  fontWeight: 400,
  letterSpacing: "-0.01em",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",

  color: theme.palette.secondary.dark,
}));

function CustomTypography({ message, setChecked, setContent }) {
  const [hover, setHover] = useState(false);
  const theme = useTheme();
  const handleEnter = () => {
    setHover(true);
    setChecked(true);
    setContent(message);
  };
  return (
    <StyledTypography
      variant="subtitle1"
      className={styles.button}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHover(false)}
      style={{
        color: hover && theme.palette.secondary.main,
      }}
    >
      {message}
    </StyledTypography>
  );
}

export default CustomTypography;
