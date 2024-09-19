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
  const [clicksForCoin, setClicksForCoin] = useState(5);
  const [tokenPrice, setTokenPrice] = useState(10);
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
    };
    localStorage.setItem("player", JSON.stringify(player));
  });
  let player = localStorage.getItem("player");
  player = JSON.parse(player);

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
