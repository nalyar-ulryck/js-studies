function animacaoDeslocamento(elemento, duracao, destino) {
  return new Promise((resolve) => {
    let inicio = null;
    elemento.src = "img/1972257_bf1a5.gif";

    function passo(timestamp) {
      if (!inicio) inicio = timestamp;
      let progresso = timestamp - inicio;
      let posicao = Math.min((progresso / duracao) * destino, destino); // Move até o destino aleatório

      elemento.style.left = posicao + "px";

      if (progresso < duracao) {
        requestAnimationFrame(passo);
      } else {
        elemento.src = "img/image.png";
        resolve(); // Resolve a promise quando a animação terminar
      }
    }

    requestAnimationFrame(passo);
  });
}

const elementos = [
  document.getElementById("animar1"),
  document.getElementById("animar2"),
  document.getElementById("animar3"),
  document.getElementById("animar4"),
];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const velocidade = 500; // Define a velocidade em pixels por segundo

// Calcula a duração com base na distância e na velocidade
function calculaDuracao(distancia) {
  return (distancia / velocidade) * 1000; // Converte para milissegundos
}

// Executa as animações em sequência usando promises
const destinos = elementos.map(() => getRandomNumber(100, 900));
console.log(destinos);

animacaoDeslocamento(elementos[0], calculaDuracao(destinos[0]), destinos[0])
  .then(() =>
    animacaoDeslocamento(elementos[1], calculaDuracao(destinos[1]), destinos[1])
  )
  .then(() =>
    animacaoDeslocamento(elementos[2], calculaDuracao(destinos[2]), destinos[2])
  )
  .then(() =>
    animacaoDeslocamento(elementos[3], calculaDuracao(destinos[3]), destinos[3])
  );
