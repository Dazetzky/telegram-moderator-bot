const TelegramBot = require("node-telegram-bot-api");
const token = "token"; //токен
const bot = new TelegramBot(token, { polling: true });

const containsForbiddenContent = (messageText) => {
  //URL
  const urlRegex = /(https?:\/\/[^\s]+)/i;
  //Упоминания пользователей (@username)
  const mentionRegex = /@([a-zA-Z0-9_]+)/g;
  return urlRegex.test(messageText) || mentionRegex.test(messageText);
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Я главный подсос Дазецкого 🥵");
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  const userId = msg.from.id;
  const username = msg.from.username;

  if (messageText && containsForbiddenContent(messageText)) {
    //Удаляем сообщение
    bot.deleteMessage(chatId, msg.message_id).catch((error) => {
      console.error("Error deleting message:", error);
    });

    //Предупреждаем
    //const warningMessage = '@${username}, пожалуйста, не отправляйте ссылки и упоминания в этот чат.'; //нормальное оповещение, подходит для чатов
    const warningMessage =
      "Здесь была рекламная шваль, позор! Никаких ссылок и упоминаний!"; //для комментариев, чтобы не переходили по юзернейму на сомнительные штуки
    bot.sendMessage(chatId, warningMessage).catch((error) => {
      console.error("Ошибка:", error);
    });

    // Кик опездола
    // bot.kickChatMember(chatId, userId).catch((error) => {
    //     console.error('Ошибка:', error);
    // });
  }
});
console.log("Бот запущен...гойдаааа");
