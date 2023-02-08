import React, { useRef } from "react";
import styles from "./EventsFilter.module.css";
import Button from "../UI/Button";
import { useRouter } from "next/router";

const EventsFilter = () => {
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  const router = useRouter();

  const filterhandler = (event) => {
    event.preventDefault();

    const enteredYear = yearInputRef.current.value;
    const enteredMonth = monthInputRef.current.value;

    router.push(`/events/${enteredYear}/${enteredMonth}`);
  };

  return (
    <form className={styles.filter} onSubmit={filterhandler}>
      <div className={styles["filter__control"]}>
        <label htmlFor="year">Year</label>
        <select id="year" ref={yearInputRef}>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <div className={styles["filter__control"]}>
        <label htmlFor="month">Month</label>
        <select id="month" ref={monthInputRef}>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      <Button>Find Event</Button>
    </form>
  );
};

export default EventsFilter;
