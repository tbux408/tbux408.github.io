import Home from "./pages/Home";
import Header from "./components/Header";
import styles from "./App.module.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Resume from "./pages/Resume";
import About from "./pages/About";
import Footer from "./components/Footer";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Publications from "./pages/Publications";
import TimeWasters from "./pages/TimeWasters";

const theme = createTheme({
  palette: {
    primary: {
      main: "#161617cc", // main gray
      dark: "#161617", // darker main gray not clear
    },
    secondary: {
      main: "#fff", //white
      dark: "#dedede", //slightly darker
    },
    action: {
      main: "#0071e3", //blue
      light: "#0c7ff2", //slightly lighter blue
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* <div
          style={{
            bottom: 0,
            position: "fixed",
            fontSize: "min(7vw, 5rem)",
            color: "#ffffffaa",
            backgroundColor: "#F44336cc",
            zIndex: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          UNDER CONSTRUCTION
        </div> */}
        <Header />
        <div
          className={styles["white-space"]}
          style={{
            backgroundColor: theme.palette.primary.dark,
          }}
        ></div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/timewasters" element={<TimeWasters />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
