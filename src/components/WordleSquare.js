import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/WordleSquare.module.css";

function WordleSquare({
  text,
  submitted,
  enableKeys,
  word,
  guesses,
  currentWord,
  index,
}) {
  const theme = useTheme();
  const [color, setColor] = useState(theme.palette.secondary.main);

  const calcSubColor = (c, i) => {
    const totalCInWord = word.split("").filter((w) => c === w).length;
    const totalCinWordCorrect = word
      .split("")
      .filter((w, wi) => c === w && text.split("")[wi] === w).length;

    if (submitted && c === word.split("")[i]) {
      return "green";
    } else if (
      submitted &&
      word.split("").includes(c) &&
      text
        .split("")
        .slice(0, i + 1)
        .filter((w, wi) => w === c && word.split("")[wi] !== c).length <=
        totalCInWord - totalCinWordCorrect
    ) {
      return "#FFC72C";
    } else {
      return "";
    }
  };

  const calcSubColor2 = (c, i) => {
    const totalCInWord = word.split("").filter((w) => c === w).length;
    const totalCinWordCorrect = word
      .split("")
      .filter((w, wi) => c === w && text.split("")[wi] === w).length;

    if (submitted && c === word.split("")[i]) {
      return "#00800030";
    } else if (
      submitted &&
      word.split("").includes(c) &&
      text
        .split("")
        .slice(0, i + 1)
        .filter((w, wi) => w === c && word.split("")[wi] !== c).length <=
        totalCInWord - totalCinWordCorrect
    ) {
      return "#FFC72C30";
    } else {
      return "";
    }
  };

  const showGreen = (i) => {
    if (
      currentWord === index &&
      guesses.some(
        (g) => g.split("")[text.length + i] === word.split("")[text.length + i]
      )
    ) {
      return word.split("")[text.length + i].toUpperCase();
    }
  };

  const showCursor = (i) => {
    if (
      currentWord === index &&
      guesses.some((g) => g.split("")[i] === word.split("")[i])
    ) {
      return word.split("")[i].toUpperCase();
    } else {
      return "";
    }
  };

  return (
    <div className={styles["container"]}>
      {text.split("").map((c, i) => (
        <div
          key={i}
          className={styles["square-box"]}
          style={{
            backgroundColor: calcSubColor(c, i),
          }}
        >
          <div className={styles["letter-box"]}>
            <div
              className={styles["letter-box"]}
              style={{
                backgroundColor: calcSubColor2(c, i),
              }}
            >
              {i === text.length ? (
                <div
                  className={`${styles["font-size-empty"]} 
                }`}
                >
                  {/* {showCursor(i)}
                  <div className={`${enableKeys && styles["flash"]}`}></div> */}
                </div>
              ) : (
                <div className={styles["font-size"]}>{c.toUpperCase()}</div>
              )}
            </div>
          </div>
        </div>
      ))}

      {Array(5 - text.length)
        .fill()
        .map((_, i) => (
          <div key={i} className={styles["square-box"]}>
            <div className={styles["letter-box"]}>
              <div className={styles["font-size-empty"]}>
                {showGreen(i)}{" "}
                {i === 0 && index === currentWord && (
                  <div className={`${enableKeys && styles["flash"]}`}></div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default WordleSquare;
