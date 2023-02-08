import React, { useContext, useEffect, useRef } from "react";
import Button from "../UI/Button";
import { useState } from "react";
import styles from "./Comments.module.css";
import { NotificationContext } from "../../store/notification-context";

const Comments = (props) => {
  const notificationCtx = useContext(NotificationContext);

  const eventID = props.onEventID();

  const emailInputRef = useRef();
  const commentInputRef = useRef();
  const nameInputRef = useRef();

  const [loadComments, setLoadComments] = useState();

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const commentsHideHandler = () => {
    setShowComments((prevState) => !prevState);

    if (showComments === false) {
      setLoadComments(true);
      fetch(`/api/comments/${eventID}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setLoadComments(false);
        });
    }
  };

  useEffect(() => {}, []);

  const submitCommentHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    const commentData = {
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    };

    notificationCtx.showNotificationHandler({
      title: "Loading...",
      status: "loading",
      message: "Please wait🙏",
    });

    fetch(`/api/comments/${eventID}`, {
      method: "POST",
      body: JSON.stringify(commentData),
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
          message: "Your comment has been added 😄",
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
    <section className={styles.comments}>
      <form
        className={styles["comments__form"]}
        onSubmit={submitCommentHandler}
      >
        <div className={styles["comments__form__controls"]}>
          <div className={styles["comments__form__control"]}>
            <label htmlFor="email">Your email</label>
            <input type="email" id="email" ref={emailInputRef} required />
          </div>
          <div className={styles["comments__form__control"]}>
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" ref={nameInputRef} required />
          </div>
        </div>
        <label htmlFor="comment">Your comment</label>
        <textarea rows={7} ref={commentInputRef} required />
        <Button>Submit comment</Button>
      </form>
      <Button onClick={commentsHideHandler}>
        {showComments ? "Hide Comments" : "Show Comments"}{" "}
      </Button>
      {loadComments && <h3 className={styles["loading-state"]}>Loading...</h3>}
      {!loadComments && comments.length > 0 && (
        <ul style={{ display: showComments ? "block" : "none" }}>
          {comments.map((comment) => {
            return (
              <li className={styles["user__comment"]} key={comment._id}>
                <div>{comment.text}</div>
                <div>By {comment.name}</div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Comments;
