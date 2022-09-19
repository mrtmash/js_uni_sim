const canvas = document.getElementById('uni');
const uni = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
}
const atoms = [];
const acc = 0.1;
var play = false;

class Atom {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`
    this.speedX = 0;
    this.speedY = 0;
  }
  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  show() {
    uni.fillStyle = this.color;
    uni.beginPath();
    uni.arc(this.x, this.y, 4, 0, 360);
    uni.fill();
  }
}

canvas.addEventListener('click', (data) => {
  mouse.x = data.x;
  mouse.y = data.y;
  atoms.push(new Atom);
  uni.clearRect(0, 0, canvas.width, canvas.height);
  for (var a = 0; a < atoms.length; a++) {
    atoms[a].show();
  }
});

function atomHandler() {
  for (var a = 0; a < atoms.length; a++) {
    atoms[a].move();
    atoms[a].show();
    for (var b = a; b < atoms.length; b++) {
      var dx = atoms[a].x - atoms[b].x;
      var dy = atoms[a].y - atoms[b].y;
      if (dx > 0) {
        atoms[a].speedX += -acc;
        atoms[b].speedX += acc;
      }
      if (dx < 0) {
        atoms[a].speedX += acc;
        atoms[b].speedX += -acc;
      }
      if (dy > 0) {
        atoms[a].speedY += -acc;
        atoms[b].speedY += acc;
      }
      if (dy < 0) {
        atoms[a].speedY += acc;
        atoms[b].speedY += -acc;
      }
    }
  }
}

function animate() {
  if (play) {
    uni.clearRect(0, 0, canvas.width, canvas.height);
    atomHandler();
    requestAnimationFrame(animate);
  }
}

window.addEventListener('keypress', (event) => {
  if (!play) {
    play = true;
    animate();
  } else {
    play = false;
  }
});
