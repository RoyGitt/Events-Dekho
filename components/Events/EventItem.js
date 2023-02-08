import React from "react";
import styles from "./EventItem.module.css";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Button from "../UI/Button";

const EventItem = (props) => {
  const formattedDate = new Date(props.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const eventsDetailsPage = `/events/${props.eventID}`;

  return (
    <li className={styles["event-item"]}>
      <img src={props.image} alt={props.heading} />
      <div className={styles["event-item__details"]}>
        <h2 className={styles["event-item__heading"]}>{props.heading}</h2>
        <time className={styles["event-item__date"]}>
          <DateRangeOutlinedIcon
            style={{ fontSize: "3rem", color: "#333", marginRight: "1rem" }}
          />
          {formattedDate}
        </time>
        <address className={styles["event-item__address"]}>
          <LocationOnOutlinedIcon
            style={{ fontSize: "3rem", color: "#333", marginRight: "1rem" }}
          />{" "}
          {props.address}
        </address>
        <Button href={eventsDetailsPage}>Export Event</Button>
      </div>
    </li>
  );
};

export default EventItem;
