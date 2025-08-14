import Form from "./Form.js";

console.log("script carregado");

document.getElementById('btn').addEventListener('click', getInfo);
document.getElementById('btn-limpa').addEventListener('click', limpa);
function getInfo() {
  let ttk = document.getElementById("label-ttk").value;
  let id = document.getElementById("label-id").value;
  let causa = document.getElementById("label-causa").value;
  let ard = document.getElementById("label-ard").value;
  let sp = document.getElementById("label-sp").value;
  let cto = document.getElementById("label-cto").value;
  let cliente = document.getElementById("label-cliente").value;
  let rua = document.getElementById("label-rua").value;
  let bairro = document.getElementById("label-bairro").value;
  let cidade = document.getElementById("cidadeSelect").value;
  let localizacao = gerarLinkGoogleMaps(rua, bairro, cidade);
  let inicio = getData();
  let hora = document.getElementById("label-hora").value;
  const valoresSelecionados = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(el => el.value);
  let sla = "";
  if (valoresSelecionados.includes("Massiva")) {
    sla = "8hrs";
  } else {
    sla = "24hrs"
  }
  if (!ttk || !hora || valoresSelecionados == "") {
    const alerta = document.getElementById("alerta");
    alerta.textContent = "Atenção! Os campos TTK, Hora inicio e Tag não podem ser vazios ⛔";
    alerta.style.display = "block";
    setTimeout(() => { alerta.style.display = "none"; }, 3000);
    return;
  }

  const obj = new Form();
  obj.setForm(ttk, id, causa, ard, sp, cto, cliente, rua, bairro, cidade, localizacao, inicio, sla, valoresSelecionados, hora);
  document.getElementById("saida-texto").value = `
TTK: ${obj.ttk}
ID Serviço: ${obj.id}
Causa Raiz: ${obj.causa}
TAG: ${obj.valoresSelecionados}
ARD: ${obj.ard}
SP: ${obj.sp}
CTOs: ${obj.cto}
Clientes Afetados: ${obj.cliente}
Rua: ${obj.rua}
Bairro: ${obj.bairro}
Cidade: ${obj.cidade}
Localização: ${obj.localizacao}
Data Inicio: ${obj.inicio} | ${obj.hora}
Data Fim:
Obs:
    

SLA: ${obj.selecionado}
Material gasto:

SIM:( ) Não alterar escrita, apenas coloque o X sem espaço se gasto material FiBrasil
NÃO:( ) Não alterar escrita, apenas coloque o X sem espaço se gasto material FiBrasil
DESCREVA SUA ATIVIDADE:
    
Equipe:`;



  return obj;
}

const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileElem');
const preview = document.getElementById('preview');
const status = document.getElementById('status');

let evidenciaSelecionada = null; // variavel para guardar a imagem

['dragenter', 'dragover'].forEach(event => {
  dropArea.addEventListener(event, e => {
    e.preventDefault();
    dropArea.classList.add('highlight');
  });
});

['dragleave', 'drop'].forEach(event => {
  dropArea.addEventListener(event, e => {
    e.preventDefault();
    dropArea.classList.remove('highlight');
  });
});

dropArea.addEventListener('drop', e => {
  const file = e.dataTransfer.files[0];
  if (file) uploadFile(file);
});

fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) uploadFile(file);
});

function uploadFile(file) {
  const alerta = document.getElementById("alerta");

  if (!file.type.startsWith('image/')) {
    alerta.textContent = "Apenas arquivos de imagem são permitidos.";
    alerta.style.display = "block";
    setTimeout(() => { alerta.style.display = "none"; }, 3000);
    return;
  }
  const maxSizeMB = 5; // Limita imagem com tamanho de 5Mb
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    alerta.textContent = `O tamanho máximo permitido é de ${maxSizeMB}MB.`;
    alerta.style.display = "block";
    setTimeout(() => { alerta.style.display = "none"; }, 3000);
    return;
  }

  // Armazena o arquivo para envio
  evidenciaSelecionada = file;

  // Mostrar preview
  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

document.getElementById('envia-telegram').addEventListener('click', async () => {
  const botao = document.getElementById("envia-telegram");
  botao.disabled = true;
  botao.style.border = "solid #b9a04b 3px"
  setTimeout(() => {
    botao.disabled = false;
    botao.style.border = "none"
  }, 5000);

  const cidade = document.getElementById("cidadeSelect").value;
  const mensagem = document.getElementById("saida-texto").value;
  const objetoTeste = getInfo();

  if (cidade.trim() === "") {
    const alerta = document.getElementById("alerta");
    alerta.textContent = "Atenção! O campo cidade não pode ser vazio ⛔";
    alerta.style.display = "block";
    setTimeout(() => { alerta.style.display = "none"; }, 5000);
    return;
  }

  const form = new FormData();
  form.append('cidade', cidade);
  form.append('mensagem', mensagem);
  form.append('objeto', JSON.stringify(objetoTeste));
  if (evidenciaSelecionada) {
    form.append('imagem', evidenciaSelecionada);
  }

  try {
    const response = await fetch("<ip/nome-backend>/enviar", {
      method: "POST",
      body: form
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      mostrarAlerta(data.sucesso);
      setTimeout(() => limpa(), 5000);
    } else {
      const alerta = document.getElementById("alerta");
      alerta.textContent = `${data.alerta}`;
      alerta.style.display = "block";
      setTimeout(() => { alerta.style.display = "none"; }, 5000);
    }
  } catch (erro) {
    console.error(erro);
  }
});

function mostrarAlerta(msg) {
  const alerta = document.getElementById("alerta");
  alerta.textContent = msg;
  alerta.style.display = "block";
  setTimeout(() => alerta.style.display = "none", 3000);
}

function limpa() {
  document.getElementById("saida-texto").value = "";
  document.getElementById("label-causa").value = '1';
  evidenciaSelecionada = null;
  // Limpa input file
  const fileInput = document.getElementById("fileElem");
  fileInput.value = '';

  // Limpa preview
  const preview = document.getElementById("preview");
  preview.src = '';
  preview.style.display = 'none';

  // Limpa outros campos do form
  const form = document.getElementById("cont");
  const campos = form.querySelectorAll("input, textarea");
  campos.forEach(input => {
    if (input.type === "checkbox" || input.type === "radio") {
      input.checked = false;
    } else if (input.type !== "file") {
      input.value = "";
    }
  });
  choices.removeActiveItems();
  return false;
}

function getData() {
  const agora = new Date();
  const data = agora.toLocaleDateString();

  return `${data}`;
}

function gerarLinkGoogleMaps(rua, bairro, cidade) {
  const endereco = `${rua}, ${bairro}, ${cidade}`;
  const enderecoFormatado = encodeURIComponent(endereco);
  return `https://www.google.com/maps/search/?api=1&query=${enderecoFormatado}`;
}

// async function consultarCEP(cep) {
//   try {
//     const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
//     if (!response.ok) throw new Error('CEP não encontrado');

//     const data = await response.json();

//     // Preenche os campos
//     document.getElementById("label-rua").value = data.street;
//     document.getElementById("label-bairro").value = data.neighborhood;
//     document.getElementById("cidadeSelect").value = data.city;

//   } catch (error) {
//     console.error('Erro na consulta do CEP:', error);
//     alert("CEP inválido ou não encontrado.");
//   }
// }

// // Chama a função quando o valor do campo mudar
// document.getElementById("label-cep").addEventListener("change", function () {
//   const cep = this.value.replace(/\D/g, ''); // remove não numéricos
//   if (cep.length === 8) {
//     consultarCEP(cep);
//   } else {
//     alert("CEP deve conter 8 dígitos numéricos.");
//   }
// });

// auto completar campo cidade
const elemento = document.getElementById('cidadeSelect');
const choices = new Choices(elemento, {
  searchEnabled: true,
  itemSelectText: '',
});

// animações botão tema
const toggleButton = document.getElementById("toggleTheme");
const slide = document.getElementById("slid-circle");
let anima = false;
let trocada = false;
const img = document.getElementById("icon-theme");
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  let animaRight = "slide-right 1s linear 0s 1 normal forwards";
  let animaLeft = "slide-left 1s linear 0s 1 normal forwards";
  if (anima === false) {
    slide.style.animation = animaRight;
    anima = true;
  } else {
    slide.style.animation = animaLeft;
    anima = false;
  }

  if (trocada) {
    img.src = "/frontend/assets/icons/sun_1488264.png";
  } else {
    img.src = "/frontend/assets/icons/moon_616633.png";
  }

  trocada = !trocada;
});