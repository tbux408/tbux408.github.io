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
}) {
  const theme = useTheme();

  const highlightedDates = [dayjs("2025-02-04"), dayjs("2025-02-05")];

  const [tabsValue, setTabsValue] = useState("Calendar");
  const tabsHandleChange = (event, newValue) => {
    console.log(newValue);
    setTabsValue(newValue);
  };
  // const [regex, setRegex] = useState("");
  // const handleRegex = (event) => {
  //   console.log(event);
  //   setRegex(event.target.value);
  // };

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

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {children}
      </div>
    );
  }

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
          icon={<ManageSearchIcon />}
          iconPosition="start"
          label="Dictionary"
          aria-label="Regex Search"
          value="Dictionary"
        />
      </Tabs>
      <TabPanel value={tabsValue} index={"Calendar"}>
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
      </TabPanel>
      <TabPanel value={tabsValue} index={"Dictionary"}>
        <div className={styles["search-container"]}>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Search Dictionary
            </InputLabel>
            <Input
              fullWidth
              id="regex-input"
              // value={regex}
              // onChange={handleRegex}
              // type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={"Reset Regex"}
                    title={"Reset Regex"}
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    // onMouseUp={handleMouseUpPassword}
                  >
                    <RestoreIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className={styles["list"]}>
            {Object.values(["wordLe", "wordLe", "wordLe"]).map((word, i) => (
              <div className={styles["list-item"]} key={i}>
                <Typography variant="h5">{word.toUpperCase()}</Typography>
              </div>
            ))}
          </div>
        </div>
      </TabPanel>
    </div>
  );
}

export default WordleDate;
