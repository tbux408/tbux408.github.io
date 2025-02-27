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

function Tylerdle({ id }) {
  const theme = useTheme();
  // const [color, setColor] = useState(theme.palette.secondary.main);
  const topRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const midRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const botRow = ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"];

  // const searchWord = async () => {
  //   const word = "hamza";
  //   const response = await fetch(
  //     `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  //   );
  //   if (!response.ok) {
  //     throw new Error("Word not found.");
  //   }
  //   const data = await response.json();
  // };

  const [guesses, setGuesses] = useState([
    { text: "_", submitted: false },
    { text: "", submitted: false },
    { text: "", submitted: false },
    { text: "", submitted: false },
    { text: "", submitted: false },
    { text: "", submitted: false },
  ]);

  const [enableKeys, setEnableKeys] = useState(false);
  const [wordList, setWordList] = useState({});
  const [currentWord, setCurrentWord] = useState(0);
  const [word, setWord] = useState("start");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [tempDate, setTempDate] = useState(dayjs());

  const setMessageHelper = (m) => {
    setMessage(m);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const startDate = dayjs("2024-01-01");
  const dateToDayNumber = (date) => {
    return date.diff(startDate, "day") + 1;
  };

  const dayNumberToDate = (dayNumber) => {
    return startDate.add(dayNumber - 1, "day");
  };

  useEffect(() => {
    console.log("fetching JSON");
    const fetchFile = async () => {
      try {
        const response = await fetch("/wordle.json");
        const jsonFile = await response.json();
        setWordList(jsonFile); // Store it once
      } catch (error) {
        console.error("Error fetching JSON:", error);
      }
    };

    fetchFile();
  }, []); // Fetch only on mount

  // Separate effect to update word when selectedDate changes
  useEffect(() => {
    if (wordList[dateToDayNumber(selectedDate)] === undefined) return; // Avoid running before JSON loads
    // console.log(dateToDayNumber(selectedDate));
    // console.log(wordList[dateToDayNumber(selectedDate)]);
    console.log("Initializing");
    setWord(wordList[dateToDayNumber(selectedDate)]);

    // Handle Local Storage Data
    const nCurrentDay = localStorage.getItem("TYLERDLE_CURRENT_DAY");
    const nCurrentWord = Number(localStorage.getItem("TYLERDLE_CURRENT_WORD"));
    const nHistory = JSON.parse(localStorage.getItem("TYLERDLE_HISTORY"));
    const nGuesses = JSON.parse(localStorage.getItem("TYLERDLE_GUESSES"));
    // console.log(nGuesses);
    if (
      nCurrentDay &&
      dayjs(nCurrentDay).isSame(selectedDate, "day") &&
      nCurrentWord &&
      nGuesses
    ) {
      setCurrentWord(nCurrentWord);
      setGuesses(nGuesses);
    }

    if (nHistory) {
      setHistory(nHistory);
    }
  }, [wordList]);

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
        guesses[currentWord].text.split("").filter((e) => e !== "_").length ===
          5 &&
        Object.values(wordList).some(
          (value) =>
            value.toLowerCase() === guesses[currentWord].text.toLowerCase()
        )
      ) {
        const newGuesses = [...guesses];
        newGuesses[currentWord] = {
          ...newGuesses[currentWord],
          submitted: true,
        };
        if (guesses[currentWord].text === word) {
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
          // setMessageHelper(word.toUpperCase());
          setCurrentWordLocal(6);
        } else if (currentWord < 5) {
          newGuesses[currentWord + 1] = {
            ...newGuesses[currentWord + 1],
            text: "_",
          };
          setCurrentWordLocal(currentWord + 1);
        } else {
          setCurrentWordLocal(currentWord + 1);
          setMessage(word.toUpperCase());
        }
        setGuessesLocal(newGuesses);
      } else {
        setMessageHelper("Invalid Word");
      }
    } else if (letter === "delete" || letter === "backspace") {
      const newGuesses = [...guesses];

      const nWord = newGuesses[currentWord].text;
      const wordFiltered = nWord.split("").filter((e) => e !== "_");
      newGuesses[currentWord] = {
        submitted: guesses[currentWord].submitted,
        text: wordFiltered
          .slice(0, wordFiltered.length - 1)
          .concat("_")
          .slice(0, 5)
          .join(""),
      };
      setGuessesLocal(newGuesses);
    } else {
      const newGuesses = [...guesses];
      const nWord = newGuesses[currentWord].text;
      newGuesses[currentWord] = {
        submitted: guesses[currentWord].submitted,
        text: nWord
          .split("")
          .filter((e) => e !== "_")
          .concat(letter, "_")
          .slice(0, 5)
          .join(""),
      };
      setGuesses(newGuesses);
    }
  };

  const handleKeyPress = useCallback((event) => {
    if (!enableKeys) return;
  
    const key = event.key.toLowerCase();
    if ([...topRow, ...midRow, ...botRow, "backspace"].includes(key)) {
      keyBoardType(key);
    }
  }, [enableKeys, keyBoardType]); // Memoize dependencies
  
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
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

  const [checkedCollapse, setCheckedCollapse] = useState(false);

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
      if (nCurrentWord && nGuesses) {
        setCurrentWord(nCurrentWord);
        setGuesses(nGuesses);
      }
    } else {
      setCurrentWord(0);
      setGuesses([
        { text: "_", submitted: false },
        { text: "", submitted: false },
        { text: "", submitted: false },
        { text: "", submitted: false },
        { text: "", submitted: false },
        { text: "", submitted: false },
      ]);
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

  return (
    <div
      className={styles["container"]}
      onClick={() => setEnableKeys(true)}
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
                title="select date"
              >
                <Typography variant="h6" className={styles["overflow-text"]}>
                  {selectedDate.format("dddd, MMMM D, YYYY")}
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
                // wordList={wordList}
              />
            </Collapse>
          </div>
        </div>

        {guesses.map((guess, i) => (
          <WordleSquare
            key={i}
            text={guess.text}
            submitted={guess.submitted}
            enableKeys={enableKeys}
            word={word}
            guesses={guesses}
          />
        ))}
        <div className={styles["keyboard"]}>
          <div className={styles["keys"]}>
            {topRow.map((k, i) => (
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
          <div className={styles["keys"]}>
            {" "}
            {midRow.map((k, i) => (
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
          </div>{" "}
          <div className={styles["keys"]}>
            {botRow.map((k, i) => (
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
        </div>
      </div>
    </div>
  );
}

export default Tylerdle;
