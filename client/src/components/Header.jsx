import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.header_h2}>
          <div>
            <b className={styles.header_tittleOne}>Casiono </b>
            <b className={styles.header_tittleTwo}>Clicker </b>
          </div>

          <b className={styles.header_by}>by </b>

          <b className={styles.header_creator}>Jokertem</b>
        </h2>
      </header>
    </>
  );
};
export default Header;
