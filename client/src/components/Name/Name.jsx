import styles from "./Name.module.css";
import { useState } from "react";

const Name = (props) => {
  const [changeName, setChangeName] = useState(false);
  let name;
  return (
    <>
      {changeName ? (
        <form className={styles.name_form} action="" autoComplete="off">
          <input
            className={styles.name_input}
            type="text"
            defaultValue={props.name}
            onChange={(e) => {
              name = e.target.value;
            }}
          />
          <button
            className={styles.submit}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              props.changeName(name);
              setChangeName(!changeName);
            }}
          >
            Save
          </button>
        </form>
      ) : (
        <div className={styles.name_info}>
          <b>{props.name}</b>
          <img
            className={styles.name_icon}
            src="src/assets/edit.png"
            alt="Edit Icon"
            onClick={() => {
              setChangeName(!changeName);
            }}
          />
        </div>
      )}
    </>
  );
};
export default Name;
