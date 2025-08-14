# Node-sistema_de_abertura-Tickets
🚀 Sistema de Abertura de Tickets Automatizado  Um pequeno projeto desenvolvido de forma independente para agilizar e automatizar o processo de abertura de tickets na empresa onde trabalho. O sistema integra formulário web + bot no Telegram + Google Sheets para tornar o fluxo de atendimento mais rápido e organizado.
🛠 Tecnologias Utilizadas

Frontend: HTML + CSS + JavaScript
Backend: Node.js (módulos googleapis e telegraf)
Comunicação Front ↔ Back: Express.js

⚙️ Funcionalidades

✅ Formulário de abertura de tickets
Pré-visualização antes do envio
Upload de imagem como evidência

✅ Integração com o Telegram
Envio automático da “máscara de abertura” para equipes externas
Filtragem automática por cidade e região (4 regiões distintas)
Encaminhamento direto para a equipe responsável pela área do chamado

✅ Integração com Google Sheets
Registro automático de cada ticket em uma planilha de controle interno

📈 Fluxo de Trabalho

Usuário preenche o formulário e anexa a evidência (opcional)
O backend processa as informações e identifica a região de atendimento
O bot do Telegram envia o chamado para grupo/região correta
O ticket é registrado automaticamente no Google Sheets também filtrando por região 
