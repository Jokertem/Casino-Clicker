import styles from "./Aviator.module.css";
import { useState, useEffect, useRef } from "react";
import GoHome from "../GoHome/GoHome";
import Token from "../Token/Token";
const Aviator = (props) => {
  const [tokens, setTokens] = useState(props.tokens);
  const [rate, setRate] = useState(0);
  const [start, setStart] = useState(false);
  const [multiplier, setMultiplier] = useState(0);
  const [multiplierTwo, setMultiplierTwo] = useState(0);
  const [randomMultiplier, setRandomMultipler] = useState(0);

  const Random = () => {
    const rndMultiplier = Math.round(Math.random() * 5);
    const rndMultiplierTwo = Math.round(Math.random() * 100 + 90);
    setRandomMultipler(Number(`${rndMultiplier}.${rndMultiplierTwo}`));
    console.log(randomMultiplier);
  };

  let interval = useRef();

  useEffect(() => {
    console.log(randomMultiplier);
    const multi = Number(`${multiplier}.${multiplierTwo}`);
    console.log(multi);
    if (multi >= randomMultiplier && multiplierTwo > 0) {
      props.game({ result: "lose", tokens: rate });
      setStart(!start);
      setMultiplier(0);
      setMultiplierTwo(0);
      setTokens(tokens - rate);
    }
  });
  useEffect(() => {
    if (start) {
      interval.current = setInterval(() => {
        setMultiplierTwo((previus) => previus + 1);
      }, 60);
    } else {
      clearInterval(interval.current);
      setMultiplierTwo(0);
      setMultiplier(0);
    }
  }, [start]);
  useEffect(() => {
    if (multiplierTwo >= 100) {
      setMultiplier((previus) => previus + 1);
      setMultiplierTwo(0);
    }
  }, [multiplierTwo]);
  useEffect(() => {
    if (rate > 2000) {
      setRate(2000);
    }
    if (rate < 0) {
      setRate(0);
    }
  });

  return (
    <>
      <h2 className={styles.tittle}>Aviator</h2>
      <div className={styles.multiplier}>
        <b>{`${multiplier},${multiplierTwo}x`}</b>
      </div>
      <div className={styles.start_stop_button}>
        {!start ? (
          <button
            className={styles.start}
            onClick={() => {
              if (rate < 5) {
                props.game({
                  result: "error",
                  message: "You didn't bet anything",
                });
                return;
              } else if (rate > tokens) {
                props.game({
                  result: "error",
                  message: "You don't have enough tokens",
                });
                return;
              }
              setStart(!start);
              Random();
            }}
          >
            Start
          </button>
        ) : (
          <button
            className={styles.stop}
            onClick={() => {
              setStart(!start);
              const multi = Number(`${multiplier}.${multiplierTwo}`);

              setTokens((previus) => previus + Math.round(multi * rate));
              props.game({ result: "win", tokens: Math.round(multi * rate) });
            }}
          >
            Stop
          </button>
        )}
      </div>
      <div className={styles.panel}>
        <div className={styles.panel__tokens}>
          <b>Your Token</b>
          <Token tokens={tokens} />
        </div>
        {!start && (
          <div className={styles.panel__buttons}>
            <div className={styles.panel__buttons_add}>
              <button
                className={styles.add}
                onClick={() => {
                  setRate(rate + 5);
                }}
              >
                Add 5
              </button>
              <button
                className={styles.add}
                onClick={() => {
                  setRate(rate + 20);
                }}
              >
                Add 20
              </button>
              <button
                className={styles.add}
                onClick={() => {
                  setRate(rate + 50);
                }}
              >
                Add 50
              </button>
              <button
                className={styles.add}
                onClick={() => {
                  setRate(rate + 100);
                }}
              >
                Add 100
              </button>
            </div>
            <div className={styles.panel__buttons_remove}>
              <button
                className={styles.remove}
                onClick={() => {
                  setRate(rate - 5);
                }}
              >
                Del 5
              </button>
              <button
                className={styles.remove}
                onClick={() => {
                  setRate(rate - 20);
                }}
              >
                Del 20
              </button>
              <button
                className={styles.remove}
                onClick={() => {
                  setRate(rate - 50);
                }}
              >
                Del 50
              </button>
              <button
                className={styles.remove}
                onClick={() => {
                  setRate(rate - 100);
                }}
              >
                {" "}
                Del 100
              </button>
            </div>
          </div>
        )}

        <div className={styles.panel__rate}>
          <b>Your Rate</b>
          <Token tokens={rate} />
        </div>
      </div>
      <GoHome />
    </>
  );
};
export default Aviator;
