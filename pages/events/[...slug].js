import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Fallbacktext from "../../components/UI/Fallbacktext";
import useSWR from "swr";
import EventList from "../../components/Events/EventList";
import EventDataTime from "../../components/Events/EventDateTime";

const FilteredEventsPage = () => {
  const [eventsData, setEventsData] = useState([]);

  const router = useRouter();
  const { data } = useSWR(
    "https://nextjs-project-7a53e-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    const transformedEventData = [];
    for (const key in data) {
      transformedEventData.push({
        id: key,
        ...data[key],
      });
    }

    setEventsData(transformedEventData);
  }, []);

  const query = router.query.slug;

  if (query) {
    const year = +query[0];
    const month = +query[1];

    const filteredEvents = eventsData.filter(
      (item) =>
        new Date(item.date).getMonth() == month - 1 &&
        new Date(item.date).getFullYear() == year
    );

    if (filteredEvents.length === 0 || !filteredEvents) {
      return <Fallbacktext>No Events Found!</Fallbacktext>;
    }

    const dateFromQuery = new Date(`${year}-0${month}-15`);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const filteredMonth = months[month - 1];
    console.log(dateFromQuery);

    return (
      <>
        <EventDataTime month={filteredMonth} year={year} />
        <EventList data={filteredEvents} />;
      </>
    );
  }
};

export default FilteredEventsPage;
