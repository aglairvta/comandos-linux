let questoes = [];
let indiceAtual = 0;

const elementoPergunta = document.getElementById("pergunta");
const elementoResposta = document.getElementById("resposta");
const elementoProgresso = document.getElementById("progresso");
const botaoEnviar = document.getElementById("botao-enviar");

fetch('perguntas.json')
  .then(resposta => resposta.json())
  .then(dados => {
    questoes = dados;
    elementoResposta.disabled = false;
    botaoEnviar.disabled = false;
    carregarPergunta();
  })
  .catch(erro => {
    elementoProgresso.textContent = "Erro ao carregar as perguntas.";
    console.error(erro);
  });

function carregarPergunta() {
  if (indiceAtual >= questoes.length) {
    elementoPergunta.textContent = "Parabéns! Você praticou os comandos Linux.";
    elementoProgresso.textContent = "";
    elementoResposta.style.display = "none";
    botaoEnviar.style.display = "none";
    return;
  }

  const questaoAtual = questoes[indiceAtual];
  elementoPergunta.textContent = questaoAtual.pergunta;
  elementoProgresso.textContent = `${indiceAtual + 1}/${questoes.length}`;
  elementoResposta.value = "";
  elementoResposta.focus();
}

function verificarResposta() {
  const respostaUsuario = elementoResposta.value.trim().toLowerCase();
  const respostaCorreta = questoes[indiceAtual].resposta.toLowerCase();

  if (respostaUsuario === respostaCorreta && respostaUsuario !== "") {
    dispararConfete(botaoEnviar); 
    indiceAtual++;
    carregarPergunta();
  } else {
    elementoResposta.classList.add("input-erro");
  
    setTimeout(() => {
      elementoResposta.classList.remove("input-erro");
    }, 300);

    elementoResposta.focus();
  }
}

botaoEnviar.addEventListener("click", verificarResposta);

elementoResposta.addEventListener("keydown", function(evento) {
  if (evento.key === "Enter") {
    verificarResposta();
  }
});