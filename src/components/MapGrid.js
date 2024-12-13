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
}) => {
  const MapIcon = ({ islandColor, children, xstructureloc, ystructureloc }) => {
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
    active
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
          >
            {active ? (
              <div
                style={{
                  textShadow: "1px 8px 10px rgba(0, 0, 0, 0.5)",
                  zIndex: 0,
                  fontSize: 20,
                }}
              >
                🌴
              </div>
            ) : (
              <div
                style={{
                  zIndex: 0,
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
          >
            {active ? (
              <div
                style={{
                  textShadow: "1px 8px 10px rgba(0, 0, 0, 0.5)",
                  zIndex: 0,
                  fontSize: 20,
                }}
              >
                🌵
              </div>
            ) : (
              <div
                style={{
                  zIndex: 0,
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
          >
            {active ? (
              <div
                style={{
                  textShadow: "1px 8px 5px rgba(0, 0, 0, 0.5)",
                  zIndex: 0,
                  fontSize: 20,
                }}
              >
                🌲
              </div>
            ) : (
              <div
                style={{
                  textShadow: "1px 2px 5px rgba(0, 0, 0, 0.5)",
                  zIndex: 0,
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
          >
            {active ? (
              <div
                style={{
                  textShadow: "1px 8px 5px rgba(0, 0, 0, 0.5)",
                  zIndex: 0,
                  fontSize: 20,
                }}
              >
                🌳
              </div>
            ) : (
              <div
                style={{
                  textShadow: "1px 2px 5px rgba(0, 0, 0, 0.5)",
                  zIndex: 0,
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
          >
            {active ? (
              <div
                style={{
                  textShadow: "0px 0px 2px rgba(0, 0, 0, 0.9)",
                  zIndex: 0,
                  fontSize: 10,
                }}
              >
                🪨
              </div>
            ) : (
              <div
                style={{
                  zIndex: 0,
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
          >
            {active ? (
              <div
                style={{
                  textShadow: "0px 0px 2px rgba(0, 0, 0, 0.9)",
                  zIndex: 0,
                  fontSize: 7,
                }}
              >
                🪨
              </div>
            ) : (
              <div
                style={{
                  zIndex: 0,
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
          >
            {active ? (
              <div
                style={{
                  textShadow: "0px 0px 2px rgba(0, 0, 0, 0.9)",
                  zIndex: 0,
                  fontSize: 13,
                }}
              >
                🪨
              </div>
            ) : (
              <div
                style={{
                  zIndex: 0,
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
          >
            <div
              style={{
                fontSize: 30,
              }}
            >
              🏡
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
              <div key={`${rIdx}-${cIdx}`}>
                {terrain(
                  rIdx,
                  cIdx,
                  cell.color,
                  cell.structure,
                  cell.xstructureloc,
                  cell.ystructureloc,
                  cell.active
                )}
              </div>
            ) : (
              <div
                key={`${rIdx}-${cIdx}`}
                onClick={(e) => handleClick(e, cell)}
                onMouseEnter={() => setHoverMessageHelper(cell)}
                onMouseLeave={() => setHoverMessage("")}
              >
                {terrain(
                  rIdx,
                  cIdx,
                  cell.color,
                  cell.structure,
                  cell.island,
                  cell.xstructureloc,
                  cell.ystructureloc,
                  cell.active
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
