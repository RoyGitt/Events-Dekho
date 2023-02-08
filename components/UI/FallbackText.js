import React from "react";
import styles from "./FallBackText.module.css";

const Fallbacktext = (props) => {
  return <p className={styles.text}>{props.children}</p>;
};

export default Fallbacktext;
