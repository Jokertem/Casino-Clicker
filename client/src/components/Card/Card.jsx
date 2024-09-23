import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <>
      {props.value == "hide" ? (
        <img className={styles.card} src="src/assets/Card-0.png"></img>
      ) : (
        <div className={styles.card}>
          <b className={styles.card__firstNumber}>{props.value}</b>
          <img
            className={styles.card__color}
            src={`src/assets/${props.color}36px.png`}
            alt=""
          />
          <b className={styles.card__secondNumber}>{props.value}</b>
        </div>
      )}
    </>
  );
};
export default Card;
