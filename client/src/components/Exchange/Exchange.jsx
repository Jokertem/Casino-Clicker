import { useState, useEffect } from "react";
import styles from "./Exchange.module.css";
const Exchange = (props) => {
  const [token, setToken] = useState(5);
  const [cost, SetCost] = useState(5 * props.price);

  useEffect(() => {
    SetCost(token * props.price);
  });
  return (
    <>
      <div className={styles.exchange}>
        <b>Buy Tokens</b>
        <b>{token} Tokens</b>
        <input
          className={styles.exchange_input}
          id="exchange"
          type="range"
          min={5}
          max={100}
          step={5}
          defaultValue={5}
          onChange={(e) => {
            setToken(e.target.value);
          }}
        />
        <label className={styles.exchange_label} htmlFor="">
          {props.price}$ for 5 tokens
        </label>
        {cost <= props.coins ? (
          <button
            className={styles.exchange_buttonTrue}
            onClick={() => {
              cost <= props.coins && props.buy({ cost: cost, tokens: token });
            }}
          >
            {" "}
            Buy {cost}
          </button>
        ) : (
          <button className={styles.exchange_buttonFalse}>Buy {cost}</button>
        )}
        {token <= props.tokens ? (
          <button
            id="sell"
            className={styles.exchange_buttonTrue}
            onClick={() => {
              token <= props.tokens &&
                props.sell({ cost: cost, tokens: token });
            }}
          >
            Sell {cost}
          </button>
        ) : (
          <button id="sell" className={styles.exchange_buttonFalse}>
            Sell {cost}
          </button>
        )}
      </div>
    </>
  );
};
export default Exchange;
