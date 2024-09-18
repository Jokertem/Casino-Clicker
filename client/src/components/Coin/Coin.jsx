import style from "./Coin.module.css";

const Coin = (props) => {
  return (
    <>
      <div className={style.coin}>
        <b className={style.coin_value}>{props.coins}$</b>
      </div>
    </>
  );
};
export default Coin;
