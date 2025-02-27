import React, { useState, useEffect } from "react";
import styles from "../styles/IslandMap.module.css";
import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import ParkIcon from "@mui/icons-material/Park";
import ForestIcon from "@mui/icons-material/Forest";
import MapGrid from "./MapGrid";
import { useTheme } from "@mui/material/styles";
import Stocks from "./Stocks";
import House from "./House";
import HelpIcon from "@mui/icons-material/Help";

const IslandMap = ({ id }) => {
  const theme = useTheme();
  // const [clicked, setClicked] = useState(0);
  const [gridSize, setGridSize] = useState(20); // Default grid size
  const [grid, setGrid] = useState([]);
  const [islands, setIslands] = useState({});
  const [numIslands, setNumIslands] = useState(0);
  const [gridInfo, setGridInfo] = useState([]);

  const [locked, setLocked] = useState(false);
  const [menu, setMenu] = useState(false);

  const [wood, setWood] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [rock, setRock] = useState(0);
  const [money, setMoney] = useState(0);
  const [shop, setShop] = useState([{}, {}, {}]);
  const [property, setProperty] = useState([]);

  const browns = ["#C19A6B", "#954535", "#7B3F00", "#6F4E37", "#814141"];
  const greens = ["#75c172", "#a2ea9e", "#C19A6B", "#4f7219"];
  const blues = ["#94d2f9", "#9bd6fb", "#98d7fe"];
  const generateBlue = () => {
    return blues[Math.floor(Math.random() * 3)];
  };

  const [showResource, setShowResource] = useState([]);

  // Generate a grid with random 0s and 1s
  const generateGrid = (size) => {
    const newGrid = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => Math.round(Math.random()))
    );
    setGrid(newGrid);
    return newGrid;
  };

  const findIsland = (islandMap, rIdx, cIdx) => {
    for (const [island, coords] of Object.entries(islandMap)) {
      if (coords.some(([x, y]) => x === rIdx && y === cIdx)) {
        return Number(island);
      }
    }
    return 0;
  };

  // Count islands using BFS
  const countIslands = (matrix) => {
    const visited = new Set();
    let islandsCount = 0;
    const islandMap = {};

    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    const bfs = (r, c) => {
      const queue = [[r, c]];
      islandMap[islandsCount] = [];

      while (queue.length) {
        const [qr, qc] = queue.pop();
        visited.add(`${qr},${qc}`);
        islandMap[islandsCount].push([qr, qc]);

        for (const [dr, dc] of directions) {
          const nr = qr + dr;
          const nc = qc + dc;

          if (
            nr >= 0 &&
            nc >= 0 &&
            nr < matrix.length &&
            nc < matrix[0].length &&
            matrix[nr][nc] >= 1 &&
            !visited.has(`${nr},${nc}`)
          ) {
            queue.push([nr, nc]);
            visited.add(`${nr},${nc}`);
          }
        }
      }
    };

    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[0].length; c++) {
        if (matrix[r][c] >= 1 && !visited.has(`${r},${c}`)) {
          islandsCount++;
          bfs(r, c);
        }
      }
    }

    setIslands(islandMap);
    // console.log(
    //   grid.map((r) =>
    //     r.map((c) => {
    //       return { value: c, type: "empty" };
    //     })
    //   )
    // );
    // console.log(islandMap);

    const islandDeduction = Object.values(islandMap).map((m) => {
      return Math.round(Math.random())
        ? -Math.floor(Math.random() * 10 + 1)
        : Math.floor(Math.random() * 10 + 1);
    });
    // console.log(islandDeduction);

    const newGridInfo = matrix.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        const island = findIsland(islandMap, rIdx, cIdx);
        const terrain =
          cell === 0 || islandMap[island].length <= 5
            ? "water"
            : greens[island % greens.length] === "#C19A6B"
            ? "sand"
            : "grass";

        const structure = generateStructure(terrain);
        return {
          value: cell,
          terrain: terrain,
          island: island,
          color:
            terrain === "water"
              ? generateBlue()
              : greens[island % greens.length],
          structure: structure,
          discount: terrain === "water" ? 0 : islandDeduction[island - 1],
          xstructureloc:
            flexDirections[Math.floor(Math.random() * flexDirections.length)],
          ystructureloc:
            flexDirections[Math.floor(Math.random() * flexDirections.length)],
          active: true,
          resources: calculateResources(structure, islandDeduction[island - 1]),
        };
      })
    );
    console.log(newGridInfo);
    handleSettingValues(setGridInfo, "gridInfo", newGridInfo);
    setNumIslands(islandsCount);
  };

  const generateStructure = (terrain) => {
    if (terrain === "water") {
      return "water";
    }
    if (terrain === "sand") {
      if (generateOdd(50)) {
        return "palm tree";
      }
      if (generateOdd(50)) {
        return "cactus";
      }
    }
    if (terrain === "grass") {
      if (generateOdd(150)) {
        return "evergreen";
      }
      if (generateOdd(150)) {
        return "tree";
      }
    }
    if (generateOdd(150)) {
      if (generateOdd(333)) {
        return "big rock";
      }
      if (generateOdd(333)) {
        return "small rock";
      }
      return "rock";
    }
    if (generateOdd(10)) {
      return "house";
    }
    if (generateOdd(1)) {
      return "parthenon";
    }
    return "none";
  };

  const generateShop = () => {
    const newShop = shop.map(() => {
      const type = generateOdd(600) ? "wood" : "rock";
      const min = Math.floor(Math.random() * (type === "rock" ? 10 : 7) + 2);
      const capacity = Math.floor(Math.random() * 5 + 2);
      const price = Math.floor(
        Math.random() * 40 + min + (type === "rock" ? 20 : 0)
      );

      return {
        type: type,
        min: min * 50,
        capacity: capacity,
        price: price,
        sold: 0,
      };
    });
    handleSettingValues(setShop, "shop", newShop);
  };

  const initializeIsland = () => {
    const wood = JSON.parse(localStorage.getItem("wood"));
    if (wood) {
      setWood(wood);
    }
    const rock = JSON.parse(localStorage.getItem("rock"));
    if (rock) {
      setRock(rock);
    }
    const money = JSON.parse(localStorage.getItem("money"));
    if (money) {
      setMoney(money);
    }
    const gridInfo = JSON.parse(localStorage.getItem("gridInfo"));
    if (gridInfo) {
      setGridInfo(gridInfo);
    } else {
      const matrix = generateGrid(gridSize);
      countIslands(matrix);
    }
    const energy = JSON.parse(localStorage.getItem("energy"));
    if (energy) {
      setEnergy(energy);
      if (energy > 0) {
        setMenu(false);
        setLocked(false);
      }
    }
    const shop = JSON.parse(localStorage.getItem("shop"));
    if (shop) {
      setShop(shop);
    } else {
      generateShop();
    }
    const crypto = JSON.parse(localStorage.getItem("crypto"));
    if (crypto) {
      setCrypto(crypto);
    } else {
      initStock();
    }
    const fortune500 = JSON.parse(localStorage.getItem("fortune500"));
    if (fortune500) {
      setFortune500(fortune500);
    } else {
      initFortuneStock();
    }
    const property = JSON.parse(localStorage.getItem("property"));
    if (property) {
      setProperty(property);
    }
  };

  const handleSettingValues = (setter, key, value) => {
    setter(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Initialize the grid and count islands when gridSize changes
  const [start, setStart] = useState(true);
  useEffect(() => {
    if (start) {
      initializeIsland();
      setStart(false);
    }
  }, []);

  const restart = () => {
    setShowResource([]);
    const matrix = generateGrid(gridSize);
    countIslands(matrix);
    generateShop();
    handleSettingValues(
      setEnergy,
      "energy",
      energy + 50 <= 100 ? energy + 50 : 100
    );
    simulateWeeksHelper();
    setHoverMessage("");
    setMenu(false);
    setLocked(false);
  };

  const generateOdd = (odd) => {
    return Math.floor(Math.random() * 1000) <= odd;
  };

  const flexDirections = ["center", "flex-start", "flex-end"];

  const [hoverMessage, setHoverMessage] = useState("");
  const houseImage = {
    1: "🏢",
    2: "🏫",
    3: "🏬",
    4: "🏠",
    5: "🏡",
  };
  const typeOfHouse = {
    1: "Studio Apartment",
    2: "Condominium",
    3: "Townhouse",
    4: "Cottage",
    5: "Farmhouse",
  };
  const setHoverMessageHelper = (cell) => {
    console.log(cell);

    setHoverMessage(
      cell.structure === "house" ? (
        <House
          money={money}
          typeOfHouse={typeOfHouse}
          cell={cell}
          houseImage={houseImage}
          handleSettingValues={handleSettingValues}
          setProperty={setProperty}
          property={property}
          setGridInfo={setGrid}
          gridInfo={gridInfo}
          setMoney={setMoney}
        />
      ) : (
        <div>
          <Typography variant="h6" gutterBottom>
            {cell.structure === "none"
              ? cell.terrain.charAt(0).toUpperCase() + cell.terrain.slice(1)
              : cell.structure.charAt(0).toUpperCase() +
                cell.structure.slice(1)}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ color: cell.discount < 0 ? "red" : "lightgreen" }}
          >
            Island Bonus:
            <b> {cell.discount}</b>%
          </Typography>
        </div>
      )
    );
  };

  const calculateResources = (structure, bonus) => {
    switch (structure) {
      case "evergreen":
      case "cactus":
      case "palm tree":
      case "tree":
        const price = Math.floor(Math.random() * 15 + 5);
        const wdPrice = Math.floor(1 + price + (price * bonus) / 10);
        return wdPrice;
      case "rock":
        const rPrice = Math.floor(Math.random() * 4 + 1);
        const rdPrice = Math.floor(1 + rPrice + (rPrice * bonus) / 10);
        return rdPrice;
      case "big rock":
        const brPrice = Math.floor(Math.random() * 7 + 1);
        const brdPrice = Math.floor(1 + brPrice + (brPrice * bonus) / 10);
        return brdPrice;
      case "small rock":
        const srPrice = Math.floor(Math.random() * 2 + 1);
        const srdPrice = Math.floor(1 + srPrice + (srPrice * bonus) / 10) + 1;
        return srdPrice;
      case "house":
        const houseRooms = Math.floor(Math.random() * 5 + 1);
        const houseEnergy = Math.floor(Math.random() * 10 + 5);
        const housePrice = (houseRooms + houseEnergy) * 15000;
        return { rooms: houseRooms, energy: houseEnergy, price: housePrice };
      default:
        return 0;
    }
  };

  const handleClick = (event, cell, row, col) => {
    // console.log(cell);
    if (!cell.active || energy < 0 || locked) {
      return;
    }

    if (cell.structure !== "house" && cell.structure !== "parthenon") {
      const newShowResource = [...showResource, `${row}, ${col}`];
      setShowResource(newShowResource);
      setTimeout(() => {
        setShowResource((prev) => prev.slice(1));
      }, 2000);
    }
    if (cell.structure === null) {
      return;
    }

    switch (cell.structure) {
      case "evergreen":
      case "cactus":
      case "palm tree":
      case "tree":
        handleSettingValues(setWood, "wood", wood + cell.resources);
        handleSettingValues(setEnergy, "energy", energy - 10);
        cell.active = false;
        handleSettingValues(setGridInfo, "gridInfo", gridInfo);
        break;
      case "rock":
        handleSettingValues(setRock, "rock", rock + cell.resources);
        handleSettingValues(setEnergy, "energy", energy - 15);
        cell.active = false;
        handleSettingValues(setGridInfo, "gridInfo", gridInfo);
        break;
      case "big rock":
        handleSettingValues(setRock, "rock", rock + cell.resources);
        handleSettingValues(setEnergy, "energy", energy - 17);
        cell.active = false;
        handleSettingValues(setGridInfo, "gridInfo", gridInfo);
        break;
      case "small rock":
        handleSettingValues(setRock, "rock", rock + cell.resources);
        handleSettingValues(setEnergy, "energy", energy - 10);
        cell.active = false;
        handleSettingValues(setGridInfo, "gridInfo", gridInfo);
        break;
      default:
        break;
    }
  };

  const shopHandler = (s, i) => {
    const sell = () => {
      if (s.type === "wood" && wood >= s.min && s.sold < s.capacity) {
        s.sold = s.sold + 1;
        handleSettingValues(setMoney, "money", money + s.price);
        handleSettingValues(setWood, "wood", wood - s.min);
      } else if (s.type === "rock" && rock >= s.min && s.sold < s.capacity) {
        s.sold = s.sold + 1;
        handleSettingValues(setMoney, "money", money + s.price);
        handleSettingValues(setRock, "rock", rock - s.min);
      }
    };

    return (
      <div className={styles["shop-container"]} key={i}>
        <Typography variant="h6" gutterBottom>
          Market {i + 1}
        </Typography>
        <Typography>
          {s.sold * s.min}/{s.capacity * s.min}
        </Typography>
        {s.type === "wood" ? "🪵" : "🪨"}
        <Typography>Bid: 💰{s.price}</Typography>
        <Button
          variant="outlined"
          onClick={sell}
          disabled={
            (s.type === "wood" ? wood < s.min : rock < s.min) ||
            s.sold * s.min >= s.capacity * s.min
          }
        >
          sell {s.type === "wood" ? "🪵" : "🪨"}
          {s.min}
        </Button>
      </div>
    );
  };

  const handleEnergyRefill = () => {
    if (energy < 100 && money >= 15) {
      handleSettingValues(setEnergy, "energy", energy < 0 ? 50 : energy + 50);
      handleSettingValues(setMoney, "money", money - 15);
    }
  };

  useEffect(() => {
    if (!start && energy <= 0) {
      setMenu(true);
      // setLocked(true);
    }
  }, [energy, start]);

  const [crypto, setCrypto] = useState([]);
  const simulateWeek = (stock) => {
    // const neg = Math.round(Math.random());
    // const variation = Math.floor(
    //   Math.random() * (stock[stock.length - 1] * 0.5 + 10)
    // );
    // const newStock = (neg ? -1 : 1) * variation + stock[stock.length - 1];
    const lastValue = stock[stock.length - 1]; // Get the current stock value
    const fluctuation = Math.floor((Math.random() - 0.5) * 20); // Random integer between -5 and +5
    const newStock = Math.max(0, lastValue + fluctuation); // Calculate new value, ensure it's non-negative

    if (newStock < 0) {
      return [...stock, -newStock];
    } else if (newStock === 0) {
      return [...stock, 1];
    }
    return [...stock, newStock];
  };

  const initStock = () => {
    const startCrypto = Math.floor(Math.random() * 10 + 45);
    let newCrypto = [startCrypto];
    for (let i = 0; i < 10; i++) {
      newCrypto = simulateWeek(newCrypto);
    }
    handleSettingValues(setCrypto, "crypto", {
      stock: newCrypto,
      owned: 0,
      invested: 0,
      title: "🫎 T-Bux Crypto",
    });
  };

  const [fortune500, setFortune500] = useState([]);
  const simulateWeekFortune = (stock) => {
    const neg = generateOdd(400);
    const variation = Math.floor(Math.random() * 2 + 1);
    const newStock = (neg ? -1 : 1) * variation + stock[stock.length - 1];
    if (newStock < 0) {
      return [...stock, -newStock];
    } else if (newStock === 0) {
      return [...stock, 1];
    }
    return [...stock, newStock];
  };

  const initFortuneStock = () => {
    let newFortune = [1];
    for (let i = 0; i < 10; i++) {
      newFortune = simulateWeekFortune(newFortune);
    }
    handleSettingValues(setFortune500, "fortune500", {
      stock: newFortune,
      owned: 0,
      invested: 0,
      title: "💎 Fortune 500",
    });
  };

  const simulateWeeksHelper = () => {
    crypto.stock = simulateWeek(crypto.stock);
    handleSettingValues(setCrypto, "crypto", crypto);

    fortune500.stock = simulateWeekFortune(fortune500.stock);
    handleSettingValues(setFortune500, "fortune500", fortune500);
  };

  return (
    <div className={styles["container"]} id={id}>
      <Tooltip
        title={
          <Typography variant="subtitle1" styles={{ wordBreak: "break-word" }}>
            Island of Fortune is a dynamic strategy game featuring virtually
            infinite map combinations, offering a unique experience every time
            you play. Your goal is to gather resources like rocks and wood, sell
            them for in-game currency, and maximize your collection before your
            energy runs out. Expand your fortune by buying and selling property
            or trading in the stock market, making strategic decisions to grow
            your wealth. With endless possibilities, Island of Fortune is a
            captivating blend of resource management, exploration, and economic
            strategy ensuring that you waste some time.
          </Typography>
        }
      >
        <Typography variant="h4">
          {"Island of Fortune "} <HelpIcon />
        </Typography>
      </Tooltip>

      <div className={styles["menu"]}>
        {/* {clicked} */}
        <Button variant="outlined" className={styles["nowrap-button"]}>
          🪵 {wood.toLocaleString()}
        </Button>
        <Button variant="outlined" className={styles["nowrap-button"]}>
          🪨 {rock.toLocaleString()}
        </Button>
        <Button variant="outlined" className={styles["nowrap-button"]}>
          💰 {money.toLocaleString()}
        </Button>
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={energy}
            color="success"
            sx={{ height: 25 }}
          />
        </Box>
      </div>
      <div className={styles["game-box"]}>
        <div className={styles["side-bar"]}>
          <div
            className={styles["side-bar-cube"]}
            style={{ width: "15rem", minHeight: "5rem" }}
          >
            {hoverMessage ? (
              hoverMessage
            ) : (
              <Typography variant="h6" gutterBottom>
                No Selection
              </Typography>
            )}
          </div>

          <div className={styles["side-bar-cube"]} style={{ width: "15rem" }}>
            <Typography variant="h6">Stocks</Typography>
            <Stocks
              crypto={crypto}
              money={money}
              setMoney={setMoney}
              handleSettingValues={handleSettingValues}
              setCrypto={setCrypto}
            />
            <Stocks
              crypto={fortune500}
              money={money}
              setMoney={setMoney}
              handleSettingValues={handleSettingValues}
              setCrypto={setFortune500}
            />
          </div>
          <div className={styles["side-bar-cube"]} style={{ width: "15rem" }}>
            <Typography variant="h6">Property</Typography>
            <Divider />
            <div className={styles["property-list"]}>
              {property.map((p, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 50,
                  }}
                >
                  {houseImage[p.rooms]}
                </div>
              ))}
            </div>
          </div>
        </div>

        {menu ? (
          <div className={styles["shop-cube"]}>
            <div className={styles["exchange-page"]}>
              <div className={styles["shops-box"]}>
                {shop.map((s, i) => shopHandler(s, i))}
              </div>
              <div className={styles["restart"]}>
                <Button variant="contained" onClick={() => setMenu(false)}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleEnergyRefill}
                  sx={{ backgroundColor: theme.palette.action.light }}
                  disabled={energy >= 100 || money < 15}
                >
                  Half🔋/💰15
                </Button>
                <Button
                  variant="contained"
                  onClick={restart}
                  // sx={{ backgroundColor: theme.palette.action.light }}
                >
                  Reset Island
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <MapGrid
            gridSize={gridSize}
            gridInfo={gridInfo}
            handleClick={handleClick}
            setHoverMessageHelper={setHoverMessageHelper}
            setHoverMessage={setHoverMessage}
            setMenu={setMenu}
            energy={energy}
            showResource={showResource}
            houseImage={houseImage}
          />
        )}
      </div>
    </div>
  );
};

export default IslandMap;
