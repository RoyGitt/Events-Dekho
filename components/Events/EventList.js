import React from "react";
import EventItem from "./EventItem";
import Newsletter from "../Newsletter/Newsletter";

const EventList = (props) => {
  return (
    <>
      <Newsletter />
      <ul>
        {props.data.map((item) => {
          return (
            <EventItem
              key={item.id}
              id={item.id}
              image={`/${item.image}`}
              heading={item.title}
              date={item.date}
              address={item.location}
              eventID={item.id}
            />
          );
        })}
      </ul>
    </>
  );
};

export default EventList;
