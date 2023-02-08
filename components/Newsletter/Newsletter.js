import React, { useContext, useRef } from "react";
import Button from "../UI/Button";
import styles from "./Newsletter.module.css";
import { NotificationContext } from "../../store/notification-context";

const Newsletter = () => {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  console.log(notificationCtx.notification);

  const submitEmailHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const reqBody = { email: enteredEmail };

    notificationCtx.showNotificationHandler({
      title: "Loading...",
      status: "loading",
      message: "Please wait.",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          response.json().then((data) => {
            throw new Error(data.message);
          });
        }
      })
      .then((data) =>
        notificationCtx.showNotificationHandler({
          title: "Success!",
          status: "success",
          message: "You will now revieve newsletters!",
        })
      )
      .catch((error) =>
        notificationCtx.showNotificationHandler({
          title: "Error",
          status: "error",
          message: error.message || "Something went wrong!",
        })
      );
  };

  return (
    <div className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form
        className={styles["newsletter__form"]}
        onSubmit={submitEmailHandler}
      >
        <input type="email" placeholder="Your email" ref={emailInputRef} />
        <Button>Register</Button>
      </form>
    </div>
  );
};

export default Newsletter;
