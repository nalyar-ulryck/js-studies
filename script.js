async function toggleNotification(isActive) {
  const bellIcon = document.getElementById("bellIcon");
  const messageDropdown = document.getElementById("messageDropdown");
  const notificationAmount = document.querySelector(".notification-amount");

  if (isActive === true) {
    await animateBell();
    // Mostrar o dropdown de mensagens com animação
    messageDropdown.style.opacity = "0";
    messageDropdown.style.transform = "translateY(-10px)";
    messageDropdown.style.maxHeight = "0";

    // Adicionar a classe active para iniciar a animação
    messageDropdown.classList.add("active");

    // Forçar reflow para garantir que a animação ocorra
    messageDropdown.offsetHeight;

    // Aplicar a animação de entrada
    messageDropdown.style.opacity = "1";
    messageDropdown.style.transform = "translateY(0)";
    messageDropdown.style.maxHeight = "300px";
  } else {
    // Animação de saída do dropdown
    messageDropdown.style.opacity = "0";
    messageDropdown.style.transform = "translateY(-10px)";
    messageDropdown.style.maxHeight = "0";

    // Remover a classe active após a animação terminar
    setTimeout(() => {
      messageDropdown.classList.remove("active");
    }, 300); // 300ms é a duração da transição definida no CSS
  }
}

function animateBell() {
  return new Promise((resolve, reject) => {
    // Tornar visível a contagem de notificações
    notificationAmount.style.opacity = "1";
    notificationAmount.style.visibility = "visible";

    // Animar o sino como se tivesse clicado nele
    const bellGroup = document.querySelector(".bell-icon__group");
    const bellBall = document.querySelector(".bell-icon__ball");

    // Aplicar as animações
    bellGroup.style.animation = "animateGroup 2.3s";
    bellBall.style.animation = "animateBall 2.3s";

    // Aplicar a animação de bounce na contagem
    const notificationBefore = document.createElement("style");
    notificationBefore.textContent =
      ".notification-amount::before { animation-name: bounce; animation-delay: 450ms; }";
    document.head.appendChild(notificationBefore);
    // Resolve the promise after animation completes
    setTimeout(() => {
      resolve();
    }, 2300);
  });
}

toggleNotification(true);
