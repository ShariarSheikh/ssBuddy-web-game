import ground from "../../assets/layer-3-ground.png";
import mountain from "../../assets/layer-2-mountain.png";
import sky from "../../assets/layer-1-sky.png";

let gameSpeed = 0;
const changeState = document.getElementById("changeState");
changeState.addEventListener("change", function (e) {
  if (e.target.value === "idle") gameSpeed = 0;
  if (e.target.value === "walk") gameSpeed = 4;
  if (e.target.value === "run") gameSpeed = 6;
  if (e.target.value === "jump") gameSpeed = 6;
  if (e.target.value === "dead") gameSpeed = 2;
});

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 900);

const backgroundLayer1 = new Image();
backgroundLayer1.src = ground;

const backgroundLayer2 = new Image();
backgroundLayer2.src = mountain;

const backgroundLayer3 = new Image();
backgroundLayer3.src = sky;

const slider = document.getElementById("slider");
const showGameSpeed = document.getElementById("showGameSpeed");
slider.value = gameSpeed;
showGameSpeed.innerHTML = gameSpeed;

slider.addEventListener("change", (e) => {
  gameSpeed = e.target.value;
  showGameSpeed = e.target.value;
});

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 3072;
    this.height = 900;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

const layer1 = new Layer(backgroundLayer1, 0.5);
const layer2 = new Layer(backgroundLayer2, 0.3);
const layer3 = new Layer(backgroundLayer3, 0.2);

const gameObject = [layer3, layer2, layer1];

const background = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  gameObject.forEach((object) => {
    object.update();
    object.draw();
  });

  requestAnimationFrame(background);
};

export default background;
