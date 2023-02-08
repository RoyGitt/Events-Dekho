import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import NotificationContextProvider from "../store/notification-context";
import Notification from "../components/Notification/Notification";

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
