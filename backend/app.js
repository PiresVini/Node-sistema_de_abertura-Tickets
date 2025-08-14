import express from 'express';
import multer from 'multer';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sendMask, sendMaskEvidencia } from './services/sendMassage.js';
import { addLine } from './googleSheets/sheets.js';
import { getData, validaRegiao, validaSigla, getHourLog } from './utils/utils.js';
import './instance.js';

const app = express();
// const upload = multer();
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Apenas imagens são permitidas."));
    }
  }
});
const PORT = 8090;

app.use(cors());
bodyParser.json();
app.use(express.json());

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em <opcional-ip-aqui>${PORT}`);
});

app.post('/enviar', upload.single('imagem'), async (req, res) => {
  const { cidade, mensagem, objeto } = req.body;
  const evidencia = req.file;
  const objetoParse = JSON.parse(objeto);

  console.log(`Nova requisição recebida ! ${getHourLog()}`);

  if (!cidade || !mensagem) {
    return res.status(400).json({ alerta: "Cidade e mensagem são obrigatórios ⛔" });
  }

  let resultado;

  try {
    if (!evidencia) {
      resultado = await sendMask(cidade, mensagem);
    } else {
      resultado = await sendMaskEvidencia(cidade, mensagem, evidencia);
    }

    if (resultado.status === "erro") {
      return res.status(400).json({ alerta: resultado.mensagem });
    } else {
      console.log(`OK ticket enviado, adicionando linha a planilha...`);
      let barProgress = '=REPT("█"; ARRED(MÍNIMO(1; MÁXIMO(0; (AGORA()-H13)*24 / SE(G13="Pendência Técnica"; 24; SE(G13="Massiva"; 8; 24)))) * 15)) & " " & TEXTO(MÍNIMO(1; MÁXIMO(0; (AGORA()-H13)*24 / SE(G13="Pendência Técnica"; 24; SE(G13="Massiva"; 8; 24)))); "0%")';
      let lastUpdate = await getData();
      let regiao = await validaRegiao(cidade)
      let sigla = await validaSigla(cidade);
      let inicial = `${objetoParse.inicio} ${objetoParse.hora}`;

      await addLine(regiao, objetoParse.ttk, barProgress, "Aguardando disponibilidade de equipe", lastUpdate, cidade, sigla, objetoParse.valoresSelecionados[0], inicial);
    }



    return res.status(200).json({ sucesso: `Ticket enviado com sucesso 🚀 Região ${resultado.grupo}` });
  } catch (error) {
    console.error("Erro inesperado:", error);
    return res.status(500).json({ alerta: "Erro interno no servidor" });
  }
});


