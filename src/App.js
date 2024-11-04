import Home from "./pages/Home";
import Header from "./components/Header";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Resume from "./pages/Resume";
import About from "./pages/About";

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
        <Header />
        <div className="white-space"></div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/about" element={<About />} />
        </Routes>
        {/* <CssBaseline />
        <IconButton color="primary">
          <HomeIcon />
        </IconButton>
        <Button variant="contained" color="primary" startIcon={<HomeIcon />}>
          Home
        </Button> */}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
