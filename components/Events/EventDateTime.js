import React from "react";
import styles from "./EventDateTime.module.css";
import Button from "../UI/Button";

const EventDataTime = (props) => {
  return (
    <div className={styles.container}>
      <h1>
        Events for {props.month} {props.year}
      </h1>
      <Button href="/events">Show all Events</Button>
    </div>
  );
};

export default EventDataTime;
