var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});


function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras  = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);

}


function inicializaContadores() {
    campo.on("input",function(){
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}


function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function() {
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}   


function finalizaJogo() {
	campo.toggleClass("campo-desativado");
    campo.attr("disabled", true);
    inserePlacar();
}


function inicializaMarcadores() {
    var frase = $(".frase").text();
    
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0 , digitado.length);
        
        if(digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
    
}


function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Sidcley";
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario,numPalavras);
    
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);
}

function removeLinha(){
    $(this).parent().parent().remove();
}

function novaLinha(usuario,palavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href","#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    // Icone dentro do <a>
    link.append(icone);

    // <a> dentro do <td>
    colunaRemover.append(link);

    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
    
    return linha;
}
	
	function reiniciaJogo(){
	    campo.attr("disabled",false);
	    campo.val("");
	    $("#contador-palavras").text("0");
	    $("#contador-caracteres").text("0");
	    $("#tempo-digitacao").text(tempoInicial);
	    inicializaCronometro();
	    campo.toggleClass("campo-desativado");
	    campo.removeClass("borda-vermelha"); //novo
	    campo.removeClass("borda-verde")
	
	}
