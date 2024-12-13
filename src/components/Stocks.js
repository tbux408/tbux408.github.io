import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/Stocks.module.css";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import { Button, Divider, IconButton } from "@mui/material";
import StocksDialog from "./StocksDialog";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Stocks({ crypto, money, setMoney, handleSettingValues, setCrypto }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const calculateChange = (stock) => {
    const start = stock[stock.length - 1];
    let max = stock[stock.length - 1];
    for (let i = stock.length - 1; i >= 0; i--) {
      if (Math.abs(start - max) > Math.abs(start - stock[i])) {
        return start - max;
      }
      max = stock[i];
    }
    return 0;
  };

  const formatChange = (value) => {
    if (value < 0) {
      return (
        <Typography
          variant="body1"
          color="error"
          className={styles["change-value"]}
        >
          <ArrowDropDownIcon /> {-value}
        </Typography>
      );
    } else
      return (
        <Typography
          variant="body1"
          color="success"
          className={styles["change-value"]}
        >
          <ArrowDropUpIcon /> {value}
        </Typography>
      );
  };

  return (
    crypto.title && (
      <div className={styles["preview-container"]}>
        <Divider />
        <div className={styles["title-box"]}>
          <Typography variant="h6" className={styles["todays-value"]}>
            {crypto.title}
          </Typography>
          <IconButton aria-label="delete" onClick={handleClickOpen}>
            <AutoGraphIcon />
          </IconButton>
        </div>
        <div className={styles["caption-box"]}>
          <Typography variant="overline">price</Typography>
          <Typography variant="overline">owned</Typography>
        </div>
        <div className={styles["title-box"]}>
          <Typography variant="h6" className={styles["todays-value"]}>
            🪙{crypto.stock[crypto.stock.length - 1]}
            {formatChange(calculateChange(crypto.stock))}
          </Typography>
          <Typography variant="h6" className={styles["todays-value"]}>
            🪙{crypto.owned * crypto.stock[crypto.stock.length - 1]}
            {formatChange(
              crypto.owned * crypto.stock[crypto.stock.length - 1] -
                crypto.invested
            )}
          </Typography>
        </div>
        {/* <Typography variant="h6" className={styles["todays-value"]}>
        {crypto.title} 🪙{crypto.stock}
      </Typography>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}

        <StocksDialog
          open={open}
          handleClose={handleClose}
          title={crypto.title}
          stock={crypto.stock}
          owned={crypto.owned}
          invested={crypto.invested}
          money={money}
          setMoney={setMoney}
          handleSettingValues={handleSettingValues}
          crypto={crypto}
          setCrypto={setCrypto}
        />
      </div>
    )
  );
}

export default Stocks;
