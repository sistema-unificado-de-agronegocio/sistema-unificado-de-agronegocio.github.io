let mainEl = document.querySelector("main");
let divBotoesEl = document.querySelector("main > .div-botoes");
let mascaraEl = document.querySelector("#mascara");
let botaoEncaEl = document.querySelector("#botaoEnc");
let botaoFatuEl = document.querySelector("#botaoFat");
let botaoResulEl = document.querySelector("#botaoRes");
let botaoRegistraEl = document.querySelector("#botaoRegistra");
let divEncaEl = document.querySelector("#div-encaminhamentos");
let divFatuEl = document.querySelector("#div-faturamentos");
let divResulEl = document.querySelector("#div-resultados");
let divRegistraEl = document.querySelector("#div-registra");
let botaoConfirmaEl = document.querySelector("#div-registra > .div-botoes > button:first-of-type");
let botaoCancelaEl = document.querySelector("#div-registra > .div-botoes > button:last-of-type");
let arrayProdutos = new Array();
let botaoRegiaoEl = document.querySelector('#regiaoFrete');
let BotaoFreteEl = document.querySelector('#valorFrete');

window.onload = function recebeJSON() {
	Request.get('http://localhost:8080/StayGreen/ProdutosVendaServlet')
		.then(resposta => {
			resposta.forEach(addArrayProdutos);
			addProdutosPagina(arrayProdutos);
		});
}

/**
 * Insere os produtos em um array
 * @param {Object} param0 objeto com informaçoes dos produtos
 * @author Vinícius
 */
function addArrayProdutos({ idProduto: id, nomeProduto: nome, descrProduto: descricao, valorUnitProduto: preco, quantEstoqueProduto: estoque, fotoMercadoria: img }) {
	let produto = {
		nome: "",
		descricao: "",
		preco: 0,
		estoque: 0,
		img: ""
	};
	produto.nome = nome;
	produto.id = id;
	produto.descricao = descricao;
	produto.preco = preco;
	produto.estoque = estoque;
	produto.img = img;
	arrayProdutos.push(produto);
	console.log(arrayProdutos);
}

/**
 * Insere os produtos do array na tela
 * @param {Array} produtos array de produtos
 * @author Vinícius
 */
function addProdutosPagina(produtos) {

	let tabela = document.createElement("table");

	let thead = document.createElement("thead");
	thead.innerHTML = "<th>ID</th> <th>Nome</th> <th>Preço</th> <th>Estoque</th>";
	tabela.appendChild(thead);

	let tbody = document.createElement("tbody");
	for (let produto of produtos) {
		let tr = document.createElement("tr");
		tr.innerHTML = "<td>" + produto.id + "</td> " + "<td>" + produto.nome + "</td> " +
			"<td>R$ " + produto.preco + "</td> " + "<td>" + produto.estoque + " unidades</td> ";
		tbody.appendChild(tr);
	}
	tabela.appendChild(tbody);
	mainEl.insertBefore(tabela, divBotoesEl);
}

/**
 * Mostra a modal correspondente o relatorio de encaminhamentos
 * @author Vinícius
 */
function mostraEncaminhamentos() {
	mascaraEl.classList.add("aparece");
	divEncaEl.classList.add("aparece");
	divFatuEl.classList.remove("aparece");
	divResulEl.classList.remove("aparece");
	divRegistraEl.classList.remove("aparece");
}

/**
 * Mostra a modal correspondente o relatorio de faturametos
 * @author Vinicius
 */
function mostraFaturamentos() {
	mascaraEl.classList.add("aparece");
	divEncaEl.classList.remove("aparece");
	divFatuEl.classList.add("aparece");
	divResulEl.classList.remove("aparece");
	divRegistraEl.classList.remove("aparece");
}

/**
 * Mostra a modal correspondente o relatorio de faturametos 
 * @author Vinicius
 */
function mostraResultados() {
	mascaraEl.classList.add("aparece");
	divEncaEl.classList.remove("aparece");
	divFatuEl.classList.remove("aparece");
	divResulEl.classList.add("aparece");
	divRegistraEl.classList.remove("aparece");
}

/**
 * Mostra a modal correspondente a venda 
 * @author Vinicius
 */
function mostraRegistra() {
	mascaraEl.classList.add("aparece");
	divEncaEl.classList.remove("aparece");
	divFatuEl.classList.remove("aparece");
	divResulEl.classList.remove("aparece");
	divRegistraEl.classList.add("aparece");
}

/**
 * 
 */
function escondeTudo() {
	mascaraEl.classList.remove("aparece");
	divEncaEl.classList.remove("aparece");
	divFatuEl.classList.remove("aparece");
	divResulEl.classList.remove("aparece");
	divRegistraEl.classList.remove("aparece");
}


function confirmaRegistraProduto() {
	divRegistraEl.classList.remove("aparece");
	mascaraEl.classList.remove("aparece");
}


function cancelaRegistraProduto() {
	divRegistraEl.classList.remove("aparece");
	mascaraEl.classList.remove("aparece");
}

botaoRegistraEl.addEventListener('click', e => {
	mostraRegistra();
});
botaoEncaEl.addEventListener('click', w => {
	mostraEncaminhamentos();
	relatorioEncaminhamento()
});
botaoFatuEl.addEventListener('click', mostraFaturamentos);
botaoResulEl.addEventListener('click', mostraResultados);
mascaraEl.addEventListener('click', escondeTudo);
botaoCancelaEl.addEventListener('click', cancelaRegistraProduto);

let padrao = '#####-###';

let inputCep = divRegistraEl.querySelector("label:last-of-type > input");
inputCep.addEventListener('input', e => {
	let entrada = inputCep.value;
	if (isNaN(entrada[entrada.length - 1])) {
		entrada = entrada.replace(entrada.slice(entrada.length - 1), '');
	}

	let padraoIndex = 0, resultado = '';
	for (let i = 0; padraoIndex < padrao.length && i < entrada.length; i++ , padraoIndex++) {
		if (padrao[padraoIndex] != '#') {
			while (padrao[padraoIndex] != '#' && entrada[i] != padrao[padraoIndex] && padraoIndex != padrao.length - 1) {
				resultado += padrao[padraoIndex];
				padraoIndex++;
			}
		}
		resultado += entrada[i];
	}
	inputCep.value = resultado;
});

//compra é valor negativo
function relatorioResultados() {
	Request.get('http://localhost:8080/StayGreen/RelatorioResultadoServlet')
		.then(resposta => {
			if (resposta < 0)
				respostaMsg = "Produtor está tendo prejuízo";
			else if (resposta > 0)
				respostaMsg = "Produtor está tendo lucro";
			else
				respostaMsg = "Indiferente";

			if (tabelaAntiga = divResulEl.querySelector("table"))
				tabelaAntiga.remove();

			let tabela = document.createElement("table");

			let thead = document.createElement("thead");
			thead.innerHTML = "<th>Valor (Lucro/Prejuízo)</th> <th>Resultado</th>";
			tabela.appendChild(thead);

			let tbody = document.createElement("tbody");
			let tr = document.createElement("tr");
			tr.innerHTML = `<td>${resposta}</td> <td>${respostaMsg}</td>`;
			tbody.appendChild(tr);
			tabela.appendChild(tbody);
			divResulEl.append(tabela);

		});
}

function relatorioFaturamento() {
	Request.get('http://localhost:8080/StayGreen/RelatorioVendaServlet')
		.then(resposta => {
			if (tabelaAntiga = divFatuEl.querySelector("table"))
				tabelaAntiga.remove();

			let tabela = document.createElement("table");

			let thead = document.createElement("thead");
			thead.innerHTML = "<th>Produto</th> <th>Data</th> <th>Valor</th>";
			tabela.appendChild(thead);

			let tbody = document.createElement("tbody");
			resposta.forEach(res => {
				let { valor, nome, dia, mes, ano } = res;
				let tr = document.createElement("tr");
				tr.innerHTML = `<td>${nome}</td> <td>${dia}/${mes}/${ano}</td> <td>${valor}</td>`;
				tbody.appendChild(tr);
			});
			tabela.appendChild(tbody);
			divFatuEl.append(tabela);

		});
}

function relatorioEncaminhamento() {
	Request.get(`http://localhost:8080/StayGreen/VendasEncaminhamentosServlet`)
		.then(resposta => {
			console.table(resposta);
			if (tabelaAntiga = divEncaEl.querySelector("table"))
				tabelaAntiga.remove();

			let tabela = document.createElement("table");

			let thead = document.createElement("thead");
			thead.innerHTML = "<th>Cliente</th> <th>Data Transaçao</th> <th>Faltam para entrega(Dias)</th>";
			tabela.appendChild(thead);

			let tbody = document.createElement("tbody");
			resposta.forEach(res => {
				let { nome, dia, mes, ano, entregaMes, entregaDia, entregaAno } = res;

				//numeros de dias para o dia da entrega
				let falta = Math.round((new Date(entregaAno, entregaMes, entregaDia) - new Date()) / 8.64e+7);
				let tr = document.createElement("tr");
				tr.innerHTML = `<td>${nome}</td> <td>${dia}/${mes}/${ano}</td> <td>${falta > 0 ? falta : "Não"}</td>`;
				tbody.appendChild(tr);
			});
			tabela.appendChild(tbody);
			divEncaEl.append(tabela);
		});
}

/**
 * Muda o valor do frete
 * @author Guilherme da Silva
 */
function mudaValorFrete() {
	if (BotaoFreteEl.parentElement.childElementCount > 1) {
		BotaoFreteEl.parentElement.lastChild.remove();
	}
	if (parseInt(BotaoFreteEl.value) >= 0)
		Request.get('http://localhost:8080/StayGreen/VendasFretesServlet?regiao=' + botaoRegiaoEl.value + '&valorFrete=' + BotaoFreteEl.value);
	else {
		if (BotaoFreteEl.parentElement.childElementCount <= 1) {
			let span = document.createElement("span");
			span.innerHTML = " * insire um valor maior ou igua a zero * ";
			span.style.color = "red";
			BotaoFreteEl.parentElement.appendChild(span);
		}
	}
}

const modalVenda = document.getElementById('div-registra');
const idInput = modalVenda.querySelector('select[name=produto]');
const dataEntregaInput = modalVenda.querySelector('input[name=dataEntrega]');
const quantVendidaInput = modalVenda.querySelector('input[name=quant]');
const nomeInput = modalVenda.querySelector('input[name=nome]');
const modoPagamentoSelect = modalVenda.querySelector('select[name=modoPagamento]');
const regiaoSelect = modalVenda.querySelector('select[name=regiao]');
const enderecoInput = modalVenda.querySelector('input[name=endereco]');
const cepInput = modalVenda.querySelector('input[name=cep]');
const confirmaButton = modalVenda.querySelector('button[name=confirmaModal]');
const regexCEP = /(\d{5})-?(\d{3})/;

//Confirma venda
confirmaButton.addEventListener('click', e => {
	const produtoId = divRegistraEl.querySelector('select[name=produto]').value;
	const quantVendidaInput = divRegistraEl.querySelector('input[name=quant]');
	let cepExp = regexCEP.exec(cepInput.value);

	if (parseInt(quantVendidaInput.value) <= arrayProdutos[produtoId - 1].estoque &&
		parseInt(quantVendidaInput.value) > 0 &&
		dataEntregaInput.valueAsDate !== null && //data deve ser informada
		nomeInput.value != "" && //nome não pode ser vazio
		enderecoInput.value != "" &&//endereco não pode ser vazio
		cepExp != null) {//cep deve estar em formato válido) 

		fazVenda(
			new DataTransacao(dataEntregaInput.valueAsDate),
			new Venda(fretes[regiaoSelect.value],
				dataEntregaInput.valueAsDate),
			new Comprador(nomeInput.value,
				enderecoInput.value, cepExp[1] + cepExp[2],
				modoPagamentoSelect.value),
			new Transacao(idInput.value,
				arrayProdutos[idInput.value - 1].preco * quantVendidaInput.value,
				quantVendidaInput.value)
		);
		cepInput.value = null;
		dataEntregaInput.value = null;
		nomeInput.value = null;
		enderecoInput.value = null;
		confirmaRegistraProduto();

		if (quantVendidaInput.parentElement.childElementCount > 1) {
			quantVendidaInput.parentElement.lastChild.remove();
		}
		if (dataEntregaInput.parentElement.childElementCount > 1) {
			dataEntregaInput.parentElement.lastChild.remove();
		}
		if (nomeInput.parentElement.childElementCount > 1) {
			nomeInput.parentElement.lastChild.remove();
		}
		if (enderecoInput.parentElement.childElementCount > 1) {
			enderecoInput.parentElement.lastChild.remove();
		}
		if (cepInput.parentElement.childElementCount > 1) {
			cepInput.parentElement.lastChild.remove();
		}
	} else {
		/**
		 * @author Vinicius
		 */
		if (!(parseInt(quantVendidaInput.value) <= arrayProdutos[produtoId - 1].estoque &&
			parseInt(quantVendidaInput.value) > 0) &&
			quantVendidaInput.parentElement.childElementCount <= 1) {

			let span = document.createElement("span");
			span.innerHTML = " * quantidade inválida * ";
			span.style.color = "red";
			quantVendidaInput.parentElement.appendChild(span);
		} else if ((parseInt(quantVendidaInput.value) <= arrayProdutos[produtoId - 1].estoque &&
			parseInt(quantVendidaInput.value) > 0) &&
			quantVendidaInput.parentElement.childElementCount > 1) {

			quantVendidaInput.parentElement.lastChild.remove();
		}

		if (!(dataEntregaInput.valueAsDate !== null) && dataEntregaInput.parentElement.childElementCount <= 1) {
			let span = document.createElement("span");
			span.innerHTML = " * insira uma data * ";
			span.style.color = "red";
			dataEntregaInput.parentElement.appendChild(span);
		} else if ((dataEntregaInput.valueAsDate !== null) && dataEntregaInput.parentElement.childElementCount > 1) {
			dataEntregaInput.parentElement.lastChild.remove();
		}

		if (!(nomeInput.value != "") && nomeInput.parentElement.childElementCount <= 1) {
			let span = document.createElement("span");
			span.innerHTML = " * escreva seu nome * ";
			span.style.color = "red";
			nomeInput.parentElement.appendChild(span);
		} else if ((nomeInput.value != "") && nomeInput.parentElement.childElementCount > 1) {
			nomeInput.parentElement.lastChild.remove();
		}

		if (!(enderecoInput.value != "") && enderecoInput.parentElement.childElementCount <= 1) {
			let span = document.createElement("span");
			span.innerHTML = " * insira seu endereço * ";
			span.style.color = "red";
			enderecoInput.parentElement.appendChild(span);
		} else if ((enderecoInput.value != "") && enderecoInput.parentElement.childElementCount > 1) {
			enderecoInput.parentElement.lastChild.remove();
		}

		if (!(cepExp != null) && cepInput.parentElement.childElementCount <= 1) {
			let span = document.createElement("span");
			span.innerHTML = " * insire seu CEP * ";
			span.style.color = "red";
			cepInput.parentElement.appendChild(span);
		} else if ((cepExp != null) && cepInput.parentElement.childElementCount > 1) {
			cepInput.parentElement.lastChild.remove();
		}
	}
});

