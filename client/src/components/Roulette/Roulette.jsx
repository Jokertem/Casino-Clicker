import { useEffect, useState } from "react";
import Token from "../Token/Token";
import styles from "./Roulette.module.css";
import GoHome from "../GoHome/GoHome";

const RouletteBoard = (props) => {
  return (
    <>
      <div
        className={`${props.color} area`}
        id={`ID${props.number}`}
        onClick={() => {
          props.select(props.number);
        }}
      >
        {props.number}
      </div>
    </>
  );
};

const Roulette = (props) => {
  const [tokens, SetTokens] = useState(props.tokens);
  const [number, SetNumber] = useState(undefined);
  const [rate, SeetRate] = useState(0);
  const [drawnNumber, setDrawnNumber] = useState("");
  const [drawnColor, setDrawnColor] = useState("");

  const [board, SetBoard] = useState([]);
  const RenderBoard = () => {
    for (let index = 0; board.length < 37; index++) {
      let color;
      if (index == 0) {
        color = "lime";
      } else if (index % 2 == 0) {
        color = "black";
      } else {
        color = "red";
      }
      const element = { number: index, color: color };
      board.push(element);
    }
    const red = {
      number: "Red",
      color: "red",
    };
    const black = {
      number: "Black",
      color: "black",
    };
    if (board.length <= 37) {
      board.push(red);
      board.push(black);
    }
  };

  RenderBoard();

  const AddTokens = (amount) => {
    SeetRate(rate + amount);
  };
  const RemoveTokens = (amount) => {
    SeetRate(rate - amount);
  };
  const SelectArea = (data) => {
    const index = board.findIndex((element) => element.number == data);
    board.forEach((element, index) => {
      if (index == 0) {
        element.color = "lime";
      } else if (index % 2 == 0) {
        element.color = "black";
      } else {
        element.color = "red";
      }
    });
    board[index].color = "selected";
    SetNumber(data);
  };
  useEffect(() => {
    if (rate < 0) {
      SeetRate(0);
    }
    if (rate > 1000) {
      SeetRate(1000);
    }
  });
  return (
    <>
      <h2 className={styles.h2}>Roulette</h2>
      <div className={styles.board}>
        <div className={styles.areas}>
          {board.map((element) => (
            <RouletteBoard
              key={element.number}
              number={element.number}
              color={element.color}
              select={SelectArea}
            />
          ))}
        </div>
      </div>
      <div className={styles.panel}>
        <div className={styles.panel_tokens}>
          <b>Your Tokens</b>
          <Token tokens={tokens} />
        </div>

        <div className={styles.panel_rateControl}>
          <div className={styles.panel_rateControl_Add}>
            <button
              className={styles.add}
              onClick={() => {
                AddTokens(5);
              }}
            >
              Add 5
            </button>
            <button
              className={styles.add}
              onClick={() => {
                AddTokens(20);
              }}
            >
              Add 20
            </button>
            <button
              className={styles.add}
              onClick={() => {
                AddTokens(50);
              }}
            >
              Add 50
            </button>
            <button
              className={styles.add}
              onClick={() => {
                AddTokens(100);
              }}
            >
              Add 100
            </button>
          </div>
          <div className={styles.panel_rateControl_Remove}>
            <button
              className={styles.remove}
              onClick={() => {
                RemoveTokens(5);
              }}
            >
              Del 5
            </button>
            <button
              className={styles.remove}
              onClick={() => {
                RemoveTokens(20);
              }}
            >
              Del 20
            </button>
            <button
              className={styles.remove}
              onClick={() => {
                RemoveTokens(50);
              }}
            >
              Del 50
            </button>
            <button
              className={styles.remove}
              onClick={() => {
                RemoveTokens(100);
              }}
            >
              Del 100
            </button>
          </div>
        </div>
        <div className={styles.panel_rate}>
          <b>Your Rate</b>
          <Token tokens={rate} />
        </div>
        <button
          className={styles.spin}
          onClick={() => {
            if (number != undefined && tokens >= rate && rate >= 5) {
              const drawn = Math.round(Math.random() * 36);
              let color = undefined;
              setDrawnNumber(drawn);

              if (drawn == 0) {
                setDrawnColor("lime");
                color = "lime";
              } else if (drawn % 2 == 0) {
                setDrawnColor("black");
                color = "black";
              } else {
                setDrawnColor("red");
                color = "red";
              }
              if (number == "Red" || number == "Black") {
                const yourColor = number.toLowerCase();

                if (color == yourColor) {
                  SetTokens(Math.floor(tokens + rate * 1.2));
                  const res = tokens;
                  props.game({ result: "win", tokens: Math.floor(rate * 1.2) });
                  return;
                } else {
                  SetTokens(tokens - rate);
                  if (tokens < 0) {
                    SetTokens(0);
                  }
                  props.game({ result: "lose", tokens: rate });
                  return;
                }
              } else {
                if (drawn == number) {
                  SetTokens(tokens + rate * 3);
                  props.game({ result: "win", tokens: rate * 3 });
                  return;
                } else {
                  SetTokens(tokens - rate);
                  props.game({ result: "lose", tokens: rate });
                  return;
                }
              }
            } else if (number == undefined) {
              props.game({
                result: "error",
                message: "You have not selected any number",
              });
            } else if (rate < 5) {
              props.game({
                result: "error",
                message: "You didn't bet anything",
              });
            } else {
              props.game({
                result: "error",
                message: "You don't have enough tokens",
              });
            }
          }}
        >
          SPIN
        </button>
        <div
          className={styles.panel_drawn}
          style={{ background: `${drawnColor}` }}
        >
          {drawnNumber}
        </div>
      </div>

      <GoHome />
    </>
  );
};
export default Roulette;
