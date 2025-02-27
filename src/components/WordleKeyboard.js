import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/WordleKeyboard.module.css";

function WordleKeyboard({
  text,
  keyBoardType,
  enableKeys,
  word,
  currentWord,
  guesses,
}) {
  const theme = useTheme();
  const [color, setColor] = useState(theme.palette.secondary.main);
  const calcSubColor = () => {
    if (
      guesses
        .slice(0, currentWord)
        .some((guess) =>
          guess.text
            .split("")
            .some((c, ci) => c === text && c === word.split("")[ci])
        )
    ) {
      return "#00800030";
    } else if (
      guesses
        .slice(0, currentWord)
        .some((guess) =>
          guess.text
            .split("")
            .some((c, ci) => c === text && word.split("").includes(c))
        )
    ) {
      return "#FFC72C30";
    } else if (
      guesses
        .slice(0, currentWord)
        .some((guess) => guess.text.split("").some((c) => c === text))
    ) {
      return "#16161730";
    }
  };
  return (
    <div
      className={styles["square-box"]}
      style={{
        opacity: enableKeys ? "" : "25%",
        cursor: enableKeys ? "" : "default",
        backgroundColor: calcSubColor(),
      }}
      onClick={() => keyBoardType(text)}
    >
      {text === "delete" || text === "enter" ? text : text.toUpperCase()}
    </div>
  );
}

export default WordleKeyboard;
