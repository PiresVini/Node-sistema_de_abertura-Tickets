class Form {
    constructor(ttk, id, causa, ard, sp, cto, cliente, rua, bairro, cidade, localizacao, inicio, selecionado, valoresSelecionados, hora) {
        
        this.ttk = ttk;
        this.id = id;
        this.causa = causa;
        this.ard = ard;
        this. sp = sp;
        this.cto =  cto;
        this.cliente =  cliente;
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
        this.localizacao = localizacao;
        this.inicio = inicio;
        this.selecionado = selecionado;
        this.valoresSelecionados = valoresSelecionados;
        this.hora = hora;
    }
    //Metodo para instanciar objeto:
    setForm(ttk, id, causa, ard, sp, cto, cliente, rua, bairro, cidade, localizacao, inicio, selecionado, valoresSelecionados, hora) {
        
        this.ttk = ttk;
        this.id = id;
        this.causa = causa;
        this.ard = ard;
        this. sp = sp;
        this.cto =  cto;
        this.cliente =  cliente;
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
        this.localizacao = localizacao;
        this.inicio = inicio;
        this.selecionado = selecionado;
        this.valoresSelecionados = valoresSelecionados;
        this.hora = hora;
    }
    //Metodo para exibir informações
    getForm() {
        return ttk, id, causa, ard, sp, cto, cliente, rua, bairro, cidade, localizacao, inicio, selecionado, valoresSelecionados;
    }
}

export default Form;