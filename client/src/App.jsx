import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Name from "./components/Name/Name";
import Clicker from "./components/Clicker/Clicker";
import Coin from "./components/Coin/Coin";
import Token from "./components/Token/Token";
import Exchange from "./components/Exchange/Exchange";
import GameList from "./components/GamesList/GameList";
import Store from "./components/Store/Store";
import Roulette from "./components/Roulette/Roulette";
function App() {
  const games = ["Roulette", "Black_Jack", "Dice", "Poker"];

  const [name, setName] = useState("Player");
  const ChangeName = (data) => {
    let name = data;
    name = name.trim();
    if (name == "") {
      return;
    }

    setName(name);
  };
  const [clicks, setClicks] = useState(0);
  const [coins, setCoins] = useState(1000);
  const [tokens, setTokens] = useState(0);
  const [clicksForCoin, setClicksForCoin] = useState(40);
  const [tokenPrice, setTokenPrice] = useState(10);
  const [items, setItems] = useState([
    {
      name: "Double Click",
      price: 12,
      bought: false,
    },
    {
      name: "Discount on tokens 3$",
      price: 90,
      bought: false,
    },
    {
      name: "Clicks to coins -6",
      price: 90,
      bought: false,
    },
    {
      name: "Clicks to coins -11",
      price: 120,
      bought: false,
    },
    {
      name: "Tripple Click ",
      price: 33,
      bought: false,
    },
  ]);
  const Click = () => {
    setClicks(clicks + 1);
    if (clicks >= clicksForCoin) {
      setClicks(1);
      setCoins(coins + 1);
    }
  };
  const BuyTokens = (data) => {
    setCoins(coins - data.cost);
    setTokens(tokens + Number(data.tokens));
  };
  const SellTokens = (data) => {
    setCoins(coins + data.cost);
    setTokens(tokens - Number(data.tokens));
  };
  const GameResult = (data) => {
    console.log(data);
    if (data.result == "win") {
      setTokens(tokens + data.tokens);
    } else {
      setTokens(tokens - data.tokens);
    }
  };
  useEffect(() => {
    const player = {
      name: name,
      clicks: clicks,
      coins: coins,
      tokens: tokens,
      price: tokenPrice,
      clicksForCoin: clicksForCoin,
    };
    localStorage.setItem("player", JSON.stringify(player));
  });
  let player = localStorage.getItem("player");
  player = JSON.parse(player);

  const BuyItem = (data) => {
    console.log(data);
    const index = items.findIndex((item) => item.name == data);
    items[index].bought = true;
    setCoins(coins - items[index].price);
  };

  useEffect(() => {
    if (player) {
      setName(player.name);
      setClicks(player.clicks);
      setCoins(player.coins);
      setTokens(player.tokens);
    }
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <nav>
                {games.map((game) => (
                  <GameList key={game} game={game} />
                ))}
              </nav>

              <Name name={name} changeName={ChangeName} />
              <Clicker
                clicks={clicks}
                Click={Click}
                clicksForCoin={clicksForCoin}
              />
              <div className="CoinsAndTokens">
                <Coin coins={coins} />
                <div className="break"></div>
                <Token tokens={tokens} />
              </div>
              <Exchange
                coins={coins}
                tokens={tokens}
                price={tokenPrice}
                buy={BuyTokens}
                sell={SellTokens}
              />
              <b className="Store">Store</b>
              <div className="Items">
                {items.map((item) => (
                  <Store
                    key={item.name}
                    coins={coins}
                    name={item.name}
                    price={item.price}
                    bought={item.bought}
                    buy={BuyItem}
                  />
                ))}
              </div>
            </>
          }
        />
        <Route
          path="/Roulette"
          element={<Roulette tokens={tokens} game={GameResult} />}
        />
      </Routes>
    </>
  );
}

export default App;
