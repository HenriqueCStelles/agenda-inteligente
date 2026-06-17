const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/telegram", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.sendStatus(200);
    }

    const customer = message.from.first_name;
    const phone = String(message.chat.id);
    const text = message.text || "";

    await db.collection("requests").add({
      customer,
      phone,
      service: "",
      desiredDate: "",
      desiredTime: "",
      message: text,
      type: "agendamento",
      status: "pendente",
      userId: "eY7yOUfZq9fJRlgdzRkr6RLIAG22",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
