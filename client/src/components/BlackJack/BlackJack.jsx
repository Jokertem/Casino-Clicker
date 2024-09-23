import styles from "./BlackJack.module.css";
import GoHome from "../GoHome/GoHome";
import Token from "../Token/Token";
import Card from "../Card/Card";
import { useState, useEffect } from "react";

const Board = (props) => {
  const [playerCards, setPlayerCards] = useState([]);
  const [oponentCards, setOponentCards] = useState([]);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [oponentTotal, setOponentTotal] = useState(0);
  const [start, setStart] = useState(false);

  const [drawncards, setDrawnCards] = useState([]);

  const oponentDrawCard = () => {
    const rnd = Math.round(Math.random() * props.cards.length);
    const card = props.cards[rnd];

    setOponentCards((previous) => [...previous, card]);
    setOponentTotal((previous) => previous + card.gameValue);
    drawncards.push(card._id);
    console.log(card._id);
  };
  const playerDrawCard = () => {
    const rnd = Math.round(Math.random() * props.cards.length);
    const card = props.cards[rnd];

    setPlayerTotal((previous) => previous + card.gameValue);
    setPlayerCards((previous) => [...previous, card]);

    drawncards.push(card._id);
    console.log(playerTotal);
  };

  const Double = () => {};
  const Pass = () => {};
  const StartGame = () => {
    if (props.rate < 5) {
      props.game({ result: "error", message: "You didn't bet anything" });
      return;
    } else if (props.tokens < props.rate) {
      props.game({ result: "error", message: "You don't have enough tokens" });
      return;
    }

    oponentDrawCard();
    const hideCard = {
      value: "hide",
      color: "",
      _id: crypto.randomUUID(),
    };
    setOponentCards((previous) => [...previous, hideCard]);
    playerDrawCard();

    playerDrawCard();
    setStart(!start);
    props.start();
  };
  useEffect((total) => {});

  return (
    <div className={styles.board}>
      <h2>Black Jack</h2>
      <b>Oponent</b>
      {start && <b>Total{oponentTotal}</b>}
      <div className={styles.board__oponentCards}>
        {oponentCards.map((card) => (
          <Card key={card._id} value={card.value} color={card.color} />
        ))}
      </div>

      <b>{props.name}</b>
      {start && <b>Total{playerTotal}</b>}
      <div className={styles.board__playerCards}>
        {playerCards.map((card) => (
          <Card key={card._id} value={card.value} color={card.color} />
        ))}
      </div>
      <div className={styles.board__playerButtons}>
        {start ? (
          <>
            <button
              className={styles.board__2x}
              onClick={() => {
                Double();
              }}
            >
              2x
            </button>{" "}
            <>
              <button
                className={styles.board__draw}
                onClick={() => {
                  playerDrawCard();
                }}
              >
                +
              </button>{" "}
              <>
                <button
                  className={styles.board__pass}
                  onClick={() => {
                    Pass();
                  }}
                >
                  -
                </button>
              </>
            </>
          </>
        ) : (
          <button className={styles.board__start} onClick={StartGame}>
            Start
          </button>
        )}
      </div>
    </div>
  );
};

const BlackJack = (props) => {
  const [start, setStart] = useState(false);
  const [tokens, setTokens] = useState(5);
  const [rate, setRate] = useState(0);
  const [cards, setCards] = useState([]);
  const renderCards = () => {
    let value;
    let gameValue;
    for (let index = 1; index < 14; index++) {
      if (index == 1) {
        value = "A";
      } else if (index == 11) {
        value = "J";
        gameValue = 10;
      } else if (index == 12) {
        value = "D";
        gameValue = 10;
      } else if (index == 13) {
        value = "K";
        gameValue = 10;
      } else {
        value = index;
        gameValue = index;
      }
      const card = {
        value: value,
        color: "Spades",
        gameValue: gameValue,
        _id: crypto.randomUUID(),
      };
      cards.push(card);
    }
    for (let index = 1; index < 14; index++) {
      if (index == 1) {
        value = "A";
      } else if (index == 11) {
        value = "J";
        gameValue = 10;
      } else if (index == 12) {
        value = "D";
        gameValue = 10;
      } else if (index == 13) {
        value = "K";
        gameValue = 10;
      } else {
        value = index;
        gameValue = index;
      }
      const card = {
        value: value,
        color: "Hearts",
        gameValue: gameValue,
        _id: crypto.randomUUID(),
      };
      cards.push(card);
    }
    for (let index = 1; index < 14; index++) {
      if (index == 1) {
        value = "A";
      } else if (index == 11) {
        value = "J";
        gameValue = 10;
      } else if (index == 12) {
        value = "D";
        gameValue = 10;
      } else if (index == 13) {
        value = "K";
        gameValue = 10;
      } else {
        value = index;
        gameValue = index;
      }
      const card = {
        value: value,
        color: "Diamond",
        gameValue: gameValue,
        _id: crypto.randomUUID(),
      };
      cards.push(card);
    }
    for (let index = 1; index < 14; index++) {
      if (index == 1) {
        value = "A";
      } else if (index == 11) {
        value = "J";
        gameValue = 10;
      } else if (index == 12) {
        value = "D";
        gameValue = 10;
      } else if (index == 13) {
        value = "K";
        gameValue = 10;
      } else {
        value = index;
        gameValue = index;
      }
      const card = {
        value: value,
        color: "Clubs",
        gameValue: gameValue,
        _id: crypto.randomUUID(),
      };
      cards.push(card);
    }
  };
  const HideShowButtons = () => {
    setStart(!start);
  };

  useEffect(() => {
    renderCards();
  }, [cards]);
  useEffect(() => {
    if (rate > 1000) {
      setRate(1000);
    }
    if (rate < 0) {
      setRate(0);
    }
  });
  return (
    <>
      <Board
        name={props.name}
        cards={cards}
        tokens={tokens}
        rate={rate}
        game={props.game}
        start={HideShowButtons}
      />
      <div className={styles.panel}>
        <div className={styles.panel__tokens}>
          <b>Your Tokens</b>
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
export default BlackJack;
