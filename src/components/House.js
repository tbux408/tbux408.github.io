import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/IslandMap.module.css";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import { Button, Divider, IconButton } from "@mui/material";
import StocksDialog from "./StocksDialog";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function House({
  money,
  typeOfHouse,
  cell,
  houseImage,
  handleSettingValues,
  setProperty,
  property,
  setGridInfo,
  gridInfo,
  setMoney,
}) {
  const theme = useTheme();
  const [clicked, setClicked] = useState(false);

  const buyHouse = () => {
    const housePrice =
      cell.resources.price -
      Math.floor(cell.resources.price * (cell.discount / 100));

    if (money >= housePrice && !cell.resources.owned) {
      cell.resources.owned = true;
      handleSettingValues(setProperty, "property", [
        ...property,
        cell.resources,
      ]);
      setClicked(true);
      handleSettingValues(setGridInfo, "gridInfo", gridInfo);
      handleSettingValues(setMoney, "money", money - housePrice);
    }
  };

  return (
    <div className={styles["house-box"]}>
      <Typography variant="h6" gutterBottom>
        <b>{typeOfHouse[cell.resources.rooms]}</b>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {cell.resources.rooms} rooms, 🔋+{cell.resources.energy}/day{" "}
      </Typography>
      <div
        style={{
          fontSize: 50,
        }}
      >
        {houseImage[cell.resources.rooms]}
      </div>
      <Typography variant="h6">
        Price: 💰
        <b>
          {(
            cell.resources.price -
            Math.floor(cell.resources.price * (cell.discount / 100))
          ).toLocaleString()}
        </b>
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        style={{ color: cell.discount < 0 ? "red" : "lightgreen" }}
      >
        Island Bonus:
        <b> {cell.discount}</b>%
      </Typography>
      <Button
        variant="outlined"
        onClick={buyHouse}
        disabled={
          cell.resources.owned ||
          clicked ||
          money <
            cell.resources.price -
              Math.floor(cell.resources.price * (cell.discount / 100))
        }
      >
        buy
      </Button>
    </div>
  );
}

export default House;
