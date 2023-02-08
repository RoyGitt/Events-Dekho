import React from "react";
import Link from "next/link";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import styles from "./Button.module.css";

const Button = (props) => {
  if (props.href) {
    return (
      <Link href={props.href} className={styles.btn}>
        {props.children}
        <EastOutlinedIcon
          style={{ marginLeft: "1rem", fontSize: "2rem", color: "#fff" }}
        />
      </Link>
    );
  } else {
    return (
      <button className={styles.btn} onClick={props.onClick}>
        {props.children}
      </button>
    );
  }
};

export default Button;
