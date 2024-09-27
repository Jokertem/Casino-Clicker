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
import BlackJack from "./components/BlackJack/BlackJack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const games = ["Roulette", "Black_Jack", "Dice", "Poker", "One_Armed_Bandit"];

  const [name, setName] = useState("Player");
  const ChangeName = (data) => {
    let name = data;
    name = name.trim();
    if (name == "") {
      return;
    }

    setName(name);
  };
  const [clickType, setClickType] = useState(1);
  const [clicks, setClicks] = useState(0);
  const [coins, setCoins] = useState(1000);
  const [tokens, setTokens] = useState(0);
  const [clicksForCoin, setClicksForCoin] = useState(40);
  const [tokenPrice, setTokenPrice] = useState(10);
  const [items, setItems] = useState([
    {
      name: "Double Click",
      price: 120,
      bought: false,
    },
    {
      name: "Discount on tokens 3$",
      price: 140,
      bought: false,
    },
    {
      name: "Clicks to coins -6",
      price: 320,
      bought: false,
    },
    {
      name: "Clicks to coins -11",
      price: 410,
      bought: false,
    },
    {
      name: "Tripple Click ",
      price: 450,
      bought: false,
    },
  ]);
  const Click = () => {
    setClicks(clicks + clickType);
    if (clicks >= clicksForCoin) {
      setClicks(clickType);
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
    if (data.result == "win") {
      setTokens(tokens + data.tokens);
      toast.success(`You Win ${data.tokens}Tokens`);
    } else if (data.result == "lose") {
      setTokens(tokens - data.tokens);
      toast.error(`You lose ${data.tokens}Tokens `);
    } else {
      toast.error(data.message);
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
      clickType: clickType,
    };
    localStorage.setItem("player", JSON.stringify(player));
    localStorage.setItem("store", JSON.stringify(items));
  });

  const BuyItem = (data) => {
    console.log(data);
    const index = items.findIndex((item) => item.name == data);
    items[index].bought = true;
    setCoins(coins - items[index].price);
    switch (index) {
      case 0:
        setClickType(2);
        break;
      case 1:
        setTokenPrice(tokenPrice - 3);
        break;
      case 2:
        setClicksForCoin(clicksForCoin - 6);
        break;
      case 3:
        setClicksForCoin(clicksForCoin - 11);
        break;
      case 4:
        setClickType(3);
        items[0].bought = true;
        break;
      default:
        break;
    }
    toast.success(`You buy ${items[index].name} for ${items[index].price}$`);
  };
  let player = localStorage.getItem("player");
  player = JSON.parse(player);
  let store = localStorage.getItem("store");
  store = JSON.parse(store);
  useEffect(() => {
    if (player) {
      setName(player.name);
      setClicks(player.clicks);
      setCoins(player.coins);
      setTokens(player.tokens);
      setClickType(player.clickType);
      setClicksForCoin(player.clicksForCoin);
      setTokenPrice(player.price);
    }
    if (store) {
      setItems(store);
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
        <Route
          path="/Black_Jack"
          element={<BlackJack name={name} tokens={tokens} game={GameResult} />}
        />
      </Routes>
    </>
  );
}

export default App;
