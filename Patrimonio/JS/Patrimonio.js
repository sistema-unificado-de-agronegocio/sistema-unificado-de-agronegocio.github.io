/**
 * Classe objeto para a encapsulação de dados do Patrimonio.
 * @author Mei
 */
class Patrimonio {

    constructor(id) {

        // Setting all attributes as null to differ from the default 'undefined'
        this._id = id;
        this._nome = null;
        this._tipo = null;
        this._finalidade = null;
        this._status = null;
        this._indiceDepreciacao = null;
        this._valorCompra = null;
        this._valorAtual = null;
        this._dataCompra = null;
        this._dataSaida = null;
        this._dataRetorno = null;
        this._dataBaixa = null;
    }

    /**
     * Imprime no console todos os valores da classe.
     * @author Mei
     */
    printToConsole(){

        console.log("Id: " + this._id);
        console.log("Nome: " + this._nome);
        console.log("Tipo: " + this._tipo);
        console.log("Finalidade: " + this._finalidade);
        console.log("Status: " + this._status);
        console.log("Índice de depreciação: " + this._indiceDepreciacao);
        console.log("Valor da Compra: " + this._valorCompra);
        console.log("Valor Atual: " + this._valorAtual);
        console.log("Data da Compra: " + this._dataCompra);
        console.log("Data da Saída: " + this._dataSaida);
        console.log("Data do Retorno: " + this._dataRetorno);
        console.log("Data da Baixa: " + this._dataBaixa);
    }

    /**
     * Tenta converter uma string para o seu valor em Float e a retorna.
     * @param {string} number String a ser convertida.
     * @returns {number} Valor em Float correspondente ou o valor inicial.
     * @author Mei
     */
    tryParse(number){

        if (isNaN(number) == true && typeof number === "string")
            return parseFloat(number);
        else
            return number;
    }

    calculateValorAtual(){

        let anoCompra = this._dataCompra.getFullYear();
        let diferencaData = currentDate.getFullYear() - anoCompra;
        this._valorAtual = this._valorCompra - 
            ((diferencaData * (this._indiceDepreciacao/100))
             * this._valorCompra);
    }

    /**
     * Converte objeto Patrimonio em string JSON.
     * @returns {string} String com formatação JSON do objeto.
     * @author Guilherme Sena
     */
    toJSON(){
      let patrimonioJSON = {
        "id": this._id,
        "nome": this._nome,
        "tipo": this._tipo,
        "descricao": this._descricao,
        "status": this._status,
        "indiceDepreciacao": this._indiceDepreciacao,
        "valorCompra": this._valorCompra,
        "valorAtual": this._valorAtual,
        "dataCompra": this._dataCompra,
        "dataSaida": this._dataSaida,
        "dataRetorno": this._dataRetorno,
        "dataBaixa": this._dataBaixa
      }
      return JSON.stringify(patrimonioJSON);
    }

    // Getter

    get id(){
        return this._id;
    }

    get nome(){
        return this._nome;
    }

    get tipo(){
        return this._tipo;
    }

    get finalidade(){
        return this._finalidade;
    }

    get status(){
        return this._status;
    }

    get indiceDepreciacao(){
        return this._indiceDepreciacao;
    }

    get valorCompra(){
        return this._valorCompra;
    }

    get valorAtual(){
        return this._valorAtual;
    }

    get dataCompra(){
        return this._dataCompra;
    }

    get dataSaida(){
        return this._dataSaida;
    }

    get dataRetorno(){
        return this._dataRetorno;
    }

    get dataBaixa(){
        return this._dataBaixa;
    }

    // Setter

    set id(id){
        this._id = this.tryParse(id);
    }

    set nome(nome){
        this._nome = nome;
    }

    set tipo(tipo){
        switch (tipo) {

            case 'MAQUINA':
            case 'OUTROS':
                this._tipo = tipo;
                break;

            default:
                console.log(new Error("O Tipo recebido não corresponde a nenhum dos valores possíveis."));
                break;
        }
    }

    set finalidade(finalidade){
        this._finalidade = finalidade;
    }

    set status(status){
        switch (status) {

            case 'VENDIDO':
            case 'ALUGADO':
            case 'EM_POSSE':
            case 'DESCARTADO':
            case 'EM_MANUTENCAO':
                this._status = status;
                break;

            default:
                console.log(new Error("O Status recebido não corresponde a nenhum dos valores possíveis."));
                break;
        }
    }

    set indiceDepreciacao(indiceDepreciacao){
            this._indiceDepreciacao = this.tryParse(indiceDepreciacao);
    }

    set valorCompra(valorCompra){
            this._valorCompra = this.tryParse(valorCompra);
    }

    set valorAtual(valorAtual){
            this._valorAtual = this.tryParse(valorAtual);
    }

    set dataCompra(dataCompra = new Date()){
        if (!(dataCompra instanceof Date))
            console.log(new Error("dataCompra precisa receber um objeto instância de Date."));
        else
            this._dataCompra = dataCompra;
    }

    set dataSaida(dataSaida = new Date()){
        if (!(dataSaida instanceof Date))
            console.log(new Error("dataSaida precisa receber um objeto instância de Date."));
        else
            this._dataSaida = dataSaida;
    }

    set dataRetorno(dataRetorno = new Date()){
        if (!(dataRetorno instanceof Date))
            console.log(new Error("dataRetorno precisa receber um objeto instância de Date."));
        else
            this._dataRetorno = dataRetorno;
    }

    set dataBaixa(dataBaixa = new Date()){
        if (!(dataBaixa instanceof Date))
            console.log(new Error("dataBaixa precisa receber um objeto instância de Date."));
        else
            this._dataBaixa = dataBaixa;
    }
}
