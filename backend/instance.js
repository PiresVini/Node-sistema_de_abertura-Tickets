import bot from './bot.js';
import './commands/apagar.js'; // registra o comando /apagar

bot.launch(); // inicia uma instancia do bot
console.log('🤖 Bot Telegram iniciado com sucesso!');
