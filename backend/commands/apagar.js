import bot from '../bot.js';
import { getHourLog } from '../utils/utils.js';

export const lastMessages = {
  sul: {},
  norte: {},
  serra: {},
  taquari: {}
};

const chatRegioes = {
  'group-id-aqui': 'sul',
  'group-id-aqui': 'norte',
  'group-id-aqui': 'serra',
  'group-id-aqui': 'taquari'
};

const usersAutorizados = [
  // User IDs telegram para usuarios autorizados
];

bot.command('apagar', async (ctx) => {
  try {
    const userId = ctx.from.id;

    if (!usersAutorizados.includes(userId)) {
      return ctx.reply('Você não tem permissão para apagar mensagens.');
    }

    const chatId = String(ctx.chat.id);
    const regiao = chatRegioes[chatId];

    if (!regiao) {
      return ctx.reply('Este grupo não está registrado.');
    }

    const messageId = lastMessages[regiao]?.[chatId];
    if (!messageId) {
      return ctx.reply('Nenhuma mensagem registrada para apagar.');
    }

    await ctx.telegram.deleteMessage(chatId, messageId);
    delete lastMessages[regiao][chatId];
    ctx.reply('Ticket excluído com sucesso! 🚮');
    console.log(`Mensagem apagada no grupo ${regiao} - ${getHourLog()}`);
  } catch (error) {
    console.error('Erro ao apagar a mensagem:', error);
    ctx.reply('Erro ao apagar a mensagem.');
  }
});
