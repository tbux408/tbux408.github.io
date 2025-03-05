import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/WordleDate.module.css";
import TitleIcon from "@mui/icons-material/Title";
import {
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import Badge from "@mui/material/Badge";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Restore } from "@mui/icons-material";
import RestoreIcon from "@mui/icons-material/Restore";

function WordleDate({
  selectedDate,
  setSelectedDateHelper,
  tempDate,
  setTempDate,
  history,
  wordList,
  setEnableKeys,
  guesses,
  wordToGuess,
  currentWord,
}) {
  const theme = useTheme();

  const highlightedDates = [dayjs("2025-02-04"), dayjs("2025-02-05")];

  const [tabsValue, setTabsValue] = useState("Calendar");
  const tabsHandleChange = (event, newValue) => {
    console.log(newValue);
    setTabsValue(newValue);
  };
  const [regex, setRegex] = useState("");
  const [regexExp, setRegexExp] = useState(null);
  const handleRegex = (event) => {
    // console.log(event);
    setRegex(event.target.value);
    if (event.target.value === "") {
      setRegexExp(null);
    } else {
      try {
        const newRegex = new RegExp(event.target.value, "i");
        setRegexExp(newRegex);
      } catch {
        console.error("Invalid regex");
      }
    }
  };

  function ServerDay(props) {
    const { day, outsideCurrentMonth, ...other } = props;
    const isSelected = day.isSame(selectedDate, "day");

    // Check if the day is highlighted
    const isHighlighted = history.some((highlightedDay) =>
      dayjs(highlightedDay.date).isSame(day, "day")
    );

    // Get type for badge
    const specificDate = history.filter((highlightedDay) =>
      dayjs(highlightedDay.date).isSame(day, "day")
    );
    let type = 0;
    if (specificDate.length > 0) {
      type = specificDate[0].type;
    }

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={isHighlighted ? (type ? "🕓" : "✅") : undefined}
        // invisible={!isHighlighted} // Hide badge for non-highlighted days
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          selected={isSelected}
          // onClick={() => setSelectedDateHelper(day)} // Use helper function
        />
      </Badge>
    );
  }

  // Probably not the best way to do this
  // eslint-disable-next-line no-extend-native
  Array.prototype.rSlice = function (size = 15) {
    if (this.length <= size) return this;

    const startIndex = Math.floor(Math.random() * (this.length - size + 1));
    return this.slice(startIndex, startIndex + size);
  };

  const handleClickResetRegex = () => {
    let correct = ["", "", "", "", ""];
    let notIn = ["", "", "", "", ""];
    let globalNotIn = "";
    let globalIn = "";
    for (let i = 0; i < currentWord; i++) {
      for (let j = 0; j < guesses[i].length; j++) {
        const guessLetter = guesses[i].split("")[j];
        const wordLetter = wordToGuess.split("")[j];
        if (guessLetter === wordLetter) {
          correct[j] = wordToGuess.split("")[j];
          globalIn = globalIn
            .split("")
            .filter((c) => c !== guessLetter)
            .join("");
        } else if (wordToGuess.split("").includes(guessLetter)) {
          if (!notIn[j].split("").includes(guessLetter)) {
            notIn[j] = notIn[j].concat(guessLetter);
          }
          if (
            !correct.includes(guessLetter) &&
            !globalIn.split("").includes(guessLetter)
          ) {
            globalIn = globalIn.concat(guessLetter);
          }
        } else if (!globalNotIn.split("").includes(guessLetter)) {
          globalNotIn = globalNotIn.concat(guessLetter);
        }
      }
    }
    let retRegex = "";
    for (let i = 0; i < globalIn.length; i++) {
      retRegex = retRegex.concat(
        "(?=.*" + globalIn.split("")[i].toUpperCase() + ")"
      );
    }
    retRegex = retRegex.concat("^");
    for (let i = 0; i < correct.length; i++) {
      if (correct[i] !== "") {
        retRegex = retRegex.concat(correct[i].toUpperCase());
      } else if (notIn[i] !== "" || globalNotIn !== "") {
        const notInString = notIn[i]
          .toUpperCase()
          .concat(globalNotIn.toUpperCase());
        retRegex = retRegex.concat(
          "[^!" +
            notInString
              .split("")
              .sort((a, b) => a.localeCompare(b))
              .join("") +
            "]"
        );
      } else {
        retRegex = retRegex.concat(".");
      }
    }
    retRegex = retRegex.concat("$");
    //combine not in and in
    console.log(retRegex);
    setRegex(retRegex);
    setRegexExp(new RegExp(retRegex, "i"));
  };

  return (
    <div className={styles["container"]}>
      {/* <button onClick={searchWord}>Here</button> */}
      <Tabs
        value={tabsValue}
        onChange={tabsHandleChange}
        aria-label="tabs"
        variant="fullWidth"
        scrollButtons
        allowScrollButtonsMobile
        sx={{ minHeight: "4rem", height: "4rem" }}
      >
        <Tab
          icon={<CalendarMonthIcon />}
          iconPosition="start"
          label="Calendar"
          aria-label="calendar"
          value="Calendar"
        />
        <Tab
          onClick={handleClickResetRegex}
          icon={<ManageSearchIcon />}
          iconPosition="start"
          label="Dictionary"
          aria-label="Regex Search"
          value="Dictionary"
        />
      </Tabs>
      {tabsValue === "Calendar" && (
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              sx={{ width: "100%" }}
              minDate={dayjs("2024-01-01")}
              maxDate={dayjs()}
              slots={{ day: ServerDay }} // Custom rendering for days
              views={["year", "month", "day"]}
              value={tempDate}
              onChange={(newDate, selectionState) => {
                if (selectionState === "finish") {
                  setSelectedDateHelper(newDate); // Ensures state updates correctly
                }
              }}
              onYearChange={(newYear) => setTempDate(newYear)}
              onMonthChange={(newMonth) => setTempDate(newMonth)}
            />
          </LocalizationProvider>
        </div>
      )}
      {tabsValue === "Dictionary" && (
        <div>
          <div className={styles["search-container"]}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Search Dictionary
              </InputLabel>
              <Input
                fullWidth
                id="regex-input"
                value={regex}
                onChange={handleRegex}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={"Reset Regex"}
                      title={"Reset Regex"}
                      onClick={handleClickResetRegex}
                    >
                      <RestoreIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Typography variant="caption">
              Results:{" "}
              {regexExp
                ? Object.values(wordList)
                    .filter((word) => regexExp.test(word))
                    .slice(0, 4999)
                    .filter((word, index, self) => self.indexOf(word) === index)
                    .slice(0, 4096)
                    .length.toLocaleString()
                : "16,384+"}
              {" words"}
            </Typography>
            <div className={styles["list"]}>
              {regexExp
                ? Object.values(wordList)
                    .filter((word) => regexExp.test(word))
                    .rSlice(20)
                    .filter((word, index, self) => self.indexOf(word) === index)
                    .rSlice(15)
                    .sort((a, b) => a.localeCompare(b))
                    .map((word, i) => (
                      <div className={styles["list-item"]} key={i}>
                        <Typography variant="h5">
                          {word.toUpperCase()}
                        </Typography>
                      </div>
                    ))
                : Object.values(wordList)
                    .rSlice(20)
                    .filter((word, index, self) => self.indexOf(word) === index)
                    .rSlice(15)
                    .sort((a, b) => a.localeCompare(b))
                    .map((word, i) => (
                      <div className={styles["list-item"]} key={i}>
                        <Typography variant="h5">
                          {word.toUpperCase()}
                        </Typography>
                      </div>
                    ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WordleDate;
