let listaNumerosSorteados = [];
let tentativas = 1;
let numeroLimite = 10;

//definir campos
function definirCampos(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1});
}

function exibirMensagemInicial(){
    definirCampos("h1", "Jogo do número secreto");
    
    definirCampos("p", "Escolha um número entre 1 e "+numeroLimite);
}
exibirMensagemInicial()



//gerar número aleatório
let numeroSecreto = gerarNumero()
function gerarNumero() {
    let numeroGerado = parseInt(Math.random()*numeroLimite+1);
    let quantidadeLista = listaNumerosSorteados.length;
    if (quantidadeLista==numeroLimite){
        listaNumerosSorteados=[];
    }
    
    if(listaNumerosSorteados.includes(numeroGerado)){
        return gerarNumero();
    } else{
        listaNumerosSorteados.push(numeroGerado);
        return numeroGerado;
       }
}


//verificar os valores
function verificarChute() {
    let chute = document.querySelector("input").value;
    console.log(numeroSecreto);
    console.log(chute==numeroSecreto);
    limparCampo();
        
    //acerto
    if(numeroSecreto==chute){
        definirCampos("h1", "Parabéns!");
        let palavraTentativa =  tentativas > 1? "tentativas" : "tentativa";
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}!`;
        definirCampos("p", mensagemTentativas);
        console.log(listaNumerosSorteados);

    //habilitar botão novo jogo    
    document.getElementById("reiniciar").removeAttribute("disabled");

    //erro
    } else {
       if(chute>numeroSecreto){
        definirCampos("p", "O numero secreto é menor");
       }else{
        definirCampos("p", "O numero secreto é maior");
       }
       tentativas++;
       limparCampo();
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto=gerarNumero();
    limparCampo();
    tentativas=1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled",true);
}