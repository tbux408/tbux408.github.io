import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../styles/Stocks.module.css";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StackedLineChart } from "@mui/icons-material";
import { LineChart } from "@mui/x-charts";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

function StocksDialog({
  open,
  handleClose,
  title,
  stock,
  owned,
  invested,
  money,
  setMoney,
  handleSettingValues,
  crypto,
  setCrypto,
}) {
  const theme = useTheme();
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);

  const handleBuy = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");

    setBuy(Number(numericValue));
  };

  const decrementBuy = () => {
    if (buy <= 0) {
      setBuy(0);
    } else if (buy * stock[stock.length - 1] > money) {
      setBuy(Math.floor(money / stock[stock.length - 1]));
    } else {
      setBuy(buy - 1);
    }
  };
  const incrementBuy = () => {
    if (buy >= Math.floor(money / stock[stock.length - 1])) {
      setBuy(Math.floor(money / stock[stock.length - 1]));
    } else {
      setBuy(buy + 1);
    }
  };

  const handleSell = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");

    setSell(Number(numericValue));
  };

  const decrementSell = () => {
    if (sell <= 0) {
      setSell(0);
    } else if (sell > owned) {
      setSell(owned);
    } else {
      setSell(sell - 1);
    }
  };
  const incrementSell = () => {
    if (sell >= owned) {
      setSell(owned);
    } else {
      setSell(sell + 1);
    }
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

  const handlePurchase = () => {
    if (buy * stock[stock.length - 1] <= money) {
      crypto.owned = crypto.owned + buy;
      crypto.invested = crypto.invested + buy * stock[stock.length - 1];
      handleSettingValues(
        setMoney,
        "money",
        money - buy * stock[stock.length - 1]
      );
      handleSettingValues(setCrypto, "crypto", crypto);
      setBuy(0);
    }
  };
  const handleSelling = () => {
    if (sell <= owned) {
      crypto.owned = crypto.owned - sell;
      crypto.invested = crypto.invested - sell * stock[stock.length - 1];
      handleSettingValues(
        setMoney,
        "money",
        money + sell * stock[stock.length - 1]
      );
      handleSettingValues(setCrypto, "crypto", crypto);
      setSell(0);
    }
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
        <IconButton
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className={styles["container"]}>
          <LineChart
            xAxis={[
              {
                data: stock.map((_, i) => i),
                label: "Days",
                valueFormatter: (element) => `Day ${element}`,
              },
            ]}
            yAxis={[
              {
                label: "Price 💰",
              },
            ]}
            series={[
              {
                label: "Price ",
                curve: "linear",
                data: stock,
                valueFormatter: (element) => `💰${element}`,
                color: calculateChange(stock) < 0 ? "red" : "green",
                showMark: false,
              },
            ]}
            width={500}
            height={300}
          />
          <Typography variant="h6" className={styles["todays-value"]}>
            Today's Value: 💰{stock[stock.length - 1]}{" "}
            {formatChange(calculateChange(stock))}
          </Typography>
          <Typography variant="h6" className={styles["todays-value"]}>
            Your Stock: 💰{owned * stock[stock.length - 1]}
            {formatChange(owned * stock[stock.length - 1] - invested)}
          </Typography>
          <div className={styles["buy-stock"]}>
            <Typography variant="h6">Buy Stock:</Typography>
            <div className={styles["increment"]}>
              <RemoveIcon
                className={styles["step-button"]}
                onClick={decrementBuy}
              />
              <input
                value={buy}
                onChange={(e) => handleBuy(e)}
                className={styles["number-input"]}
              />
              <AddIcon
                className={styles["step-button"]}
                onClick={incrementBuy}
              />
            </div>
            <Button
              variant="contained"
              size="small"
              className={styles["purchase-button"]}
              disabled={
                money < buy * stock[stock.length - 1] || buy === 0 || buy === ""
              }
              onClick={handlePurchase}
            >
              Buy 💰 {buy * stock[stock.length - 1]}
            </Button>
          </div>
          <div className={styles["buy-stock"]}>
            <Typography variant="h6">Sell Stock:</Typography>
            <div className={styles["increment"]}>
              <RemoveIcon
                className={styles["step-button"]}
                onClick={decrementSell}
              />
              <input
                value={sell}
                onChange={(e) => handleSell(e)}
                className={styles["number-input"]}
              />
              <AddIcon
                className={styles["step-button"]}
                onClick={incrementSell}
              />
            </div>
            <Button
              variant="contained"
              size="small"
              className={styles["purchase-button"]}
              color="success"
              disabled={owned < sell || sell === 0 || sell === ""}
              onClick={handleSelling}
            >
              Sell 💰 {sell * stock[stock.length - 1]}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StocksDialog;
