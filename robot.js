document.addEventListener("DOMContentLoaded", function () {
  const robot = document.querySelector(".robot");
  const eyes = document.querySelectorAll(".eye");
  const chestTriangle = document.querySelector(".chest-triangle");

  let isHappy = true;
  let clickCount = 0;

  // Função para criar efeito de partículas
  function createParticles(x, y) {
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement("div");
      particle.style.position = "absolute";
      particle.style.width = "6px";
      particle.style.height = "6px";
      particle.style.background = "#06b6d4";
      particle.style.borderRadius = "50%";
      particle.style.left = x + "px";
      particle.style.top = y + "px";
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "1000";
      particle.style.boxShadow = "0 0 8px rgba(6, 182, 212, 0.6)";

      document.body.appendChild(particle);

      // Animação da partícula
      const angle = (Math.PI * 2 * i) / 8;
      const distance = 60 + Math.random() * 40;
      const finalX = x + Math.cos(angle) * distance;
      const finalY = y + Math.sin(angle) * distance;

      particle.animate(
        [
          {
            transform: "translate(0, 0) scale(1)",
            opacity: 1,
            boxShadow: "0 0 8px rgba(6, 182, 212, 0.6)",
          },
          {
            transform: `translate(${finalX - x}px, ${finalY - y}px) scale(0)`,
            opacity: 0,
            boxShadow: "0 0 0px rgba(6, 182, 212, 0)",
          },
        ],
        {
          duration: 1000,
          easing: "ease-out",
        }
      ).onfinish = () => {
        particle.remove();
      };
    }
  }

  // Função para mudar a expressão do robô
  function changeExpression() {
    if (isHappy) {
      // Expressão surpresa/excitada
      robot.classList.add("excited");
      eyes.forEach((eye) => {
        eye.style.backgroundColor = "#ef4444";
        eye.style.boxShadow = "0 0 15px rgba(239, 68, 68, 0.7)";
        eye.style.transform = "scale(1.2)";
      });
      chestTriangle.style.borderTopColor = "#f97316";
      chestTriangle.style.filter = "brightness(1.3)";
    } else {
      // Volta ao normal
      robot.classList.remove("excited");
      eyes.forEach((eye) => {
        eye.style.backgroundColor = "#06b6d4";
        eye.style.boxShadow = "0 0 10px rgba(6, 182, 212, 0.5)";
        eye.style.transform = "scale(1)";
      });
      chestTriangle.style.borderTopColor = "#f59e0b";
      chestTriangle.style.filter = "brightness(1)";
    }
    isHappy = !isHappy;
  }

  // Função para fazer o robô "dançar"
  function danceMode() {
    robot.style.animation = "none";
    robot.style.animation = "dance 0.4s ease-in-out 8";

    // Efeito de luzes durante a dança
    const danceColors = [
      "#06b6d4", // ciano
      "#ef4444", // vermelho
      "#f59e0b", // amarelo
      "#10b981", // verde
      "#8b5cf6", // roxo
    ];
    let colorIndex = 0;

    const danceInterval = setInterval(() => {
      const currentColor = danceColors[colorIndex];

      eyes.forEach((eye) => {
        eye.style.backgroundColor = currentColor;
        eye.style.boxShadow = `0 0 15px ${currentColor}`;
      });

      // Cores para o triângulo
      const triangleColors = [
        "#f59e0b",
        "#f97316",
        "#dc2626",
        "#059669",
        "#7c3aed",
      ];
      chestTriangle.style.borderTopColor = triangleColors[colorIndex];
      chestTriangle.style.filter = "brightness(1.3)";

      colorIndex = (colorIndex + 1) % danceColors.length;
    }, 100);

    setTimeout(() => {
      clearInterval(danceInterval);
      robot.style.animation = "float 3s ease-in-out infinite";
      // Volta às cores normais
      eyes.forEach((eye) => {
        eye.style.backgroundColor = "#06b6d4";
        eye.style.boxShadow = "0 0 10px rgba(6, 182, 212, 0.5)";
      });
      chestTriangle.style.borderTopColor = "#f59e0b";
      chestTriangle.style.filter = "brightness(1)";
    }, 3200);
  }

  // Event listener para clique no robô
  robot.addEventListener("click", function (e) {
    clickCount++;

    // Criar partículas no local do clique
    const rect = robot.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    createParticles(x, y);

    // Mudar expressão
    changeExpression();

    // A cada 3 cliques, ativar modo dança
    if (clickCount % 5 === 0) {
      setTimeout(danceMode, 500);
    }

    // Volta à expressão normal após 2 segundos
    setTimeout(() => {
      if (!isHappy) {
        changeExpression();
      }
    }, 2000);
  });

  // Efeito hover nos olhos
  eyes.forEach((eye) => {
    eye.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.15)";
      this.style.transition = "transform 0.3s ease";
      this.style.boxShadow = "0 0 15px rgba(6, 182, 212, 0.8)";
    });

    eye.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "0 0 10px rgba(6, 182, 212, 0.5)";
    });
  });

  // Seguir o cursor com os olhos (efeito sutil)
  document.addEventListener("mousemove", function (e) {
    const robotRect = robot.getBoundingClientRect();
    const robotCenterX = robotRect.left + robotRect.width / 2;
    const robotCenterY = robotRect.top + robotRect.height / 2;

    const angle = Math.atan2(
      e.clientY - robotCenterY,
      e.clientX - robotCenterX
    );
    const distance = Math.min(
      2,
      Math.sqrt(
        Math.pow(e.clientX - robotCenterX, 2) +
          Math.pow(e.clientY - robotCenterY, 2)
      ) / 150
    );

    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;

    eyes.forEach((eye) => {
      eye.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      eye.style.transition = "transform 0.1s ease";
    });
  });

  // Adicionar mensagem de boas-vindas
  setTimeout(() => {
    console.log("🤖 Olá! Clique no robozinho para interagir!");
    console.log("💡 Dica: Pressione a tecla Espaço para um efeito especial!");
  }, 1000);

  // Easter egg: tecla de espaço para modo arco-íris
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
      e.preventDefault();
      const colors = [
        "#ef4444", // vermelho
        "#f97316", // laranja
        "#f59e0b", // amarelo
        "#10b981", // verde
        "#06b6d4", // ciano
        "#3b82f6", // azul
        "#8b5cf6", // roxo
      ];

      const triangleColors = [
        "#dc2626", // vermelho escuro
        "#ea580c", // laranja escuro
        "#d97706", // amarelo escuro
        "#059669", // verde escuro
        "#0891b2", // ciano escuro
        "#2563eb", // azul escuro
        "#7c3aed", // roxo escuro
      ];

      let colorIndex = 0;

      const rainbowInterval = setInterval(() => {
        const currentColor = colors[colorIndex];
        const currentTriangleColor = triangleColors[colorIndex];

        eyes.forEach((eye) => {
          eye.style.backgroundColor = currentColor;
          eye.style.boxShadow = `0 0 15px ${currentColor}`;
        });

        chestTriangle.style.borderTopColor = currentTriangleColor;
        chestTriangle.style.filter = "brightness(1.2)";

        colorIndex = (colorIndex + 1) % colors.length;
      }, 150);

      setTimeout(() => {
        clearInterval(rainbowInterval);
        eyes.forEach((eye) => {
          eye.style.backgroundColor = "#06b6d4";
          eye.style.boxShadow = "0 0 10px rgba(6, 182, 212, 0.5)";
        });
        chestTriangle.style.borderTopColor = "#f59e0b";
        chestTriangle.style.filter = "brightness(1)";
      }, 3000);
    }
  });
});
