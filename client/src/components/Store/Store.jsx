import styles from "./Store.module.css";
import { useState } from "react";
const Store = (props) => {
  return (
    <>
      <div className={styles.store}>
        <b className={styles.store_item}>{props.name}</b>

        {props.bought ? (
          <button className="storeBought">Bought</button>
        ) : (
          <button
            className={props.coins >= props.price ? "storeTrue" : "storefalse"}
            onClick={
              props.coins >= props.price
                ? () => {
                    props.buy(props.name);
                  }
                : null
            }
          >
            {props.price}
          </button>
        )}
      </div>
    </>
  );
};
export default Store;
