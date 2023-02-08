import Link from "next/link";
import React from "react";
import styles from "./Layout.module.css";
import Notification from "../Notification/Notification";

const Layout = (props) => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles["header__link--home"]}>
          NextEvents
        </Link>
        <Link href="/events" className={styles["header__link--all"]}>
          Browse all events
        </Link>
      </header>
      <Notification />
      <main className={styles.main}>{props.children}</main>
    </>
  );
};

export default Layout;
