import { useState } from "react";
import React from "react";

export const NotificationContext = React.createContext({
  notification: { title: "", message: "", status: "" },
  hideNotificationHandler: () => {},
  showNotificationHandler: () => {},
});

const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    status: "",
  });

  const showNotificationHandler = (notificationData) => {
    setNotification({
      title: notificationData.title,
      message: notificationData.message,
      status: notificationData.status,
    });
  };

  const hideNotificationHandler = () => {
    setNotification({
      title: "",
      message: "",
      status: "",
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        hideNotificationHandler,
        showNotificationHandler,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
