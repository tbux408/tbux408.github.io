import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import styles from "../styles/Footer.module.css";
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
import { Divider } from "@mui/material";

function Footer() {
  // const navigate = useNavigate();
  // const theme = useTheme();

  // useEffect(() => {

  //   };
  // }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["box"]}>
        <Typography variant="body2">
          1. Credit: (headshot, Tyler Buxton), (Virginia Tech Logo 1,
          https://www.cleanpng.com/png-virginia-tech-hokies-men-s-basketball-virginia-tec-3859300/),
          (Virginia Tech Logo 2, https://logos-world.net/virginia-tech-logo/),
          (Torgersen Bridge, https://www.vtprism.com/), (Roanoke,
          https://www.southernliving.com/roanoke-star-8364330), (Washington
          D.C., https://www.tclf.org/landscapes/washington-monument), (New York
          City,
          https://www.agoda.com/travel-guides/united-states/new-york-united-states/7-days-in-new-york-city-itinerary/),
          (Resume, Tyler Buxton), (FedEx Logo,
          https://www.fedex.com/en-us/home.html), (docker logo,
          https://www.docker.com/), (React Logo, https://react.dev/), (Google
          Gemini, https://gemini.google.com/), (CSS Logo,
          https://en.wikipedia.org/wiki/CSS), (Project Visualizations,
          https://visualizations.endeavour.cs.vt.edu), (LinkedIn,
          https://www.linkedin.com/),(GitHub, https://github.com/), (Gmail Logo,
          https://workspace.google.com/gmail/), (Google Scholar,
          https://scholar.google.com/schhp?hl=en), (TypeScript,
          https://icon-icons.com/icon/typescript-plain-logo/146316), (Python
          Logo, https://logos-world.net/python-logo/), (django,
          https://www.djangoproject.com/community/logos/), (SQL logo,
          https://vecta.io/symbols/28/microsoft-azure-color/61/sql-database-generic),
          (Docker Logo, https://worldvectorlogo.com/logo/docker), (Gemini,
          https://gemini.google.com/), (lambda chi alpha,
          https://www.lambdachi.org/), (phi beta kappa logo,
          https://www.trinity.edu/sites/phi-beta-kappa)
        </Typography>
        <Typography variant="body2">
          2. Privacy Policy: Application does not collect, store, or share any
          personal data from its users. No information is tracked or stored on
          servers or through third-party services.
        </Typography>
        <Divider />

        <div className={styles["odd-ends-align"]}>
          <Typography variant="body2">
            Author @ 2024 Tyler Buxton. tbux@vt.edu
          </Typography>
          <Typography variant="body2">United States</Typography>{" "}
        </div>
      </div>
    </div>
  );
}

export default Footer;
