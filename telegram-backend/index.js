const TelegramBot = require("node-telegram-bot-api");

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const TOKEN = "SEU_TOKEN_AQUI";

const bot = new TelegramBot(TOKEN, {
  polling: true,
});

console.log("Bot iniciado...");

bot.on("message", async (msg) => {
  try {
    const text = msg.text || "";

    // comando inicial
    if (text === "/start") {
      await bot.sendMessage(
        msg.chat.id,
        "Olá! 👋\n\n" +
          "Para solicitar um agendamento, envie:\n\n" +
          "Nome:\n" +
          "Serviço:\n" +
          "Data:\n" +
          "Horário:\n" +
          "Mensagem:",
      );

      return;
    }

    await db.collection("requests").add({
      customer: msg.from.first_name,
      phone: String(msg.chat.id),
      service: "",
      desiredDate: "",
      desiredTime: "",
      message: text,
      type: "agendamento",
      status: "pendente",
      userId: "eY7yOUfZq9fJRlgdzRkr6RLIAG22",
      createdAt: FieldValue.serverTimestamp(),
    });

    await bot.sendMessage(
      msg.chat.id,
      "Solicitação recebida! ✅\n\nEm breve entraremos em contato.",
    );
  } catch (error) {
    console.error(error);
  }
});
