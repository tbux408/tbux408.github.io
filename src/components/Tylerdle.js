import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/Tylerdle.module.css";
import { Collapse } from "@mui/material";
import dayjs from "dayjs";

import WordleSquare from "./WordleSquare";
import WordleKeyboard from "./WordleKeyboard";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import WordleDate from "./WordleDate";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";

function Tylerdle({ id }) {
  const theme = useTheme();
  // const [color, setColor] = useState(theme.palette.secondary.main);
  const topRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const midRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const botRow = ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"];

  const [guesses, setGuesses] = useState(["", "", "", "", "", ""]);
  const [currentWord, setCurrentWord] = useState(0);

  const [word, setWord] = useState("start");
  const [wordList, setWordList] = useState({});

  const [enableKeys, setEnableKeys] = useState(false);
  const [message, setMessage] = useState("");

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [tempDate, setTempDate] = useState(dayjs());

  const [history, setHistory] = useState([]);

  const [checkedCollapse, setCheckedCollapse] = useState(false);

  const setMessageHelper = (m) => {
    setMessage(m);
    setTimeout(() => {
      if (message === m) {
        setMessage(null);
      }
    }, 5000);
  };

  const startDate = dayjs("2024-01-01");
  const dateToDayNumber = (date) => {
    return date.diff(startDate, "day") + 1;
  };

  const dayNumberToDate = (dayNumber) => {
    return startDate.add(dayNumber - 1, "day");
  };

  const initialize = (json) => {
    setWordList(json);
    setWord(json[dateToDayNumber(selectedDate)]);

    // Handle Local Storage Data
    const nCurrentDay = localStorage.getItem("TYLERDLE_CURRENT_DAY");
    const nCurrentWord = Number(localStorage.getItem("TYLERDLE_CURRENT_WORD"));
    const nHistory = JSON.parse(localStorage.getItem("TYLERDLE_HISTORY"));
    const nGuesses = JSON.parse(localStorage.getItem("TYLERDLE_GUESSES"));
    console.log(nCurrentWord, nGuesses);
    // console.log(nGuesses);
    if (
      nCurrentDay &&
      dayjs(nCurrentDay).isSame(selectedDate, "day") &&
      nCurrentWord &&
      nGuesses &&
      nGuesses[0].text === undefined
    ) {
      setCurrentWord(nCurrentWord);
      setGuesses(nGuesses);
    }

    if (nHistory) {
      setHistory(nHistory);
    }
  };

  useEffect(() => {
    console.log("fetching JSON");
    const fetchFile = async () => {
      try {
        const response = await fetch("/wordle.json");
        const jsonFile = await response.json();
        initialize(jsonFile);
        // Store it once
      } catch (error) {
        console.error("Error fetching JSON:", error);
      }
    };

    fetchFile();
  }, []); // Fetch only on mount

  // Separate effect to update word when selectedDate changes
  // useEffect(() => {
  //   if (wordList[dateToDayNumber(selectedDate)] === undefined) return; // Avoid running before JSON loads
  //   // console.log(dateToDayNumber(selectedDate));
  //   // console.log(wordList[dateToDayNumber(selectedDate)]);
  //   console.log("Initializing");
  //   setWord(wordList[dateToDayNumber(selectedDate)]);

  //   // Handle Local Storage Data
  //   const nCurrentDay = localStorage.getItem("TYLERDLE_CURRENT_DAY");
  //   const nCurrentWord = Number(localStorage.getItem("TYLERDLE_CURRENT_WORD"));
  //   const nHistory = JSON.parse(localStorage.getItem("TYLERDLE_HISTORY"));
  //   const nGuesses = JSON.parse(localStorage.getItem("TYLERDLE_GUESSES"));
  //   // console.log(nGuesses);
  //   if (
  //     nCurrentDay &&
  //     dayjs(nCurrentDay).isSame(selectedDate, "day") &&
  //     nCurrentWord &&
  //     nGuesses
  //   ) {
  //     setCurrentWord(nCurrentWord);
  //     setGuesses(nGuesses);
  //   }

  //   if (nHistory) {
  //     setHistory(nHistory);
  //   }
  // }, [wordList]);

  const ref = useRef(null);
  const refDate = useRef(null);

  const setGuessesLocal = (nGuesses) => {
    setGuesses(nGuesses);
    if (dayjs().isSame(selectedDate, "day")) {
      localStorage.setItem("TYLERDLE_GUESSES", JSON.stringify(nGuesses));
      localStorage.setItem(
        "TYLERDLE_CURRENT_DAY",
        selectedDate.format("YYYY-MM-DD")
      );
    }
    // console.log(nGuesses);
  };
  const setCurrentWordLocal = (nCurrentWord) => {
    setCurrentWord(nCurrentWord);
    if (dayjs().isSame(selectedDate, "day")) {
      localStorage.setItem("TYLERDLE_CURRENT_WORD", nCurrentWord);
    }
  };
  const setHistoryLocal = (nHistory) => {
    setHistory(nHistory);
    localStorage.setItem("TYLERDLE_HISTORY", JSON.stringify(nHistory));
  };

  const keyBoardType = (letter) => {
    // console.log(currentWord);
    if (currentWord >= 6) return;
    if (letter === "enter") {
      if (
        guesses[currentWord].length === 5 &&
        Object.values(wordList).some(
          (value) => value.toLowerCase() === guesses[currentWord].toLowerCase()
        )
      ) {
        if (guesses[currentWord] === word) {
          setMessage("🎉 " + word.toUpperCase() + " 🎉");
          if (selectedDate.isSame(dayjs(), "day")) {
            setHistoryLocal([
              ...history,
              { date: selectedDate.format("YYYY-MM-DD"), type: 0 },
            ]);
          } else if (
            !history.some((h) => dayjs(h.date).isSame(selectedDate, "day"))
          ) {
            setHistoryLocal([
              ...history,
              { date: selectedDate.format("YYYY-MM-DD"), type: 1 },
            ]);
          }
          setCurrentWordLocal(6);
        } else if (currentWord < 5) {
          setCurrentWordLocal(currentWord + 1);
        } else {
          setCurrentWordLocal(currentWord + 1);
          setMessage(word.toUpperCase());
        }
        setGuessesLocal(guesses);
      } else {
        setMessageHelper("Invalid Word");
      }
    } else if (letter === "delete" || letter === "backspace") {
      const newGuesses = [...guesses];
      newGuesses[currentWord] = newGuesses[currentWord].slice(
        0,
        newGuesses[currentWord].length === 0
          ? 0
          : newGuesses[currentWord].length - 1
      );
      setGuesses(newGuesses);
    } else if (guesses[currentWord].length < 5) {
      const newGuesses = [...guesses];
      newGuesses[currentWord] = newGuesses[currentWord].concat(letter);
      setGuesses(newGuesses);
    }
  };

  const handleKeyPress = useCallback(
    (event) => {
      if (!enableKeys) return;

      const key = event.key.toLowerCase();
      if ([...topRow, ...midRow, ...botRow, "backspace"].includes(key)) {
        keyBoardType(key);
      }
    },
    [enableKeys, keyBoardType]
  ); // Memoize dependencies

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(event.target.tagName);

      if (
        (ref.current && !ref.current.contains(event.target)) ||
        event.target.tagName === "INPUT"
      ) {
        setEnableKeys(false);
      }
      if (refDate.current && !refDate.current.contains(event.target)) {
        setCheckedCollapse(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChangeCollapse = () => {
    setCheckedCollapse((prev) => !prev);
  };

  const setSelectedDateHelper = (value) => {
    setCheckedCollapse(false);
    setSelectedDate(value);
    setTempDate(value);
    setWord(wordList[dateToDayNumber(value)]);

    if (dayjs().isSame(value, "day")) {
      const nCurrentWord = Number(
        localStorage.getItem("TYLERDLE_CURRENT_WORD")
      );
      const nGuesses = JSON.parse(localStorage.getItem("TYLERDLE_GUESSES"));
      if (nCurrentWord && nGuesses && nGuesses[0].text === undefined) {
        setCurrentWord(nCurrentWord);
        setGuesses(nGuesses);
      }
    } else {
      setCurrentWord(0);
      setGuesses(["", "", "", "", "", ""]);
    }
    setMessage("");
  };

  const handleShuffle = () => {
    const ranNum = Math.floor(Math.random() * dateToDayNumber(dayjs())) + 1;
    if (
      !history.some((h) => dayjs(h.date).isSame(dayNumberToDate(ranNum), "day"))
    ) {
      setSelectedDateHelper(dayNumberToDate(ranNum));
    } else if (history.length < dateToDayNumber(dayjs())) {
      handleShuffle();
    }
  };

  const handleSetEnableKeys = (event) => {
    if (!refDate.current.contains(event.target)) {
      setEnableKeys(true);
    }
  };

  return (
    <div
      className={styles["container"]}
      onMouseDown={handleSetEnableKeys}
      ref={ref}
      id={id}
    >
      {/* <button onClick={searchWord}>Here</button> */}
      {message && (
        <div
          className={styles["message-container"]}
          style={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            backdropFilter: "blur(2px)",
          }}
        >
          <Typography variant="h6">{message}</Typography>
        </div>
      )}
      <div className={styles["game-box"]}>
        <div className={styles["calendar-position"]} ref={refDate}>
          <div className={styles["calendar-container"]}>
            <div className={styles["calendar-box"]}>
              <div
                className={styles["calendar-open"]}
                title="shuffle puzzle"
                onClick={handleShuffle}
              >
                <ShuffleIcon />
              </div>
              <div
                className={styles["calendar-date"]}
                onClick={handleChangeCollapse}
                title="Open Menu"
              >
                <Typography variant="h6" className={styles["overflow-text"]}>
                  {checkedCollapse ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
                  {selectedDate.format("dddd, MMMM D, YYYY")}{" "}
                </Typography>
              </div>
            </div>
            <Collapse in={checkedCollapse}>
              <WordleDate
                selectedDate={selectedDate}
                setSelectedDateHelper={setSelectedDateHelper}
                tempDate={tempDate}
                setTempDate={setTempDate}
                history={history}
                guesses={guesses}
                wordToGuess={word}
                currentWord={currentWord}
                wordList={wordList}
                setEnableKeys={setEnableKeys}
              />
            </Collapse>
          </div>
        </div>

        {guesses.map((guess, i) => (
          <WordleSquare
            key={i}
            text={guess}
            submitted={i < currentWord}
            enableKeys={enableKeys}
            word={word}
            guesses={guesses}
            index={i}
            currentWord={currentWord}
          />
        ))}
        <div className={styles["keyboard"]}>
          {[topRow, midRow, botRow].map((row, rowIndex) => (
            <div key={rowIndex} className={styles["keys"]}>
              {row.map((k, i) => (
                <WordleKeyboard
                  enableKeys={enableKeys}
                  key={i}
                  keyBoardType={keyBoardType}
                  text={k}
                  word={word}
                  guesses={guesses}
                  currentWord={currentWord}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tylerdle;
