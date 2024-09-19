import styles from "./GoHome.module.css";
import { Link } from "react-router-dom";
const GoHome = () => {
  return (
    <>
      <div className={styles.link}>
        <Link style={{ color: "black", textDecoration: "none" }} to={"/"}>
          Go Home
        </Link>
      </div>
    </>
  );
};
export default GoHome;
