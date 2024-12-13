import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, CircleF } from "@react-google-maps/api";
import { StandaloneSearchBox, MarkerF } from "@react-google-maps/api";
import styles from "../styles/ProjectBox.module.css";
import { useNavigate } from "react-router-dom";
import PictureButton from "../components/PictureButton";
import ResumeButton from "../components/ResumeButton";
import ExperienceButton from "../components/ExperienceButton";
import ProjectButton from "../components/ProjectButton";
import TitleCard from "../components/TitleCard";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Card from "../components/Card";
import CardCarousel from "../components/CardCarousel";
import ContentEmailIcon1 from "@mui/icons-material/ContentCopy";
import { useTheme } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import LinkIcon from "@mui/icons-material/Link";
import WebIcon from "@mui/icons-material/Web";
import Tooltip from "@mui/material/Tooltip";
import TerminalIcon from "@mui/icons-material/Terminal";
import LayersIcon from "@mui/icons-material/Layers";
import { useLocation } from "react-router-dom";
import CardPicture from "../components/CardPicture";
import { Divider } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ConstructionIcon from "@mui/icons-material/Construction";
import CodeIcon from "@mui/icons-material/Code";

function ProjectBox({ project }) {
  const theme = useTheme();
  const location = useLocation();

  const handleLinkClick = (event, url) => {
    if (event.ctrlKey || event.metaKey) {
      window.open(url, "_blank");
    } else {
      window.open(url, "_self");
    }
  };

  return (
    <div className={styles["container"]}>
      <TitleCard
        message={project.title}
        id={project.id}
        action={project.link}
        backColor={"#f5f5f7"}
      />
      <div className={styles["box"]}>
        <CardCarousel cards={project.cards} gapS={false} />

        <div className={styles["info-box"]}>
          <div className={styles["info-container"]}>
            <div className={styles["info-item"]}>
              <Tooltip title="Type">
                <StarBorderIcon
                  sx={{
                    color: theme.palette.primary.main,
                    width: 45,
                    height: 45,
                  }}
                />
              </Tooltip>
              {project.role.map((e) => (
                <Typography
                  key={e}
                  variant="caption"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {e}
                </Typography>
              ))}
            </div>
            <div className={styles["info-item"]}>
              <Tooltip title="Collaboration">
                <GroupIcon
                  sx={{
                    color: theme.palette.primary.main,
                    width: 45,
                    height: 45,
                  }}
                />
              </Tooltip>
              {project.collab.map((e) => (
                <Typography
                  key={e}
                  variant="caption"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {e}
                </Typography>
              ))}
            </div>
            <div className={styles["info-item"]}>
              <Tooltip title="Tools">
                <ConstructionIcon
                  sx={{
                    color: theme.palette.primary.main,
                    width: 45,
                    height: 45,
                  }}
                />
              </Tooltip>
              {project.tools.map((e) => (
                <Typography
                  key={e}
                  variant="caption"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {e}
                </Typography>
              ))}
            </div>
            <div className={styles["info-item"]}>
              <Tooltip title="Languages">
                <CodeIcon
                  sx={{
                    color: theme.palette.primary.main,
                    width: 45,
                    height: 45,
                  }}
                />
              </Tooltip>
              {project.languages.map((e) => (
                <Typography
                  key={e}
                  variant="caption"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {e}
                </Typography>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectBox;
