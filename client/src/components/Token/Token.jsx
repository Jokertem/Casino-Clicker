import styles from "./Token.module.css";

const Token = (props) => {
  return (
    <>
      <div className={styles.token}>
        <b className={styles.token_value}>{props.tokens}</b>
      </div>
    </>
  );
};
export default Token;
