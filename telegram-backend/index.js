const { Telegraf } = require("telegraf");

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

const serviceAccount = require("./serviceAccountKey.json");

const conversations = {};

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const TOKEN = "8987223549:AAF3gOQMnAlAKYnWCDcgnzgY5HcCzAQhCSI";

const bot = new Telegraf(TOKEN);

console.log("Bot iniciado...");

// Comando /start

bot.start(async (ctx) => {
  conversations[ctx.chat.id] = {
    step: "name",
  };

  await ctx.reply("Olá! 👋\n\nQual é o seu nome?");
});

// Qualquer mensagem de texto
bot.on("text", async (ctx) => {
  const chatId = ctx.chat.id;
  const text = ctx.message.text;

  if (text === "/start") return;

  const conversation = conversations[chatId];

  if (!conversation) {
    return ctx.reply("Digite /start para iniciar uma solicitação.");
  }

  switch (conversation.step) {
    case "name":
      conversation.customer = text;
      conversation.step = "service";

      await ctx.reply("Qual serviço você deseja?");
      break;

    case "service":
      conversation.service = text;
      conversation.step = "date";

      await ctx.reply("Qual a data desejada?\nExemplo: 20/03/2026");
      break;

    case "date":
      conversation.desiredDate = text;
      conversation.step = "time";

      await ctx.reply("Qual o horário desejado?\nExemplo: 14:00");
      break;

    case "time":
      conversation.desiredTime = text;
      conversation.step = "message";

      await ctx.reply("Alguma observação?");
      break;

    case "message":
      conversation.message = text;

      await db.collection("requests").add({
        customer: conversation.customer,
        phone: String(chatId),
        service: conversation.service,
        desiredDate: conversation.desiredDate,
        desiredTime: conversation.desiredTime,
        message: conversation.message,
        type: "agendamento",
        status: "pendente",
        userId: "eY7yOUfZq9fJRlgdzRkr6RLIAG22",
        createdAt: FieldValue.serverTimestamp(),
      });

      delete conversations[chatId];

      await ctx.reply(
        "Solicitação enviada com sucesso! ✅\n\nEm breve entraremos em contato.",
      );

      break;
  }
});

// Inicia o polling
bot.launch();

// Encerra corretamente
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
