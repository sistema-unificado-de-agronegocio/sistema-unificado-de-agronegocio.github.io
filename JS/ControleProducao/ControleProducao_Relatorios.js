var divModalEl = document.querySelector("#divModal");
var divMascaraEl = document.querySelector("#divMascara");
var divModalInsumo = document.querySelector('#divModalInsumo');
var divModalInsumo2 = document.querySelector('#divModalInsumo2');
var divModalCerteza = document.querySelector('#divModalCerteza');
var divModalCerteza2 = document.querySelector('#divModalCerteza2');
var divModalEditarProduto = document.querySelector('#divModalEditarProduto');
var divModalEditarInsumo2 = document.querySelector('#divModalEditarInsumo2');
var divModalEditarInsumo = document.querySelector('#divModalEditarInsumo');
var divModalEditarInsumo2 = document.querySelector('#divModalEditarInsumo2');
var divModalAvisos = document.querySelector('#divModalAvisos');
var divModalAvisos2 = document.querySelector('#divModalAvisos2');
var modalRelatorioHistoricoEl = document.querySelector("#modalRelatorioHistorico");
var modalRelatorioProducaoEl = document.querySelector("#modalRelatorioProducao");
var btnCriaRelatorioEl = document.querySelector("#btnCriaRelatorio");
var btnFechaModalEl = document.querySelector("#btnFechaModal");
var btnRelatorioHistoricoEl = document.querySelector("#btnRelatorioHistorico");
var btnVoltaRelatorioHEl = document.querySelector("#btnVoltaRelatorioH");
var btnFechaRelatorioHEl = document.querySelector("#btnFechaRelatorioH");
var btnRelatorioProducaoEl = document.querySelector("#btnRelatorioProducao");
var btnVoltaRelatorioPEl = document.querySelector("#btnVoltaRelatorioP");
var btnFechaRelatorioPEl = document.querySelector("#btnFechaRelatorioP");
var btnAbrirModalInsumo = document.querySelector('#btnAbrirModalInsumo');
var btnFecharModalInsumo = document.querySelector('#btnFecharModalInsumo');
var btnLimparModalInsumo = document.querySelector('#btnLimparModalInsumo');
var btnSimModalCerteza = document.querySelector('#btnSimModalCerteza');
var btnNaoModalCerteza = document.querySelector('#btnNaoModalCerteza');
var btnCancelaEditarProduto = document.querySelector('#btnCancelaEditarProduto');
var btnConfirmarEditarProduto = document.querySelector('#btnConfirmarEditarProduto');
var btnCancelarEditarInsumo = document.querySelector('#btnCancelarEditarInsumo');
var btnConfirmarEditarInsumo = document.querySelector('#btnConfirmarEditarInsumo');
var selFiltroP = document.getElementById('selFiltroP');
var selFiltroI = document.getElementById('selFiltroI');
var tabelaLeite = document.getElementById('tabelaRelLeite');
var tabelaCafeA= document.getElementById('tabelaRelCafeA');
var tabelaCafeB = document.getElementById('tabelaRelCafeB');
var tabelaCafeR = document.getElementById('tabelaRelCafeR');




btnCriaRelatorioEl.addEventListener( 'click' , mostraDivModal );
btnFechaModalEl.addEventListener( 'click' ,  mostraDivModal );
btnRelatorioHistoricoEl.addEventListener( 'click' , mostraRelatorioHistorico );
btnVoltaRelatorioHEl.addEventListener( 'click' , mostraRelatorioHistorico );
btnFechaRelatorioHEl.addEventListener( 'click' , fechaRelatorioHistorico );
btnRelatorioProducaoEl.addEventListener( 'click' , mostraRelatorioProducao );
btnVoltaRelatorioPEl.addEventListener( 'click' , mostraRelatorioProducao );
btnFechaRelatorioPEl.addEventListener( 'click' , fechaRelatorioProducao );
btnAbrirModalInsumo.addEventListener( 'click' , abreInsumoModal );
btnFecharModalInsumo.addEventListener( 'click' , fechaInsumoModal );
btnLimparModalInsumo.addEventListener( 'click' , limpaInsumoModal );
btnSimModalCerteza.addEventListener( 'click' , funcaoModalCerteza );
btnNaoModalCerteza.addEventListener( 'click' , funcaoModalCerteza );
btnCancelaEditarProduto.addEventListener( 'click' , funcaoEditarProduto );
btnConfirmarEditarProduto.addEventListener( 'click' , funcaoEditarProduto );
btnCancelarEditarInsumo.addEventListener( 'click' , funcaoEditarInsumo );
btnConfirmarEditarInsumo.addEventListener( 'click' , funcaoEditarInsumo );
btnVoltaRelatorioHEl.addEventListener( 'click' , limpaRelatorio );
btnFechaRelatorioHEl.addEventListener( 'click' , limpaRelatorio );
btnVoltaRelatorioPEl.addEventListener( 'click' , limpaRelatorio );
btnFechaRelatorioPEl.addEventListener( 'click' , limpaRelatorio );
selFiltroP.addEventListener( 'change' , filtrarTabelas );
selFiltroI.addEventListener( 'change' , filtrarTabelas );




function mostraDivModal() {
  divModalEl.classList.toggle("esconde");
  divModalEl.classList.toggle("posDivModal");
  divMascaraEl.classList.toggle("ocultar");
}

function mostraRelatorioHistorico() {
  divModalEl.classList.toggle("esconde");
  divModalEl.classList.toggle("posDivModal");
  modalRelatorioHistoricoEl.classList.toggle("esconde");
  modalRelatorioHistoricoEl.classList.toggle("posDivModal");
}

function fechaRelatorioHistorico() {
  modalRelatorioHistoricoEl.classList.toggle("esconde");
  modalRelatorioHistoricoEl.classList.toggle("posDivModal");
  divMascaraEl.classList.toggle("ocultar");
}

function mostraRelatorioProducao() {
  divModalEl.classList.toggle("esconde");
  divModalEl.classList.toggle("posDivModal");
  modalRelatorioProducaoEl.classList.toggle("esconde");
  modalRelatorioProducaoEl.classList.toggle("posDivModal");
}

function fechaRelatorioProducao() {
  modalRelatorioProducaoEl.classList.toggle("esconde");
  modalRelatorioProducaoEl.classList.toggle("posDivModal");
  divMascaraEl.classList.toggle("ocultar");
}

function abreInsumoModal() {
  divModalInsumo.classList.remove("esconde");
  divMascaraEl.classList.remove("ocultar");
}

function fechaInsumoModal() {
  divModalInsumo.classList.add("esconde");
  divMascaraEl.classList.add("ocultar");
}

function limpaInsumoModal() {
  var inputs = document.querySelectorAll('input');
  for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].clientHeight > 0) {
          inputs[i].value = "";
      }
  }
}

function funcaoModalCerteza() {
  divModalCerteza.classList.add("esconde");
  divMascaraEl.classList.add("ocultar");
}

function funcaoEditarProduto(e) {
if (e) {
  if (e.target.id == "btnCancelaEditarProduto") {
    divModalEditarProduto.classList.add("esconde");
    divMascaraEl.classList.add("ocultar");
  }else {
    if (checarInputs()) {
      divModalEditarProduto.classList.add("esconde");
      divMascaraEl.classList.add("ocultar");
    }
  }
} else {
    if (checarInputs()) {
      divModalEditarProduto.classList.add("esconde");
      divMascaraEl.classList.add("ocultar");
      return true;
    }else {
      return false;
    }
  }
}

function funcaoEditarInsumo(e){
if (e) {
  if (e.target.id == "btnCancelarEditarInsumo") {
    divModalEditarInsumo.classList.add("esconde");
    divMascaraEl.classList.add("ocultar");
  }else {
    if (checarInputs()) {
      divModalEditarInsumo.classList.add("esconde");
      divMascaraEl.classList.add("ocultar");
    }
  }
} else {
    if (checarInputs()) {
      divModalEditarInsumo.classList.add("esconde");
      divMascaraEl.classList.add("ocultar");
      return true;
    }else {
      return false;
    }
  }
}


function limpaRelatorio(){
  var aux = tabelaLeite.innerHTML.slice(0, tabelaLeite.innerHTML.indexOf("<tbody>"));
  aux += "<tbody>" +
       "<tr>" +
       "</tr>" +
       "</tbody>"
  tabelaLeite.innerHTML = aux;
  var aux = tabelaCafeA.innerHTML.slice(0, tabelaCafeA.innerHTML.indexOf("<tbody>"));
  aux += "<tbody>" +
       "<tr>" +
       "</tr>" +
       "</tbody>"
  tabelaCafeA.innerHTML = aux;
  var aux = tabelaCafeB.innerHTML.slice(0, tabelaCafeB.innerHTML.indexOf("<tbody>"));
  aux += "<tbody>" +
       "<tr>" +
       "</tr>" +
       "</tbody>"
  tabelaCafeB.innerHTML = aux;
  var aux = tabelaCafeR.innerHTML.slice(0, tabelaCafeR.innerHTML.indexOf("<tbody>"));
  aux += "<tbody>" +
       "<tr>" +
       "</tr>" +
       "</tbody>"
  tabelaCafeR.innerHTML = aux;
  var aux = tabelaInsumo.innerHTML.slice(0, tabelaInsumo.innerHTML.indexOf("<tbody>"));
  aux += "<tbody>" +
       "<tr>" +
       "</tr>" +
       "</tbody>"
  tabelaInsumo.innerHTML = aux;
}

function filtrarTabelas(e) {
  if (e.target.id == "selFiltroP") {
    var url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=filtro&tipo=produto&id=" + e.target.value;
    Request.get(url)
    .then(function(res) {
    console.log(res);
     criaTabela(res, "produto");
     avisos("SUCESSO");
    })
    .catch(function(erro){
      avisos("FALHA");
    });
  }else {
    var url = "http://localhost:8080/StayGreen/ControleProducaoServlet?operacao=filtro&tipo=insumo&id=" + e.target.value;
    Request.get(url)
    .then(function(res) {
     criaTabela(res, "insumo");
     avisos("SUCESSO");
    })
    .catch(function(erro){
      avisos("FALHA");
    });
  }
}

/**
 * @author Diego Demétrio e Mei Fagundes
 * Abre uma janela para impressão dos relatórios
 * @param relatorio 
 */
document.querySelector("#btnPrintProducao").onclick = printRelatorio("producao");
document.querySelector("#btnPrintPeriodo").onclick = printRelatorio("periodo");

function printRelatorio(relatorio) {
    let aux;
    let content;
    if(relatorio == "periodo"){
      content = document.querySelector("#tabelaRelLeite").outerHTML +
                document.querySelector("#tabelaRelCafeR").outerHTML +
                document.querySelector("#tabelaRelCafeB").outerHTML +
                document.querySelector("#tabelaRelCafeA").outerHTML;
    }
    else if(relatorio == "producao"){
      content = document.querySelector("#modalRelatorioProducao").cloneNode(true);
      aux = content.firstElementChild;
      content.innerHTML = aux.outerHTML;
      content = content.outerHTML;
    }

    let printWindow = window.open('', 'Print', 'height=768,width=1024');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<link rel="stylesheet" type="text/css" href="CSS/ControleProducao/ControleProducao_estilo.css"/>');
    printWindow.document.write('</head><body onafterprint="self.close()">');
    printWindow.document.write(content);
    printWindow.document.write('<script type="text/javascript">' + 'window.onload = () => { setTimeout(() => { window.print(); window.close(); }, 2000) };' + '</script>');
    printWindow.document.write('</body></html>');

    printWindow.document.close();
    printWindow.focus();
}
