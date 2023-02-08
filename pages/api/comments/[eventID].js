import {
  establishConnection,
  insertDocument,
  getAllDocuments,
} from "../../../helper/db-util";

const handler = async (req, res) => {
  const eventID = req.query.eventID;
  console.log(eventID);

  let client;

  try {
    client = await establishConnection("events");
  } catch (error) {
    res.json(500).json({ message: "Unable to establish connection" });
    return;
  }

  if (req.method === "POST") {
    const email = req.body.email;
    const name = req.body.name;
    const text = req.body.text;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() == "" ||
      !text ||
      text.trim == ""
    ) {
      res.status(422).json({ message: "Invalid form input" });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventID,
    };

    try {
      insertDocument(client, "comments", newComment);
    } catch (error) {
      res.json(500).json({ message: "Unable to establish connection" });
      client.close();
      return;
    }

    res
      .status(201)
      .json({ message: "Successfully added the comment", comment: newComment });
  } else if (req.method === "GET") {
    const documents = await getAllDocuments("comments", client, {
      eventID: eventID,
    });
    console.log(documents);
    res.status(200).json({ comments: documents });
  }
};

export default handler;
