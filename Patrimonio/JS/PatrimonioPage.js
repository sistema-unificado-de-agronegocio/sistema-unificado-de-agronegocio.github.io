/**
 * Arquivo JavaScript responsável pelas interações dinâmicas da página
 *  e pelo encapsulamento de objetos Patrimônio.
 * @author Mei, Sávio
 */

// --- DOM ---

const patrimonioMenuButton = document.querySelector("button[name='patrimonioMenuButton']");
const addPatrimonioButton = document.querySelector("#addPatrimonioButton");
const entradaOptionButton = document.querySelectorAll("button[name='entradaOptionButton']");
const saidaOptionButton = document.querySelectorAll("button[name='saidaOptionButton']");
const cancelarModalButton = document.querySelectorAll("button[name='cancelarModalButton']");
const enviarEntradaModalButton = document.querySelector("button[name='enviarEntradaModalButton']");
const enviarSaidaModalButton = document.querySelector("button[name='enviarSaidaModalButton']");
//const enviarForm
const statusOptionsDiv = document.querySelector("#statusOptions");
const entradaModal = document.querySelector("#entrada");
const saidaModal = document.querySelector("#saida");
const formModal = document.querySelector("#form");
const patrimonioTable = document.querySelector("#patrimonioTable tbody");
const mascara = document.querySelector(".mascara");

const NA = "N/A";

let editButton = document.querySelectorAll("[id|=edit]");

const editHandler = (id) => {showModal('editar', id)};

// --- FUNCTIONS ---

/**
 * Mostra uma determinada Modal e esconde as outras
 * @param {string} modal
 * @author Mei
 */
function showModal(modal, id){
    mascara.classList.add("aparece-fundo-escuro");
    switch (modal) {
        case 'compra':

            formModal.classList.add("aparece");
            entradaModal.classList.remove("aparece");
            saidaModal.classList.remove("aparece");
            //formModal.style.minHeight = "34em";
            document.querySelector("#statusOptions").classList.add("esconde");
            document.querySelector("#statusOptions").classList.remove("aparece");
            break;

        case 'entrada':

            entradaModal.classList.add("aparece");
            entradaModal.classList.remove("esconde");
            saidaModal.classList.remove("aparece");
            saidaModal.classList.add("esconde");
            formModal.classList.remove("aparece");
            formModal.classList.add("esconde");
            break;

        case 'saida':

            saidaModal.classList.toggle("aparece");
            entradaModal.classList.remove("aparece");
            formModal.classList.remove("aparece");
            break;

        case 'editar':

            formModal.classList.toggle("aparece");
            entradaModal.classList.remove("aparece");
            saidaModal.classList.remove("aparece");

            //formModal.style.minHeight = "37.9em";
            statusOptionsDiv.classList.remove("esconde");
            statusOptionsDiv.classList.add("aparece");

            break;

        default:
            break;
    }
}

/**
 * Esconde todas as div Modal
 * @author Mei
 */
function hideModal(){
    mascara.classList.remove("aparece-fundo-escuro");
    saidaModal.classList.remove("aparece");
    entradaModal.classList.remove("aparece");
    formModal.classList.remove("aparece");
}

function recebeDadosEntrada(){
    entradaModal.classList.remove("aparece");
}

function  recebeDadosSaida(){
    saidaModal.classList.remove("aparece");
}

/**
 * Insere um objeto Patrimonio na tabela principal.
 * @param {Patrimonio} patrimonio
 * @author Mei
 */
function insertPatrimonioIntoTable(patrimonio = new Patrimonio()){

    let tr = document.createElement("tr");
    let td;
    let button;

    td = document.createElement("td");
    if(patrimonio.id !== undefined)
        td.innerHTML = patrimonio.id;
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.nome !== null && patrimonio.nome !== "")
        td.innerHTML = patrimonio.nome;
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.tipo !== null && patrimonio.tipo !== "")
        td.innerHTML = patrimonio.tipo;
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.finalidade !== null && patrimonio.finalidade !== "")
        td.innerHTML = patrimonio.finalidade;
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.status !== null && patrimonio.status !== "")
        td.innerHTML = patrimonio.status;
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.indiceDepreciacao !== null && patrimonio.indiceDepreciacao !== "")
        td.innerHTML = patrimonio.indiceDepreciacao;
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.valorCompra !== null && patrimonio.valorCompra !== "")
        td.innerHTML = patrimonio.valorCompra;
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.valorAtual !== null && patrimonio.valorAtual !== "")
        td.innerHTML = patrimonio.valorAtual;
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.dataCompra !== null)
        td.innerHTML = patrimonio.dataCompra.toISOString().slice(0,10).replace("/-/g","");
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.dataSaida !== null)
        td.innerHTML = patrimonio.dataSaida.toISOString().slice(0,10).replace("/-/g","");
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.dataRetorno !== null)
        td.innerHTML = patrimonio.dataRetorno.toISOString().slice(0,10).replace("/-/g","");
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.dataBaixa !== null)
        td.innerHTML = patrimonio.dataBaixa.toISOString().slice(0,10).replace("/-/g","");
    else
        td.innerHTML = NA;
    tr.appendChild(td);

    // Adicionando os botões com id's variáveis. Ex: 'edit-7'
    td = document.createElement("td");

    button = document.createElement("button");
    button.id = "edit-" + patrimonio.id;
    button.innerHTML = "Editar";
    td.appendChild(button);

    button = document.createElement("button");
    button.id = "delete-" + patrimonio.id;
    button.innerHTML = "Deletar";
    td.appendChild(button);

    tr.appendChild(td);

    patrimonioTable.appendChild(tr);
    updateDynamicEventListeners()

}

/**
 * Esconde a tabela principal e a substui por uma mensagem de aviso
 * @author Mei
 */
function hidePatrimonioTable(){

    //let table = document.querySelector("#tabela");
    document.querySelector("table").style.display = "none";

    let span = document.createElement("span");
    span.id = "noResults";

    let message = document.createElement("p");
    message.innerHTML = "Nenhum Patrimônio foi encontrado.";
    span.appendChild(message);

    message = document.createElement("p");
    message.innerHTML = "Tente mudar o filtro selecionado ou registrar um novo Patrimônio.";
    span.appendChild(message);

    document.querySelector("#tabela").appendChild(span);

}

/**
 * Mostra novamete a tabela e remove a mensagem de aviso.
 * @author Mei
 */
function showPatrimonioTable(){

    document.querySelector("table").style.display = "block";
    document.querySelector("#noResults").remove();
}

/**
 * Recupera as informações da div Modal e as armazena em um objeto Patrimonio.
 * @author Mei
 */
function recoverPatrimonioFromCompraModal(){

    let patrimonio = new Patrimonio();

    patrimonio.nome = document.querySelector("#form [name='nomeInput']").value;
    patrimonio.tipo = document.querySelector("#form [name='tipoInput']").value;
    patrimonio.finalidade = document.querySelector("#form [name='finalidadeInput']").value;
    patrimonio.indiceDepreciacao = document.querySelector("#form [name='indiceDepreciacaoInput']").value;
    patrimonio.valorCompra = document.querySelector("#form [name='valorCompraInput']").value;
    let data = document.querySelector("#form [name='dataCompraInput']").value.split('-');
    if (data[0] !== "")
        patrimonio.dataCompra = new Date(data[0], data[1], data[2]);
    else
        console.log(new Error("O formato enviado da Data está incorreto!"));

    hideModal();
    return patrimonio;
}

// --- EVENT LISTENERS ---

addPatrimonioButton.addEventListener("click", () => {showModal('compra')});
enviarEntradaModalButton.addEventListener("click", recebeDadosEntrada);
enviarSaidaModalButton.addEventListener("click", recebeDadosSaida);

function updateDynamicEventListeners() {

    editButton = document.querySelectorAll("[id|=edit]");

    //editButton.forEach(addEventListener("click", function(){editHandler(1)}));

    editButton[editButton.length - 1].addEventListener("click", function(){editHandler(1)});

    /*for (let i = 0; i < editButton.length; i++) {
        let currentButton = editButton[i];
        currentButton.addEventListener("click", function(){editHandler(i)});
    }*/
}

//updateDynamicEventListeners();
for (let i = 0; i < entradaOptionButton.length; i++) {
    entradaOptionButton[i].addEventListener("click", () => {showModal('entrada')});
}
for (let i = 0; i < saidaOptionButton.length; i++) {
    saidaOptionButton[i].addEventListener("click", () => {showModal('saida')});
}
for (let i = 0; i < cancelarModalButton.length; i++) {
    cancelarModalButton[i].addEventListener("click", hideModal);
}
