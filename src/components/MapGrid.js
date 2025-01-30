import React, { useState, useEffect } from "react";
import styles from "../styles/IslandMap.module.css";
import {
  Box,
  Button,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import ParkIcon from "@mui/icons-material/Park";
import ForestIcon from "@mui/icons-material/Forest";
import HomeIcon from "@mui/icons-material/Home";

const MapGrid = ({
  gridSize,
  gridInfo,
  handleClick,
  setHoverMessageHelper,
  setHoverMessage,
  setMenu,
  energy,
  showResource,
  houseImage,
}) => {
  const woodRockMap = (structure) => {
    switch (structure) {
      case "evergreen":
      case "cactus":
      case "palm tree":
      case "tree":
        return "🪵";
      case "rock":
      case "big rock":
      case "small rock":
        return "🪨";
      default:
        return "";
    }
  };

  const MapIcon = ({
    islandColor,
    children,
    xstructureloc,
    ystructureloc,
    cell,
    rIdx,
    cIdx,
  }) => {
    return (
      <div
        style={{
          color: "#5C4033",
          backgroundColor: islandColor,
          justifyContent: xstructureloc,
          alignItems: ystructureloc,
        }}
        className={styles["cell"]}
      >
        {showResource.includes(`${rIdx}, ${cIdx}`) && (
          <div
            className={styles["plus-container"]}
            style={
              rIdx === 0
                ? { bottom: "-1rem", left: cIdx === 19 ? "-3rem" : 0 }
                : { top: "-1rem", left: cIdx === 19 ? "-3rem" : 0 }
            }
          >
            +{cell.resources}
            {woodRockMap(cell.structure)}
          </div>
        )}
        {children}
      </div>
    );
  };

  const terrain = (
    rIdx,
    cIdx,
    islandColor,
    structure,
    island,
    xstructureloc,
    ystructureloc,
    active,
    cell
  ) => {
    // Water

    // if (!active) {
    //   return (
    //     <div
    //       key={`${rIdx}-${cIdx}`}
    //       style={{
    //         backgroundColor: islandColor,
    //       }}
    //       className={styles["cell"]}
    //     ></div>
    //   );
    // }

    switch (structure) {
      case "water":
        return (
          <div
            key={`${rIdx}-${cIdx}`}
            style={{
              backgroundColor: islandColor,
            }}
            className={styles["cell"]}
          ></div>
        );

      case "palm tree":
        return (
          <MapIcon
            key={`${rIdx}-${cIdx}`}
            islandColor={islandColor}
            xstructureloc={xstructureloc}
            ystructureloc={ystructureloc}
            cell={cell}
            rIdx={rIdx}
            cIdx={cIdx}
          >
            {active ? (
              <div
                style={{
                  textShadow: "1px 8px 10px rgba(0, 0, 0, 0.5)",
                  zIndex: 1,
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                🌴
              </div>
            ) : (
              <div
                style={{
                  zIndex: 1,
                  fontSize: 8,
                  padding: 6,
                }}
              >
                🌱
              </div>
            )}
          </MapIcon>
        );

      case "cactus":
        return (
          <MapIcon
            key={`${rIdx}-${cIdx}`}
            islandColor={islandColor}
            xstructureloc={xstructureloc}
            ystructureloc={ystructureloc}
            cell={cell}
            rIdx={rIdx}
            cIdx={cIdx}
          >
            {active ? (
              <div
                style={{
                  textShadow: "1px 8px 10px rgba(0, 0, 0, 0.5)",
                  zIndex: 1,
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                🌵
              </div>
            ) : (
              <div
                style={{
                  zIndex: 1,
                  fontSize: 8,
                  padding: 6,
                }}
              >
                🌱
              </div>
            )}
          </MapIcon>
        );

      // Grass
      case "evergreen":
        return (
          <MapIcon
            key={`${rIdx}-${cIdx}`}
            islandColor={islandColor}
            xstructureloc={xstructureloc}
            ystructureloc={ystructureloc}
            cell={cell}
            rIdx={rIdx}
            cIdx={cIdx}
          >
            {active ? (
              <div
                style={{
                  textShadow: "1px 8px 5px rgba(0, 0, 0, 0.5)",
                  zIndex: 1,
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                🌲
              </div>
            ) : (
              <div
                style={{
                  textShadow: "1px 2px 5px rgba(0, 0, 0, 0.5)",
                  zIndex: 1,
                  fontSize: 10,
                  padding: 5,
                  paddingBottom: 2,
                  paddingTop: 10,
                }}
              >
                🪵
              </div>
            )}
          </MapIcon>
        );
      case "tree":
        return (
          <MapIcon
            key={`${rIdx}-${cIdx}`}
            islandColor={islandColor}
            xstructureloc={xstructureloc}
            ystructureloc={ystructureloc}
            cell={cell}
            rIdx={rIdx}
            cIdx={cIdx}
          >
            {active ? (
              <div
                style={{
                  textShadow: "1px 8px 5px rgba(0, 0, 0, 0.5)",
                  zIndex: 1,
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                🌳
              </div>
            ) : (
              <div
                style={{
                  textShadow: "1px 2px 5px rgba(0, 0, 0, 0.5)",
                  zIndex: 1,
                  fontSize: 10,
                  padding: 5,
                  paddingBottom: 2,
                  paddingTop: 10,
                }}
              >
                🪵
              </div>
            )}
          </MapIcon>
        );
      case "rock":
        return (
          <MapIcon
            key={`${rIdx}-${cIdx}`}
            islandColor={islandColor}
            xstructureloc={xstructureloc}
            ystructureloc={ystructureloc}
            cell={cell}
            rIdx={rIdx}
            cIdx={cIdx}
          >
            {active ? (
              <div
                style={{
                  textShadow: "0px 0px 2px rgba(0, 0, 0, 0.9)",
                  zIndex: 1,
                  fontSize: 10,
                  cursor: "pointer",
                }}
              >
                🪨
              </div>
            ) : (
              <div
                style={{
                  zIndex: 1,
                  fontSize: 8,
                  padding: 2,
                }}
              >
                🍂
              </div>
            )}
          </MapIcon>
        );
      case "small rock":
        return (
          <MapIcon
            key={`${rIdx}-${cIdx}`}
            islandColor={islandColor}
            xstructureloc={xstructureloc}
            ystructureloc={ystructureloc}
            cell={cell}
            rIdx={rIdx}
            cIdx={cIdx}
          >
            {active ? (
              <div
                style={{
                  textShadow: "0px 0px 2px rgba(0, 0, 0, 0.9)",
                  zIndex: 1,
                  fontSize: 7,
                  cursor: "pointer",
                }}
              >
                🪨
              </div>
            ) : (
              <div
                style={{
                  zIndex: 1,
                  fontSize: 8,
                  padding: 2,
                }}
              >
                🍂
              </div>
            )}
          </MapIcon>
        );
      case "big rock":
        return (
          <MapIcon
            key={`${rIdx}-${cIdx}`}
            islandColor={islandColor}
            xstructureloc={xstructureloc}
            ystructureloc={ystructureloc}
            cell={cell}
            rIdx={rIdx}
            cIdx={cIdx}
          >
            {active ? (
              <div
                style={{
                  textShadow: "0px 0px 2px rgba(0, 0, 0, 0.9)",
                  zIndex: 1,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                🪨
              </div>
            ) : (
              <div
                style={{
                  zIndex: 1,
                  fontSize: 8,
                  padding: 2,
                }}
              >
                🍂
              </div>
            )}
          </MapIcon>
        );
      case "house":
        return (
          <MapIcon
            key={`${rIdx}-${cIdx}`}
            islandColor={islandColor}
            xstructureloc={xstructureloc}
            ystructureloc={ystructureloc}
            cell={cell}
            rIdx={rIdx}
            cIdx={cIdx}
          >
            <div
              style={{
                fontSize: 25,
                cursor: "pointer",
              }}
            >
              {houseImage[cell.resources.rooms]}
            </div>
          </MapIcon>
        );

      case "parthenon":
        return (
          <MapIcon
            key={`${rIdx}-${cIdx}`}
            islandColor={islandColor}
            xstructureloc={xstructureloc}
            ystructureloc={ystructureloc}
            cell={cell}
            rIdx={rIdx}
            cIdx={cIdx}
          >
            <div
              style={{
                fontSize: 30,
              }}
            >
              🏛️
            </div>
          </MapIcon>
        );
      default:
        return (
          <div
            key={`${rIdx}-${cIdx}`}
            style={{
              backgroundColor: islandColor,
            }}
            className={styles["cell"]}
          ></div>
        );
    }
  };

  const handleClickHelper = (event, cell, rIdx, cIdx) => {
    if (cell.structure === "none") {
      setHoverMessageHelper(cell);
    } else {
      setHoverMessageHelper(cell);
      handleClick(event, cell, rIdx, cIdx);
    }
  };

  return (
    <div className={styles["cube"]}>
      {energy <= 0 && (
        <div className={styles["menu-button"]}>
          <Button
            className={styles["menu-button-test"]}
            startIcon={<HomeIcon />}
            size="large"
            onClick={() => setMenu(true)}
            variant="contained"
          >
            menu
          </Button>
        </div>
      )}
      <div
        style={{
          display: "grid",

          gridTemplateColumns: `repeat(${gridSize}, 40px)`,
        }}
      >
        {gridInfo.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            return cell.terrain === "water" ? (
              <div key={`${rIdx}-${cIdx}`} onClick={() => setHoverMessage("")}>
                {terrain(
                  rIdx,
                  cIdx,
                  cell.color,
                  cell.structure,
                  cell.xstructureloc,
                  cell.ystructureloc,
                  cell.active,
                  cell
                )}
              </div>
            ) : (
              <div
                key={`${rIdx}-${cIdx}`}
                // onMouseEnter={() => setHoverMessageHelper(cell)}
                // onMouseLeave={() => setHoverMessage("")}
                onClick={(e) => handleClickHelper(e, cell, rIdx, cIdx)}
                // onMouseEnter={(event) => handleEvent(event, cell)}
                // onMouseLeave={(event) => handleEvent(event, cell)}
                // onClick={(event) => handleEvent(event, cell)}
              >
                {terrain(
                  rIdx,
                  cIdx,
                  cell.color,
                  cell.structure,
                  cell.island,
                  cell.xstructureloc,
                  cell.ystructureloc,
                  cell.active,
                  cell
                )}
              </div>
              //   </Tooltip>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MapGrid;
