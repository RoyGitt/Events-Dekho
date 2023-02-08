import { establishConnection, insertDocument } from "../../helper/db-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return null;
    }

    let client;

    try {
      client = await establishConnection("newsletter");
    } catch (error) {
      res
        .status(500)
        .json({ message: "Unable to establish connection with the database" });

      return;
    }

    try {
      await insertDocument(client, "emails", { email: userEmail });
    } catch (error) {
      res.status(500).json({ message: "Unable to enter data" });
      client.close();
      return;
    }

    res.status(201).json({ message: "Successfully subscribed" });
  }
}
