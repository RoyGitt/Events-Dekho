import React from "react";
import EventsFilter from "../../components/Events/EventsFilter";
import { getAllEvents } from "../../helper/helper";
import EventList from "../../components/Events/EventList";

const events = (props) => {
  return (
    <>
      <EventsFilter />
      <EventList data={props.allEventsdata} />
    </>
  );
};

export default events;

export async function getStaticProps() {
  const allEventsdata = await getAllEvents();

  return {
    props: {
      allEventsdata,
    },
  };
}
