const player = document.getElementById('player');
const container = document.getElementById('game-container');

// Obtener dimensiones del contenedor dinámicamente
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

// Empezar en el centro
let posX = containerWidth / 2;
let posY = containerHeight / 2;
const step = 10; // Velocidad del personaje

window.addEventListener('keydown', (e) => {
  // Evitar el scroll de la página al usar las flechas
  if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
  }

  switch (e.key) {
    case 'ArrowUp':
    case 'w':
      posY = Math.max(0, posY - step);
      break;
    case 'ArrowDown':
    case 's':
      posY = Math.min(containerHeight, posY + step);
      break;
    case 'ArrowLeft':
    case 'a':
      posX = Math.max(0, posX - step);
      // Opcional: Voltear la imagen al mirar a la izquierda
      document.getElementById('player-sprite').style.transform = "scaleX(-1)";
      break;
    case 'ArrowRight':
    case 'd':
      posX = Math.min(containerWidth, posX + step);
      // Opcional: Voltear la imagen al mirar a la derecha
      document.getElementById('player-sprite').style.transform = "scaleX(1)";
      break;
  }
  
  // Actualizar la posición visual del div
  player.style.left = `${posX}px`;
  player.style.top = `${posY}px`;
});

// Funciones del Modal de Tiendas
function openShop(shopName) {
  document.getElementById('shop-title').innerText = shopName;
  document.getElementById('shop-modal').classList.remove('hidden');
}

function closeShop() {
  document.getElementById('shop-modal').classList.add('hidden');
}

function buyItem(itemName, price) {
  alert(`¡Has comprado ${itemName} por ${price} puntos en Huacho!`);
  closeShop();
}