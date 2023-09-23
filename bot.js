const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const Posts = [];
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const EthioMart = "@ethiooomart";
const HabeshaMart = "@ethioomart2";
const EthioMatokalaShop = "@ethiomart1";
const EthioHabeshaMarket = "@martethioo";
const channelId = -1001370909115;

console.log("I am running the bot");

bot.on("message", (msg) => {
  if (msg.chat.id === 1197204203) {
    console.log(" Message is recived from", msg.chat.id);
    Posts.push(msg);
    console.log("this is the size of messages stored", Posts.length);
  } else if (
    msg.chat.id !== -1001336218818 &&
    msg.chat.id !== -1001458890556 &&
    msg.chat.id !== -1001171910809 &&
    msg.chat.id !== -1001373794511
  ) {
    console.log(" This is the message from  ", msg.chat.id);
    bot.sendMessage(
      msg.chat.id,
      "This is a bot. Please Contact @Hearttsing or Call 0991374186"
    );
  } else {
    const hello = "hello";
  }
});
setInterval(() => {
  Posts.map((post) => {
    const photos = post.photo[post.photo.length - 1];
    const photoId = photos.file_id;
    const caption = post.caption;
    bot
      .sendPhoto(EthioMart, photoId, { caption: caption })
      .catch(console.error);
    bot
      .sendPhoto(HabeshaMart, photoId, { caption: caption })
      .catch(console.error);
    bot
      .sendPhoto(EthioMatokalaShop, photoId, { caption: caption })
      .catch(console.error);
    bot
      .sendPhoto(EthioHabeshaMarket, photoId, { caption: caption })
      .catch(console.error);
  });
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
    "I have posted on the group on ",
    date.toLocaleString("en-GB", options)
  );
}, 1800000);
