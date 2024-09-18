import styles from "./Clicker.module.css";

const Clicker = (props) => {
  return (
    <>
      <div className={styles.clicker}>
        <b className={styles.clicker_tittle}>Clicker</b>

        <b className={styles.clicker_info}> Your Clicks: {props.clicks}</b>

        <button
          className={styles.clicker_button}
          onClick={() => {
            props.Click();
          }}
        >
          Click me
        </button>
        <span>One Coin for {props.clicksForCoin} Clicks</span>
      </div>
    </>
  );
};
export default Clicker;
