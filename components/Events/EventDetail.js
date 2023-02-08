import React from "react";
import styles from "./EventDetail.module.css";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Comments from "../Comments/Comments";

const EventDetail = (props) => {
  const formattedDate = new Date(props.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const eventIDhandler = () => {
    return props.id;
  };

  return (
    <>
      <div className={styles["event-detail__header"]}>
        <h1>{props.title}</h1>
      </div>
      <div>
        <div className={styles["event-detail__details"]}>
          <img
            src={props.image}
            alt={props.imageALT}
            className={styles["event-detail__image"]}
          />
          <div>
            <time className={styles["event-detail__time"]}>
              <DateRangeOutlinedIcon
                style={{
                  fontSize: "3rem",
                  color: "#0ba360",
                  marginRight: "1rem",
                }}
              />
              {formattedDate}
            </time>
            <address className={styles["event-detail__address"]}>
              <LocationOnOutlinedIcon
                style={{
                  fontSize: "3rem",
                  color: "#0ba360",
                  marginRight: "1rem",
                }}
              />
              {props.address}
            </address>
          </div>
        </div>
        <div className={styles["event-detail__description"]}>
          <span style={{ fontSize: "3rem", fontWeight: "500" }}>"</span>
          {props.description}
          <span style={{ fontSize: "3rem", fontWeight: "500" }}>"</span>
        </div>
      </div>
      <Comments onEventID={eventIDhandler} />
    </>
  );
};

export default EventDetail;
