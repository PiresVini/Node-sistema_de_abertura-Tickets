const cidadeMap = {
    // ... SUL
    CAMAQUA: { sigla: "CAM", grupo: "SUL" },
    BAGE: { sigla: "BGE", grupo: "SUL" },
    SANTANADOLIVRAMENTO: { sigla: "SIV", grupo: "SUL" },
    ALEGRETE: { sigla: "ALG", grupo: "SUL" },
    URUGUAIANA: { sigla: "UGN", grupo: "SUL" },
    // ... NORTE
    CARAZINHO: { sigla: "CIO", grupo: "NORTE" },
    ERECHIM: { sigla: "ERE", grupo: "NORTE" },
    IJUI: { sigla: "IJI", grupo: "NORTE"},
    PALMEIRADASMISSOES: { sigla: "PMM", grupo: "NORTE" },
    SANTAROSA: { sigla: "SRO", grupo: "NORTE" },
    SANTOANGELO: { sigla: "SAN", grupo: "NORTE" },
    SARANDI: { sigla: "SRD", grupo: "NORTE" },
    TRESDEMAIO: { sigla: "TMI", grupo: "NORTE" },
    CACHOEIRADOSUL: { sigla: "CCR", grupo: "NORTE" },
    // ... SERRA
    CANELA: { sigla: "CEN", grupo: "SERRA" },
    CAPAODACANOA: { sigla: "KDK", grupo: "SERRA" },
    CARLOSBARBOSA: { sigla: "CLB", grupo: "SERRA" },
    DOISIRMAOS: { sigla: "DSR", grupo: "SERRA" },
    FLORESDACUNHA: { sigla: "FCA", grupo: "SERRA" },
    GARIBALDI: { sigla: "GRD", grupo: "SERRA" },
    GRAMADO: { sigla: "GDO", grupo: "SERRA" },
    IGREJINHA: { sigla: "IJH", grupo: "SERRA" },
    IVOTI: { sigla: "IVI", grupo: "SERRA" },
    LAGOAVERMELHA: { sigla: "LVH", grupo: "SERRA" },
    NOVAPETROPOLIS: { sigla: "NVP", grupo: "SERRA" },
    OSORIO: { sigla: "OSR", grupo: "SERRA" },
    SAOMARCOS: { sigla: "SCS", grupo: "SERRA" },
    TAQUARA: { sigla: "TQR", grupo: "SERRA" },
    TORRES: { sigla: "TES", grupo: "SERRA" },
    TRAMANDAI: { sigla: "TRI", grupo: "SERRA" },
    VACARIA: { sigla: "VAA", grupo: "SERRA" },
    VERANOPOLIS: { sigla: "VNS", grupo: "SERRA" },
    XANGRILA: { sigla: "XNLA", grupo: "SERRA" },
    // ... TAQUARI
    LAJEADO: { sigla: "LJO", grupo: "TAQUARI" },
    ESTRELA: { sigla: "ETA", grupo: "TAQUARI" },
    VENANCIOAIRES: { sigla: "VAI", grupo: "TAQUARI" },
    TEUTONIA: { sigla: "TUN", grupo: "TAQUARI" },
    CHARQUEADAS: { sigla: "CQU", grupo: "TAQUARI" }
};

console.log("script utils carregado !")

function limparTexto(texto) {
    return texto
        .normalize("NFD")                     // Trata letras de acentos
        .replace(/[\u0300-\u036f]/g, "")      // Remove acentos
        .replace(/[\s\-_.]/g, "")             // Remove caracteres especiais
        .toUpperCase();                       // Transforma em maiúsculas
}

export async function validaRegiao(cidade) {
    const city = limparTexto(cidade);
    const dados = cidadeMap[city];
    return dados ? dados.grupo : "";
}

export async function validaSigla(cidade) {
    let sigla = "";
    let city = limparTexto(cidade);
    let dados = cidadeMap[city];
    return dados ? dados.sigla : "";
}

export async function getData() {
  const agora = new Date();
  const data = agora.toLocaleDateString();

  return `${data}`;
}

export function getHourLog() {
    const hour = new Date();
    const dateNow = hour.toLocaleDateString();
    const hourNow = hour.toLocaleTimeString();

    return `${hourNow} | ${dateNow}`;
}