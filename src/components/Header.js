import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import styles from "../styles/Header.module.css";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CustomTypography from "./CustomTypography";
import Logo from "./logo";
import SearchIcon from "@mui/icons-material/Search";
import Collapse from "@mui/material/Collapse";
import { useState, useEffect } from "react";
import TitleIcon from "@mui/icons-material/Title";
import HeaderMoreInfo from "./HeaderMoreDetail";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HeaderSearch from "./HeaderSearch";

const about = [
  {
    title: "About",
    content: [
      { name: "Tyler Buxton", link: "/about?id=1" },
      { name: "Locations", link: "/about?id=1" },
    ],
  },
  {
    title: "Education",
    content: [
      { name: "Graduate", link: "/about?id=2" },
      { name: "Undergraduate", link: "/about?id=2" },
    ],
  },
  {
    title: "Links",
    content: [
      { name: "LinkedIn", link: "/about?id=3" },
      { name: "GitHub", link: "/about?id=3" },
      { name: "Google Scholar", link: "/about?id=3" },
      { name: "Email", link: "/about?id=3" },
    ],
  },
  {
    title: "Skills",
    content: [
      { name: "Front-end", link: "/about?id=4" },
      { name: "Back-end", link: "/about?id=4" },
      { name: "Databases", link: "/about?id=4" },
    ],
  },
  {
    title: "Organizations",
    content: [
      { name: "Lambda Chi Alpha", link: "/about?id=5" },
      { name: "Phi Beta Kappa", link: "/about?id=5" },
    ],
  },
];

const resume = [
  {
    title: "Resume",
    content: [{ name: "Download", link: "/resume" }],
  },
];

const search = [
  {
    title: "Quick Links",
    content: [
      { name: "Home", link: "/" },
      { name: "About", link: "/about" },
      { name: "Resume", link: "/resume" },
      { name: "Projects", link: "/projects" },
      { name: "Experience", link: "/experience" },
      { name: "Publications", link: "/publications" },
      { name: "Time Wasters", link: "/timewasters" },
    ],
  },
];

const menu = [
  {
    title: "Menu",
    content: [
      { name: "Home", link: "/" },
      { name: "About", link: "/about" },
      { name: "Resume", link: "/resume" },
      { name: "Projects", link: "/projects" },
      { name: "Experience", link: "/experience" },
      { name: "Publications", link: "/publications" },
      { name: "Time Wasters", link: "/timewasters" },
    ],
  },
];

const projects = [
  {
    title: "Projects",
    content: [
      { name: "Gitit", link: "/projects?id=gitit" },
      { name: "AI Chatbot", link: "/projects?id=chatbot" },
      { name: "Hotel Scouter", link: "/projects?id=hotelscouter" },
      { name: "Questle?", link: "/projects?id=questle" },
      { name: "Ride Share", link: "/projects?id=rideshare" },
      { name: "The Book Warehouse", link: "/projects?id=bookstore" },
    ],
  },
];

const experience = [
  {
    title: "Experience",
    content: [
      { name: "New Year 2025", link: "/experience?id=2025" },
      { name: "Year of 2024", link: "/experience?id=2024" },
      { name: "Year of 2023", link: "/experience?id=2023" },
      { name: "Year of 2022", link: "/experience?id=2022" },
      { name: "Year of 2021", link: "/experience?id=2021" },
    ],
  },
];

const publications = [
  {
    title: "Publications",
    content: [{ name: "Coming Soon...", link: "/publications" }],
  },
];

const timewasters = [
  {
    title: "Time Wasters",
    content: [
      { name: "Tylerdle", link: "/timewasters?id=tylerdle" },
      { name: "Island of Fortune", link: "/timewasters?id=islandoffortune" },
    ],
  },
];

function Header() {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleClick = () => {
    navigate("/about");
  };

  const [checked, setChecked] = useState(false);
  const [content, setContent] = useState(about);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 30rem)");

    const handleScreenResize = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    handleScreenResize();

    mediaQuery.addEventListener("change", handleScreenResize);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenResize);
    };
  }, []);

  // const focusSearch = (input) => {
  //   input();
  // };
  const clickedSearch = () => {
    if (content === search) {
      setChecked(!checked);
    }
    // focusSearch();
  };

  return (
    <div className={styles["main-container"]}>
      <div onMouseLeave={() => setChecked(false)}>
        <div
          className={styles.container}
          style={{
            backgroundColor: checked
              ? theme.palette.primary.dark
              : theme.palette.primary.main,
            color: theme.palette.secondary.main,
            backdropFilter: "blur(15px)",
            transition: "background-color 0.3s ease",
          }}
        >
          <div className={styles.box}>
            <CustomTypography
              message={<Logo navigate={navigate} />}
              setChecked={setChecked}
              setContent={() => null}
              navigate={"/"}
              onClick={() => navigate("/")}
              logo={true}
            />
            {!isSmallScreen && (
              <>
                <CustomTypography
                  message={"About"}
                  setChecked={setChecked}
                  setContent={setContent}
                  navigate={"/about"}
                  onClick={() => navigate("/about")}
                  content={about}
                />
                <CustomTypography
                  message={"Resume"}
                  setChecked={setChecked}
                  setContent={setContent}
                  onClick={() => navigate("/resume")}
                  navigate={"/resume"}
                  content={resume}
                />
                <CustomTypography
                  message={"Projects"}
                  setChecked={setChecked}
                  setContent={setContent}
                  navigate={"/projects"}
                  onClick={() => navigate("/projects")}
                  content={projects}
                />
                <CustomTypography
                  message={"Experience"}
                  setChecked={setChecked}
                  setContent={setContent}
                  navigate={"/experience"}
                  onClick={() => navigate("/experience")}
                  content={experience}
                />
                <CustomTypography
                  message={"Publications"}
                  setChecked={setChecked}
                  setContent={setContent}
                  navigate={"/publications"}
                  onClick={() => navigate("/publications")}
                  content={publications}
                />
                <CustomTypography
                  message={"Time Wasters"}
                  setChecked={setChecked}
                  setContent={setContent}
                  navigate={"/timewasters"}
                  onClick={() => navigate("/timewasters")}
                  content={timewasters}
                />
              </>
            )}
            <div className={styles["menu-button"]}>
              <CustomTypography
                message={<SearchIcon sx={{ width: "20px" }} />}
                setChecked={() => null}
                setContent={setContent}
                onClick={clickedSearch}
                content={search}
              />

              {isSmallScreen && (
                <>
                  {checked ? (
                    <CustomTypography
                      message={<CloseIcon sx={{ width: "20px" }} />}
                      setChecked={() => null}
                      setContent={setContent}
                      onClick={() => setChecked(false)}
                      content={search}
                    />
                  ) : (
                    <CustomTypography
                      message={<MenuIcon sx={{ width: "20px" }} />}
                      setChecked={() => null}
                      setContent={setContent}
                      onClick={() => setChecked(true)}
                      content={search}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <Collapse in={checked}>
          <div
            className={styles["container-collapse"]}
            style={{
              backgroundColor: checked
                ? theme.palette.primary.dark
                : theme.palette.primary.main,
              color: theme.palette.secondary.main,
              backdropFilter: "blur(10px)",
              transition: "background-color .3s ease-in-out",
              height: isSmallScreen && "100vh",
            }}
          >
            <div className={styles["box-collapse"]}>
              {content[0].title === "Quick Links" ? (
                <HeaderSearch info={content} setChecked={setChecked} />
              ) : (
                <HeaderMoreInfo info={content} setChecked={setChecked} />
              )}
            </div>
          </div>
        </Collapse>
      </div>
      <div
        className={`${styles["container-blur"]} ${
          checked ? styles.expand : styles.collapse
        }`}
        style={{
          backgroundColor: checked ? "#ffffff11" : "rgba(255, 255, 255, 0)",
        }}
      ></div>
    </div>
  );
}

export default Header;
