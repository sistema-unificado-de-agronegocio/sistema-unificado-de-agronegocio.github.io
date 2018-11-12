/**
 * Arquivo JavaScript responsável pelas interações dinâmicas da página
 *  e pelo encapsulamento de objetos Patrimônio.
 * @author Mei, Sávio
 */

// --- DOM ---

const patrimonioMenuButton = document.querySelector("button[name='patrimonioMenuButton']");
const addPatrimonioButton = document.querySelector("#addPatrimonioButton");
const entradaOptionButton = document.querySelector("button[name='entradaOptionButton']");
const saidaOptionButton = document.querySelector("button[name='saidaOptionButton']");
const cancelarModalButton = document.querySelector("button[name='cancelarModalButton']");
const enviarButton = document.querySelector("#form button[name='enviar']");
const enviarSaidaModalButton = document.querySelector("button[name='enviarSaidaModalButton']");
const statusOptionsDiv = document.querySelector("#statusOptions");
const entradaDiv = document.querySelector("[name=entrada]");
const saidaDiv = document.querySelector("[name=saida]");
const formModal = document.querySelector("#form");
const patrimonioTable = document.querySelector("#patrimonioTable tbody");
const mascara = document.querySelector(".mascara");
let editButton = document.querySelectorAll("[id|=edit]");

const NA = "N/A";

let currentPatrimonioBeingEdited = null;

// --- FUNCTIONS ---

/**
 * Mostra uma determinada Modal e esconde as outras
 * @param {string} modal
 * @author Mei
 */
function showModal(modal){

    mascara.classList.add("aparece-fundo-escuro");
    hideEditOptions();

    switch (modal) {
        case 'compra':

            formModal.classList.add("aparece");
            statusOptionsDiv.classList.add("esconde");
            enviarButton.removeEventListener("click", editPatrimonio);
            enviarButton.addEventListener("click", newPatrimonio);
            clearMainModal();
            break;

        case 'editar':

            formModal.classList.toggle("aparece");
            statusOptionsDiv.classList.remove("esconde");
            enviarButton.removeEventListener("click", newPatrimonio);
            enviarButton.addEventListener("click", editPatrimonio);
            break;

        default:
            break;
    }
}

function showEditOptions(key){

    switch (key) {
        case 'entrada':
            
            entradaDiv.classList.remove("esconde");
            saidaDiv.classList.add("esconde");
            break;

        case 'saida':

            entradaDiv.classList.add("esconde");
            saidaDiv.classList.remove("esconde");
            break;
    
        default:
            break;
    }
}

function hideEditOptions(){

    entradaDiv.classList.add("esconde");
    saidaDiv.classList.add("esconde");
}

/**
 * Esconde todas as div Modal
 * @author Mei
 */
function hideModal(){
    mascara.classList.remove("aparece-fundo-escuro");
    formModal.classList.remove("aparece");
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
    let id = patrimonio.id;

    if (document.querySelector("#noResults") !== null) {
        showPatrimonioTable();
    }

    tr.setAttribute("name","patrimonio-" + patrimonio.id);

    td = document.createElement("td");
    if(patrimonio.id !== undefined)
        td.innerHTML = patrimonio.id;
    else
        td.innerHTML = NA;
    td.id = "id-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.nome !== null && patrimonio.nome !== "")
        td.innerHTML = patrimonio.nome;
    else
        td.innerHTML = NA;
    td.id = "nome-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.tipo !== null && patrimonio.tipo !== "")
        td.innerHTML = patrimonio.tipo;
    else
        td.innerHTML = NA;
    td.id = "tipo-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.finalidade !== null && patrimonio.finalidade !== "")
        td.innerHTML = patrimonio.finalidade;
    else
        td.innerHTML = NA;
    td.id = "finalidade-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.status !== null && patrimonio.status !== "")
        td.innerHTML = patrimonio.status;
    else
        td.innerHTML = NA;
    td.id = "status-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.indiceDepreciacao !== null && patrimonio.indiceDepreciacao !== "")
        td.innerHTML = patrimonio.indiceDepreciacao;
    else
        td.innerHTML = NA;
    td.id = "indiceDepreciacao-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.valorCompra !== null && patrimonio.valorCompra !== "")
        td.innerHTML = patrimonio.valorCompra;
    else
        td.innerHTML = NA;
    td.id = "valorCompra-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.valorAtual !== null && patrimonio.valorAtual !== "")
        td.innerHTML = patrimonio.valorAtual;
    else
        td.innerHTML = NA;
    td.id = "valorAtual-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.dataCompra !== null)
        td.innerHTML = patrimonio.dataCompra.toISOString().slice(0,10).replace("/-/g","");
    else
        td.innerHTML = NA;
    td.id = "dataCompra-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.dataSaida !== null)
        td.innerHTML = patrimonio.dataSaida.toISOString().slice(0,10).replace("/-/g","");
    else
        td.innerHTML = NA;
    td.id = "dataSaida-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.dataRetorno !== null)
        td.innerHTML = patrimonio.dataRetorno.toISOString().slice(0,10).replace("/-/g","");
    else
        td.innerHTML = NA;
    td.id = "dataRetorno-" + id;
    tr.appendChild(td);

    td = document.createElement("td");
    if(patrimonio.dataBaixa !== null)
        td.innerHTML = patrimonio.dataBaixa.toISOString().slice(0,10).replace("/-/g","");
    else
        td.innerHTML = NA;
    td.id = "dataBaixa-" + id;
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

function clearTableContents() {
    
    patrimonioTable.innerHTML = "";
    hidePatrimonioTable();
}

/**
 * Atualiza as informações de um Patrimonio na tabela.
 * @param {Patrimonio} patrimonio 
 * @author Mei
 */
function updatePatrimonioIntoTable(patrimonio = new Patrimonio()){

    let id = patrimonio.id;
    
    if(patrimonio.nome !== null && patrimonio.nome !== "")
        document.querySelector("#nome-" + id).innerHTML = patrimonio.nome;
    else 
        document.querySelector("#nome-" + id).innerHTML = NA;

    if(patrimonio.tipo !== null && patrimonio.tipo !== "")
        document.querySelector("#tipo-" + id).innerHTML = patrimonio.tipo;
    else
        document.querySelector("#tipo-" + id).innerHTML = NA;
    
    if(patrimonio.finalidade !== null && patrimonio.finalidade !== "")
        document.querySelector("#finalidade-" + id).innerHTML = patrimonio.finalidade;
    else
        document.querySelector("#finalidade-" + id).innerHTML = NA;
    
    if(patrimonio.status !== null && patrimonio.status !== "")
        document.querySelector("#status-" + id).innerHTML = patrimonio.status;
    else
        document.querySelector("#status-" + id).innerHTML = NA;
    
    if(patrimonio.indiceDepreciacao !== null && patrimonio.indiceDepreciacao !== "")
        document.querySelector("#indiceDepreciacao-" + id).innerHTML = patrimonio.indiceDepreciacao;
    else
        document.querySelector("#indiceDepreciacao-" + id).innerHTML = NA;
    
    if(patrimonio.valorCompra !== null && patrimonio.valorCompra !== "")
        document.querySelector("#valorCompra-" + id).innerHTML = patrimonio.valorCompra;
    else
        document.querySelector("#valorCompra-" + id).innerHTML = NA;

    if(patrimonio.valorAtual !== null && patrimonio.valorAtual !== "")
        document.querySelector("#valorAtual-" + id).innerHTML = patrimonio.valorAtual;
    else
        document.querySelector("#valorAtual-" + id).innerHTML = NA;
    
    if(patrimonio.dataCompra !== null && patrimonio.dataCompra !== "")
        document.querySelector("#dataCompra-" + id).innerHTML = patrimonio.dataCompra
        .toISOString().slice(0,10).replace("/-/g","");
    else
        document.querySelector("#dataCompra-" + id).innerHTML = NA;
    
    if(patrimonio.dataSaida !== null && patrimonio.dataSaida !== "")
        document.querySelector("#dataSaida-" + id).innerHTML = patrimonio.dataSaida
        .toISOString().slice(0,10).replace("/-/g","");
    else
        document.querySelector("#dataSaida-" + id).innerHTML = NA;
    
    if(patrimonio.dataRetorno !== null && patrimonio.dataRetorno !== "")
        document.querySelector("#dataRetorno-" + id).innerHTML = patrimonio.dataRetorno
        .toISOString().slice(0,10).replace("/-/g","");
    else
        document.querySelector("#dataRetorno-" + id).innerHTML = NA;
    
    if(patrimonio.dataBaixa !== null && patrimonio.dataBaixa !== "")
        document.querySelector("#dataBaixa-" + id).innerHTML = patrimonio.dataBaixa
        .toISOString().slice(0,10).replace("/-/g","");
    else
        document.querySelector("#dataBaixa-" + id).innerHTML = NA;
}

function removePatrimonioFromTable(id){

    document.querySelector("tbody [name=patrimonio-"+ id +"]").remove();

    if (document.querySelectorAll("tbody tr")[0] == null)
        hidePatrimonioTable();
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
    message.innerHTML = "Tente mudar o filtro selecionado ou registre um novo Patrimônio.";
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
function getPatrimonioFromModal(){

    let patrimonio = new Patrimonio();
    let data;

    if (document.querySelector("#form [name='nomeInput']").value !== "")
        patrimonio.nome = document.querySelector("#form [name='nomeInput']").value;

    if (document.querySelector("#form [name='tipoInput']").value !== "")
        patrimonio.tipo = document.querySelector("#form [name='tipoInput']").value;

    if (document.querySelector("#form [name='finalidadeInput']").value !== "")
        patrimonio.finalidade = document.querySelector("#form [name='finalidadeInput']").value;

    if (document.querySelector("#form [name='indiceDepreciacaoInput']").value !== "")
        patrimonio.indiceDepreciacao = document.querySelector("#form [name='indiceDepreciacaoInput']").value;

    if (document.querySelector("#form [name='valorCompraInput']").value !== "")
        patrimonio.valorCompra = document.querySelector("#form [name='valorCompraInput']").value;

    data = document.querySelector("#form [name='dataCompraInput']").value.split('-');
    if (data[0] !== "") 
        patrimonio.dataCompra = new Date(data[0], data[1] - 1, data[2]);
    else
        console.log(new Error("O formato enviado da Data está incorreto!"));
        
    hideModal();
    return patrimonio;
}

/**
 * Retorna um objeto Patrimonio da Tabela com o Id fornecido.
 * @param {string} id 
 * @returns {string} nome
 * @author Mei
 */
function getPatrimonioFromTable(id){

    let patrimonio = new Patrimonio();
    let data;

    let nomeField = document.querySelector("#nome-" + id).innerHTML;
    let tipoField = document.querySelector("#tipo-" + id).innerHTML;
    let finalidadeField = document.querySelector("#finalidade-" + id).innerHTML;
    let statusField = document.querySelector("#status-" + id).innerHTML;
    let indiceDepreciacaoField = document.querySelector("#indiceDepreciacao-" + id).innerHTML;
    let valorCompraField = document.querySelector("#valorCompra-" + id).innerHTML;
    let valorAtualField = document.querySelector("#valorAtual-" + id).innerHTML;
    let dataCompraField = document.querySelector("#dataCompra-" + id).innerHTML;
    let dataSaidaField = document.querySelector("#dataSaida-" + id).innerHTML;
    let dataRetornoField = document.querySelector("#dataRetorno-" + id).innerHTML;
    let dataBaixaField = document.querySelector("#dataBaixa-" + id).innerHTML;

    if (nomeField !== NA && nomeField !== "")
        patrimonio.nome = nomeField;
    if (tipoField !== NA && tipoField !== "")
        patrimonio.tipo = tipoField;
    if (finalidadeField !== NA && finalidadeField !== "")
        patrimonio.finalidade = finalidadeField;
    if (statusField !== NA && statusField !== "")
        patrimonio.status = statusField;
    if (indiceDepreciacaoField !== NA && indiceDepreciacaoField !== "")
        patrimonio.indiceDepreciacao = indiceDepreciacaoField;
    if (valorCompraField !== NA && valorCompraField !== "")
        patrimonio.valorCompra = valorCompraField;
    finalidadeField
        patrimonio.valorAtual = valorAtualField;

    if (dataCompraField !== NA && dataCompraField !== ""){
        data = dataCompraField.split("-");
        patrimonio.dataCompra = new Date(parseInt(data[0]), parseInt(data[1]) - 1, parseInt(data[2]));
    }
    if (dataSaidaField !== NA && dataSaidaField !== ""){
        data = dataSaidaField.split("-");
        patrimonio.dataSaida = new Date(parseInt(data[0]), parseInt(data[1]) - 1, parseInt(data[2]));
    }
    if (dataRetornoField !== NA && dataRetornoField !== ""){
        data = dataRetornoField.split("-");
        patrimonio.dataRetorno = new Date(parseInt(data[0]), parseInt(data[1]) - 1, parseInt(data[2]));
    }
    if (dataBaixaField !== NA && dataBaixaField !== ""){
        data = dataBaixaField.split("-");
        patrimonio.dataBaixa = new Date(parseInt(data[0]), parseInt(data[1]) - 1, parseInt(data[2]));
    }   
    if (dataSaidaField !== NA && dataSaidaField !== ""){
        data = dataSaidaField.split("-");
        patrimonio.dataSaida = new Date(parseInt(data[0]), parseInt(data[1]) - 1, parseInt(data[2]));
    }

    return patrimonio;
}

function setupPatrimonioEdit(id){

    patrimonio = getPatrimonioFromTable(id);
    insertPatrimonioIntoModal(patrimonio);
    currentPatrimonioBeingEdited = id;
    showModal('editar');
}

/**
 * Insere os dados do objeto Patrimonio na Div Modal
 * @param {Patrimonio} patrimonio
 * @author Mei
 */
function insertPatrimonioIntoModal(patrimonio = new Patrimonio()){

    document.querySelector("#form [name='nomeInput']").value = patrimonio.nome;
    document.querySelector("#form [name='tipoInput']").value = patrimonio.tipo;
    document.querySelector("#form [name='finalidadeInput']").value = patrimonio.finalidade;
    document.querySelector("#form [name='indiceDepreciacaoInput']").value = patrimonio.indiceDepreciacao;
    document.querySelector("#form [name='valorCompraInput']").value = patrimonio.valorCompra;
    if(patrimonio.dataCompra !== null)
        document.querySelector("#form [name='dataCompraInput']").value = patrimonio.dataCompra
            .toISOString().slice(0,10).replace("/-/g","");
    else
        document.querySelector("#form [name='dataCompraInput']").value = null;

}

/**
 * Limpa a Modal Formulário
 */
function clearMainModal(){

    document.querySelector("#form [name='nomeInput']").value = null;
    document.querySelector("#form [name='tipoInput']").value = "MAQUINA";
    document.querySelector("#form [name='finalidadeInput']").value = null;
    document.querySelector("#form [name='indiceDepreciacaoInput']").value = null;
    document.querySelector("#form [name='valorCompraInput']").value = null;
    document.querySelector("#form [name='dataCompraInput']").value = null;

}

// --- EVENT LISTENERS ---

addPatrimonioButton.addEventListener("click", () => {showModal('compra')});
entradaOptionButton.addEventListener("click", () => {showEditOptions('entrada')})
saidaOptionButton.addEventListener("click", () => {showEditOptions('saida')})
cancelarModalButton.addEventListener("click", hideModal)

function updateDynamicEventListeners() {

    deleteButton = document.querySelectorAll("[id|=delete]");
    editButton = document.querySelectorAll("[id|=edit]");

    let id = parseInt(deleteButton[deleteButton.length - 1].id.slice(7));
    deleteButton[deleteButton.length - 1].addEventListener("click", () => {deletePatrimonio(id)});

    id = parseInt(editButton[editButton.length - 1].id.slice(5));
    editButton[editButton.length - 1].addEventListener("click", () => {setupPatrimonioEdit(id)});
}