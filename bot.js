const TelegramBot = require("node-telegram-bot-api");
const requestPromise = require("request-promise");
require("dotenv").config();

const Posts = [];
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const EthioMart = "@ethiooomart";
const HabeshaMart = "@ethioomart2";
const EthioMatokalaShop = "@ethiomart1";
const EthioHabeshaMarket = "@martethioo";
const channelId = -1001370909115;

let isConnectionAvailable = true; // Flag to track connection availability

console.log("I am running the bot");

bot.on("message", (msg) => {
  if (msg.chat.id === 1197204203) {
    console.log("Message is received from", msg.chat.id);
    Posts.push(msg);
    console.log("This is the size of messages stored", Posts.length);
  } else if (
    msg.chat.id !== -1001336218818 &&
    msg.chat.id !== -1001458890556 &&
    msg.chat.id !== -1001171910809 &&
    msg.chat.id !== -1001373794511
  ) {
    console.log("This is the message from", msg.chat.id);
    bot.sendMessage(
      msg.chat.id,
      "This is a bot. Please Contact @Hearttsing or Call 0991374186"
    );
  } else {
    const hello = "hello";
  }
});

const sendMessageWithRetry = async (bot, chatId, photoId, options) => {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await bot.sendPhoto(chatId, photoId, options);
      break; // Success, exit the loop
    } catch (error) {
      console.error("Error sending photo:", error.message);
      retries++;
      console.log(`Retrying (${retries}/${maxRetries})...`);
      await sleep(Math.pow(2, retries) * 1000); // Exponential backoff
    }
  }

  if (retries === maxRetries) {
    console.error("Failed to send photo after multiple retries");
  }
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const processPendingMessages = async () => {
  while (Posts.length > 0) {
    if (isConnectionAvailable) {
      const post = Posts.shift();
      const photos = post.photo[post.photo.length - 1];
      const photoId = photos.file_id;
      const caption = post.caption;

      await sendMessageWithRetry(bot, EthioMart, photoId, { caption: caption });
      await sendMessageWithRetry(bot, HabeshaMart, photoId, { caption: caption });
      await sendMessageWithRetry(bot, EthioMatokalaShop, photoId, { caption: caption });
      await sendMessageWithRetry(bot, EthioHabeshaMarket, photoId, { caption: caption });

      let date = new Date();
      let options = {
        timeZone: "Africa/Nairobi",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      console.log(
        "I have posted on the group on",
        date.toLocaleString("en-GB", options)
      );
    } else {
      // Connection is not available, wait and retry after 5 seconds
      console.log("Connection not available. Retrying in 5 seconds...");
      await sleep(5000);
    }
  }
};

setInterval(async () => {
  if (Posts.length > 0) {
    processPendingMessages();
  } else {
    let date = new Date();
    let options = {
      timeZone: "Africa/Nairobi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    console.log(
      "No pending messages. Last check on",
      date.toLocaleString("en-GB", options)
    );
  }
}, 1800000);
