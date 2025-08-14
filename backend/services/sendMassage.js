import bot from '../bot.js';
import { lastMessages } from '../commands/apagar.js';
import { validaRegiao } from '../utils/utils.js';

const grupos = {
  SUL: 'group-id-aqui',
  NORTE: 'group-id-aqui',
  SERRA: 'group-id-aqui',
  TAQUARI: 'group-id-aqui'
};

export async function sendMask(cidade, message) {
  try {
    const regiao = await validaRegiao(cidade);
    const chatId = grupos[regiao];

    if (!chatId) {
      return { status: "erro", mensagem: "Cidade inválida ou fora dos grupos definidos. ⛔" };
    }

    const sent = await bot.telegram.sendMessage(chatId, message);
    lastMessages[regiao.toLowerCase()][chatId] = sent.message_id;

    return { status: "ok", grupo: regiao };
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    return { status: "erro", mensagem: "Erro inesperado com a API do Telegram" };
  }
}

export async function sendMaskEvidencia(cidade, message, evidencia) {
  try {
    const regiao = await validaRegiao(cidade);
    const chatId = grupos[regiao];

    if (!chatId) {
      return { status: "erro", mensagem: "Cidade inválida ou fora dos grupos definidos. ⛔" };
    }

    const sent = await bot.telegram.sendPhoto(chatId, { source: evidencia.buffer }, { caption: message });
    lastMessages[regiao.toLowerCase()][chatId] = sent.message_id;

    return { status: "ok", grupo: regiao };
  } catch (error) {
    console.error('Erro ao enviar evidência:', error);
    return { status: "erro", mensagem: "Erro inesperado com a API do Telegram" };
  }
}
