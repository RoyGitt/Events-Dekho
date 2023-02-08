import React from "react";
import EventDetail from "../../components/Events/EventDetail";
import { getEventData, getFeaturedEvents } from "../../helper/helper";

const eventID = (props) => {
  const event = props.eventData;

  return (
    <EventDetail
      id={event.id}
      title={event.title}
      image={"/" + event.image}
      imageALT={event.title}
      date={event.date}
      address={event.location}
      description={event.description}
    />
  );
};

export default eventID;

export async function getStaticProps(context) {
  const { params } = context;
  const eventID = params.eventID;
  const eventData = await getEventData(eventID);

  if (!eventData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      eventData,
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const featuredEventData = await getFeaturedEvents();
  const pathsWithParams = featuredEventData.map((event) => ({
    params: { eventID: event.id },
  }));

  return {
    paths: pathsWithParams,
    fallback: "blocking",
  };
}
