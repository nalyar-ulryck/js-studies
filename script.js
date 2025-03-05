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
];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const velocidade = 500; // Define a velocidade em pixels por segundo

// Calcula a duração com base na distância e na velocidade
function calculaDuracao(distancia) {
  return (distancia / velocidade) * 1000; // Converte para milissegundos
}

// Executa as animações em sequência usando async/await

async function executarAnimacoes() {
  const destinos = elementos.map(() => getRandomNumber(100, 900));

  for (let i = 0; i < elementos.length; i++) {
    await animacaoDeslocamento(
      elementos[i],
      calculaDuracao(destinos[i]),
      destinos[i]
    );
  }
}

executarAnimacoes();
