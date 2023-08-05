document.addEventListener("DOMContentLoaded", function() {
    const puzzlePieces = document.querySelectorAll(".puzzle-piece");
    const targetBox = document.querySelector(".target-box");
  
    let currentSum = 0;
  
    // Adiciona eventos de arrastar e soltar às peças do quebra-cabeça
    puzzlePieces.forEach(puzzlePiece => {
      puzzlePiece.addEventListener("dragstart", dragStart);
      puzzlePiece.addEventListener("dragend", dragEnd);
    });
  
    targetBox.addEventListener("dragover", dragOver);
    targetBox.addEventListener("drop", drop);
  
    // Função chamada quando o arrastar começa
    function dragStart(event) {
      event.dataTransfer.setData("text/plain", event.target.dataset.value);
      event.target.classList.add("dragging");
    }
  
    // Função chamada quando o arrastar termina
    function dragEnd(event) {
      event.target.classList.remove("dragging");
    }
  
    // Função chamada quando uma peça é arrastada sobre a caixa de destino
    function dragOver(event) {
      event.preventDefault();
    }
  
    // Função chamada quando uma peça é solta na caixa de destino
    function drop(event) {
      event.preventDefault();
      const value = event.dataTransfer.getData("text/plain");
      currentSum += parseInt(value);
  
      // Atualiza o texto na caixa de destino para mostrar a soma atual
      targetBox.textContent = `Arraste e solte as peças para montar a soma correta: ${currentSum}`;
  
      // Verifica se todas as peças foram corretamente adicionadas e mostra uma mensagem de conclusão
      if (currentSum === 16) {
        targetBox.classList.add("success");
        playSuccessSound();
        setTimeout(() => {
          const successMessage = document.createElement("div");
          successMessage.textContent = "Parabéns! Você completou o quebra-cabeça!";
          successMessage.classList.add("success-message");
          targetBox.appendChild(successMessage);
        }, 100);
      } else {
        playErrorSound();
      }
  
      // Adiciona a classe de animação na caixa de destino
      targetBox.classList.add("drop-animation");
  
      // Remove a classe de animação após um pequeno atraso
      setTimeout(() => {
        targetBox.classList.remove("drop-animation");
      }, 500);
    }
  
    function playSuccessSound() {
      const successSound = document.getElementById("sound-success");
      successSound.play();
    }
  
    function playErrorSound() {
      const errorSound = document.getElementById("sound-error");
      errorSound.play();
    }
  });
  