import styles from "./OneArmedBandit.module.css";
import { useState, useEffect } from "react";
import GoHome from "../GoHome/GoHome";
import Token from "../Token/Token";
const One_Armed_Bandit = (props) => {
  const symbols = [
    { symbol: "", price: 0 },
    { symbol: "7", price: 20 },
    { symbol: "10", price: 50 },
    { symbol: ":)", price: 100 },
    { symbol: "!!!", price: 250 },
    { symbol: "</>", price: 500 },
  ];
  const [tokens, setTokens] = useState(props.tokens);
  const [firstBox, setFirstBox] = useState(0);
  const [secondBox, setSecondBox] = useState(0);
  const [thirdBox, setthirdBox] = useState(0);

  let Box1 = 0;
  let Box2 = 0;
  let Box3 = 0;

  const Start = () => {
    setFirstBox(0);
    setSecondBox(0);
    setthirdBox(0);
    if (tokens < 5) {
      props.game({ result: "error", message: "You don't have enough tokens" });
      return;
    } else {
      let rnd = Math.round(Math.random() * (symbols.length - 1));
      if (rnd == 0) {
        rnd += 1;
      }
      setFirstBox(rnd);
      Box1 = rnd;

      setTimeout(() => {
        let rnd = Math.round(Math.random() * (symbols.length - 1));
        if (rnd == 0) {
          rnd += 1;
        }
        setSecondBox(rnd);
        Box2 = rnd;
      }, 1200);
      setTimeout(() => {
        let rnd = Math.round(Math.random() * (symbols.length - 1));
        if (rnd == 0) {
          rnd += 1;
        }
        setthirdBox(rnd);
        Box3 = rnd;

        if (Box1 == Box2 && Box2 == Box3) {
          const index = symbols.findIndex(
            (element) => element.symbol == symbols[Box3].symbol
          );
          console.log(index);
          props.game({ result: "win", tokens: symbols[index].price });
          setTokens((previus) => previus + symbols[thirdBox].price);
        } else {
          props.game({ result: "lose", tokens: 5 });
          setTokens((previus) => previus - 5);
        }
      }, 2400);
    }
  };
  return (
    <>
      <h2 className={styles.tittle}>One Armed Bantit</h2>
      <div className={styles.machine}>
        <div className={styles.machine__box_ONE}>
          {symbols[firstBox].symbol}
        </div>
        <div className={styles.machine__box_TWO}>
          {symbols[secondBox].symbol}
        </div>
        <div className={styles.machine__box_THREE}>
          {symbols[thirdBox].symbol}
        </div>
      </div>
      <button className={styles.spin} onClick={Start}>
        SPIN 5 tokens
      </button>
      <div className={styles.tokens}>
        <b>Your Tokens</b>
        <Token tokens={tokens} />
      </div>
      <table className={styles.table}>
        <thead></thead>
        {symbols.map((element, index) => (
          <tbody key={element.symbol}>
            {index > 0 && (
              <tr>
                {element.symbol}
                <td>{element.price}</td>
              </tr>
            )}
          </tbody>
        ))}
      </table>
      <GoHome />
    </>
  );
};
export default One_Armed_Bandit;
