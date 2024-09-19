import styles from "./GameList.module.css";
import { Link } from "react-router-dom";

const GameList = (props) => {
  return (
    <>
      <Link
        style={{
          textDecoration: "none",
          color: "black",
          fontWeight: "bold",
        }}
        to={`/${props.game}`}
      >
        {props.game + " "}
      </Link>
    </>
  );
};
export default GameList;
