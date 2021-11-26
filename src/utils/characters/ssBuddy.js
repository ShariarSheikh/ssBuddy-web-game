import img from "../../assets/dinoo.png";

let playerState = "idle";
const changeState = document.getElementById("changeState");
changeState.addEventListener("change", function (e) {
  playerState = e.target.value;
});

const canvas = document.getElementById("SSBuddy");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 400);
const CANVAS_HEIGHT = (canvas.height = 400);

const playerImg = new Image();
playerImg.src = img;
const spriteWidth = 680;
const spriteHeight = 472;
let gameFrame = 0;
let staggerFrames = 5;

const spriteAnimation = [];
const animationStates = [
  {
    name: "idle",
    frames: 9,
  },
  {
    name: "run",
    frames: 8,
  },
  {
    name: "jump",
    frames: 10,
  },
  {
    name: "walk",
    frames: 9,
  },
  {
    name: "dead",
    frames: 7,
  },
];

animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimation[state.name] = frames;
});

function ssBuddy() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimation[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimation[playerState].loc[position].y;

  ctx.drawImage(
    playerImg,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );

  gameFrame++;
  requestAnimationFrame(ssBuddy);
  return playerState;
}

export default ssBuddy;
