// Window para onload da página 

window.onload = function() {

    revisaoDate();
    maskMoney();
    maskPercent();
    idSeq();

    usuario('solicitante');
    testProcess();

};

// API - CEP AUTOMÁTICO

//#region API

$("#cep").blur(function(blur) {
    
    const paisAuto = "Brasil";
    const cadastroCEP = document.getElementById("pais");

    cadastroCEP.value = paisAuto;

    $.getJSON("//viacep.com.br/ws/"+ $("#cep").val() +"/json/", function(dados){  
        $("#endereco").val(dados.logradouro);
        $("#bairro").val(dados.bairro);
        $("#estado").val(dados.localidade);2
    })
});


// GERADOR DE ID

//#region onload
function idSeq() {

    var dsCadastro = DatasetFactory.getDataset("DSFormulariodeCadastrodeCliente-Patrocinador", null, null, null);

    var linha = dsCadastro.values.length;

    var inputCP = document.getElementById("idCP");

    inputCP.value = "CP-" + (linha + 1);
    
};

//#endregion

// TABELAS
//#region Funtion

var idClick = 0;
var ClickAdd1 = 0;
var ClickAdd2 = 0;
var ClickAdd3 = 0;
var idAll;
var idOAll;



//Produtos e Serviços
var clickItem = 0;

function pushItem() {

    clickItem++;

    // -------------- Add Coluna ----------------------------------------------
    wdkAddChild('tb_subitem');

    // -------------- Add Estudo Automático -----------------------------------
    var estudo = $("#estudoPS").val();
    $("#tb_responsavel___" + clickItem).val(estudo);

     // -------------- Número de Linhas + Número do Subitem -------------------
    var rowCount = $('#tb_subitem tr').length;
    var n = rowCount - 2;
    $("#tb_n___" + clickItem).val(n)

    // --------------- Código do Documento ------------------------------------
    var cod_doc = $("#codP").val();
    $("#tb_doc___" + clickItem).val(cod_doc);

    // --------------- Evento de Excluir Linha --------------------------------
    $(".excluir").bind("click", Excluir);

}

//#region Cliente/Patrocinador

function pushAdd1() {

    wdkAddChild('tabelaAddComercial');

    ClickAdd1++; 

    var inputnomeAdd1 = $("#nomeAdd1").val();
    var inputdepartamentoAdd1 = $("#departamentoAdd1").val();
    var inputcelularAdd1 = $("#celularAdd1").val();
    var inputtelefoneAdd1 = $("#telefoneAdd1").val();
    var inputemailAdd1 = $("#emailAdd1").val();

    $("#tb_nomeAdd1___"+ClickAdd1).val(inputnomeAdd1);
    $("#tb_departamentoAdd1___"+ClickAdd1).val(inputdepartamentoAdd1);
    $("#tb_celularAdd1___"+ClickAdd1).val(inputcelularAdd1);
    $("#tb_telefoneAdd1___"+ClickAdd1).val(inputtelefoneAdd1);
    $("#tb_emailAdd1___"+ClickAdd1).val(inputemailAdd1);

    $("#nomeAdd1").val("");
    $("#departamentoAdd1").val("");
    $("#celularAdd1").val("");
    $("#telefoneAdd1").val("");
    $("#emailAdd1").val("");

    $(".excluir").bind("click", Excluir);

};

function pushAdd2() {

    wdkAddChild('tabelaAddFinanceiro');

    ClickAdd2++; 

    var inputnomeAdd2 = $("#nomeAdd2").val();
    var inputdepartamentoAdd2 = $("#departamentoAdd2").val();
    var inputcelularAdd2 = $("#celularAdd2").val();
    var inputtelefoneAdd2 = $("#telefoneAdd2").val();
    var inputemailAdd2 = $("#emailAdd2").val();

    $("#tb_nomeAdd2___"+ClickAdd2).val(inputnomeAdd2);
    $("#tb_departamentoAdd2___"+ClickAdd2).val(inputdepartamentoAdd2);
    $("#tb_celularAdd2___"+ClickAdd2).val(inputcelularAdd2);
    $("#tb_telefoneAdd2___"+ClickAdd2).val(inputtelefoneAdd2);
    $("#tb_emailAdd2___"+ClickAdd2).val(inputemailAdd2);

    $("#nomeAdd2").val("");
    $("#departamentoAdd2").val("");
    $("#celularAdd2").val("");
    $("#telefoneAdd2").val("");
    $("#emailAdd2").val("");

    $(".excluir").bind("click", Excluir);

};

function pushAdd3() {

    wdkAddChild('tabelaAddAdicional');

    ClickAdd3++; 

    var inputnomeAdd3 = $("#nomeAdd3").val();
    var inputdepartamentoAdd3 = $("#departamentoAdd3").val();
    var inputcelularAdd3 = $("#celularAdd3").val();
    var inputtelefoneAdd3= $("#telefoneAdd3").val();
    var inputemailAdd3 = $("#emailAdd3").val();

        
    $("#tb_nomeAdd3___"+ClickAdd3).val(inputnomeAdd3);
    $("#tb_departamentoAdd3___"+ClickAdd3).val(inputdepartamentoAdd3);
    $("#tb_celularAdd3___"+ClickAdd3).val(inputcelularAdd3);
    $("#tb_telefoneAdd3___"+ClickAdd3).val(inputtelefoneAdd3);
    $("#tb_emailAdd3___"+ClickAdd3).val(inputemailAdd3);
    

    $("#nomeAdd3").val("");
    $("#departamentoAdd3").val("");
    $("#celularAdd3").val("");
    $("#telefoneAdd3").val("");
    $("#emailAdd3").val("");

    $(".excluir").bind("click", Excluir);

};

//#endregion

function Excluir(){

    var par = $(this).parent().parent(); //tr

    par.remove();

    allValues();
};

//#endregion




// Zoom codClientP

$(document).on('change', "#codClientP",
    function inputValueIsNull() {

       //Condição de Busca
        var zoom = document.getElementById("codClientP");
        var zoomValue = zoom.value;

        //Filtro de Busca 
        var codConstraint = DatasetFactory.createConstraint("idCP", zoomValue, zoomValue, ConstraintType.SHOULD);
        var arrayConstraint = new Array(codConstraint);

        // Busca no Dataset + Condições de Filtro
        var array = DatasetFactory.getDataset("DSCadastroGeral", null, arrayConstraint, null);

        //Valores para integração ao campos
        var fantasia = array.values[0].nomeFantasia

        $("#client").val(fantasia);

    });

//#endregion

//REVISÃO DE DOCUMENTO E DATA
function revisaoDate() {

    //Tratamento de data
    var data = new Date();

    var nProcesso = getWKNumState();
    
    var dia = data.getDate();     // 1-31
    var mes = data.getMonth();    // 0-11 (zero=janeiro)
    var ano = data.getFullYear(); // 4 dígitos

    if ((mes + 1) <= 9) {

        if (dia <= 9) {
            var date_comp = ('0' + dia + "/" + '0' + (mes + 1) + "/" + ano);
        }

        else {
            var date_comp = (dia + "/" + '0' + (mes + 1) + "/" + ano);
        }
    }

    else if (dia <= 9) {
        var date_comp = ('0' + dia + "/" + (mes + 1) + "/" + ano);
    }

    else {
        var date_comp = (dia + "/" + (mes + 1) + "/" + ano);
    }

    //Registro das informações	

    var revAnterior =  parseInt($("#dateRevisao").val());

    if (nProcesso == 0) {

        $("#dataCadastro").val(date_comp);

    }

    $("#revisao").val(revAnterior + 1);
    $("#dateRevisao").val(date_comp); 

    return date_comp;

};

//MÁSCARAS

function maskMoney() {

    //Dinheiro
    var tOrcamento = $("#tOrcamento");
    tOrcamento.mask('#.##0.00#.##0,00', {reverse: true});

    var rItem = $("#rItem");
    rItem.mask('#.##0.00#.##0,00', {reverse: true});

    var orcamentoDesconto = $("#orcamentoDesconto");
    orcamentoDesconto.mask('#.##0.00#.##0,00', {reverse: true});

    var pVenda = $('#pVenda');
    pVenda.mask('#.##0.00#.##0,00', {reverse: true});

    var pCusto = $('#pCusto');
    pCusto.mask('#.##0.00#.##0,00', {reverse: true});

    //CEP
    var cep = $('#cep');
    cep.mask('00000-000', {reverse: true});

};

function maskPercent() {

    var desconto = $("#desconto");
    desconto.mask('000,00', {reverse: true});

};

//Busca e inserção de Subitens
var times = 0;
var rowPrevious = 0;

function eventFire(el, etype){
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
};

var nFirst = 0;
var nLast = 0;
var nVariavel = 0;

function safety() {

    // Obtém a data/hora atual
    var data = new Date();

    var dia = data.getDate();           // 1-31
    var mes = data.getMonth();          // 0-11 (zero=janeiro)
    var ano4 = data.getFullYear();      // 4 dígitos

    var str_data = dia + '/' + (mes+1) + '/' + ano4;

    $('#safety2').val(str_data);

    $('#safety').val(getWKUser());

}


//USUÁRIO RESPONSÁVEL
function usuario(id) {

    var user = getWKUser();

    var c1 = DatasetFactory.createConstraint("login", user, user, ConstraintType.MUST);

    var constraints = new Array(c1);

    var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);

    $('#'+id).val(dataset.values[0].colleagueName);
     
        
};

function btnCpf() {

    $('#div_cpf').removeClass();
    $('#div_cnpj').removeClass();
    
    $('#div_cpf').addClass('form-group col-md-6');
    $('#div_cnpj').addClass('form-group col-md-6 nav-close');
    

};

function btnCnpj() {

    $('#div_cpf').removeClass();
    $('#div_cnpj').removeClass();
    
    $('#div_cpf').addClass('form-group col-md-6 nav-close');
    $('#div_cnpj').addClass('form-group col-md-6');

};

function validarDoc(value, id) {

    var valid = 0;
    var dataset = DatasetFactory.getDataset("DSFormulariodeCadastrodeCliente-Patrocinador", null, null, null);

    for (var i = 0; i < dataset.values.length; i++) {

        if (id == 0) {
            if (dataset.values[i].cnpj == value) {
                valid++;
            }
        }
        else {
            if (dataset.values[i].cpf == value) {
                valid++;
            }
        }
    }

    return valid;
};

$(document).on('change', "#cnpj",
    function validCnpj() {
       
        var inputCnpj = $('#cnpj').val();
        
        var valid = validarDoc(inputCnpj, 0);

        if (valid > 0) {
            $('#cnpj').removeClass();
            $('#p_cnpj').removeClass('nav-close');
            $('#label_cnpj').removeClass();

            $('#cnpj').addClass('form-control doc-error');
            $('#label_cnpj').addClass('doc-error');

            $('#validCnpj').removeClass('nav-close');
            $('#validCnpj').addClass('bannerStage1');

            setTimeout(function(){
                $('#validCnpj').removeClass('bannerStage1');
                $('#validCnpj').addClass('bannerStage2');
                    setTimeout(function(){
                    $('#validCnpj').addClass('nav-close');
                    $('#validCnpj').removeClass('bannerStage2');
                }, 2000);
            }, 5000);

        }
        else {

            $('#cnpj').removeClass();
            $('#label_cnpj').removeClass(); 

            $('#p_cnpj').addClass('nav-close');
            $('#cnpj').addClass('form-control');

        }
    }
);

$(document).on('change', "#cpf",
    function validCpf() {
       
        var inputCpf = $('#cpf').val();
        
        var valid = validarDoc(inputCpf, 1);

        if (valid > 0) {
            $('#cpf').removeClass();
            $('#p_cpf').removeClass('nav-close');
            $('#label_cpf').removeClass();

            $('#cpf').addClass('form-control doc-error');
            $('#label_cpf').addClass('doc-error');

            $('#validCpf').removeClass('nav-close');
            $('#validCpf').addClass('bannerStage1');

            setTimeout(function(){
                $('#validCpf').removeClass('bannerStage1');
                $('#validCpf').addClass('bannerStage2');
                setTimeout(function(){
                    $('#validCpf').addClass('nav-close');
                    $('#validCpf').removeClass('bannerStage2');
                }, 2000);
            }, 5000);
        }
        else {

            $('#cpf').removeClass();
            $('#label_cpf').removeClass(); 

            $('#p_cpf').addClass('nav-close');
            $('#cpf').addClass('form-control');

        }
    }
);

$(document).on('change', "#nomeFantasia",
    function descFormId() {
		
		var name = $('#nomeFantasia').val();
		var dataset = DatasetFactory.getDataset("processAttachment", null, null, null);
		var nRow = dataset.values.length;
	
		var nProcess = dataset.values[nRow-1]['processAttachmentPK.processInstanceId'];
	
		$('#descForm').val(nProcess+1+' - '+name);
		
    }
);