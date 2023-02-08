import React, { useContext, useEffect } from "react";
import styles from "./Notification.module.css";
import { useState } from "react";
import { NotificationContext } from "../../store/notification-context";

const Notification = () => {
  const [backgroundColor, setbackgroundColor] = useState("transparent");

  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (notificationCtx.notification.status === "loading") {
      setbackgroundColor("#3498db");
    } else if (notificationCtx.notification.status === "error") {
      setbackgroundColor("#e74c3c");
    } else if (notificationCtx.notification.status === "success") {
      setbackgroundColor("#2ecc71");
    }

    if (
      notificationCtx.notification &&
      (notificationCtx.notification.status === "error" ||
        notificationCtx.notification.status === "success")
    ) {
      const timer = setTimeout(() => {
        notificationCtx.hideNotificationHandler();
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [notificationCtx.notification]);

  return (
    <div
      onClick={notificationCtx.hideNotificationHandler}
      className={styles.notification}
      style={{
        backgroundColor: backgroundColor,
        display: notificationCtx.notification.status ? "flex" : "none",
      }}
    >
      <h3>{notificationCtx.notification.title}</h3>
      <p>{notificationCtx.notification.message}</p>
    </div>
  );
};

export default Notification;
