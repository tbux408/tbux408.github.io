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

const resume = [{ title: "Resume", content: [{ name: "Resume", link: "/" }] }];
function Header() {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleClick = () => {
    navigate("/about");
  };

  const [checked, setChecked] = useState(false);
  const [content, setContent] = useState("");

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 25rem)");

    const handleScreenResize = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    handleScreenResize();

    mediaQuery.addEventListener("change", handleScreenResize);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenResize);
    };
  }, []);

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
              setChecked={() => null}
              setContent={() => null}
            />
            {!isSmallScreen && (
              <>
                <CustomTypography
                  message={"About"}
                  setChecked={setChecked}
                  setContent={setContent}
                />
                <CustomTypography
                  message={"Resume"}
                  setChecked={setChecked}
                  setContent={setContent}
                />
                <CustomTypography
                  message={"Projects"}
                  setChecked={setChecked}
                  setContent={setContent}
                />
                <CustomTypography
                  message={"Experience"}
                  setChecked={setChecked}
                  setContent={setContent}
                />
                <CustomTypography
                  message={"Publications"}
                  setChecked={setChecked}
                  setContent={setContent}
                />
                <CustomTypography
                  message={"Time Wasters"}
                  setChecked={setChecked}
                  setContent={setContent}
                />
              </>
            )}
            <div className={styles["menu-button"]}>
              <CustomTypography
                message={<SearchIcon sx={{ width: "16px" }} />}
                setChecked={setChecked}
                setContent={setContent}
              />

              {isSmallScreen && (
                <>
                  {checked ? (
                    <CustomTypography
                      message={<CloseIcon sx={{ width: "16px" }} />}
                      setChecked={setChecked}
                      setContent={setContent}
                    />
                  ) : (
                    <CustomTypography
                      message={<MenuIcon sx={{ width: "16px" }} />}
                      setChecked={setChecked}
                      setContent={setContent}
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
              <HeaderMoreInfo info={resume} />
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
