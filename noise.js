
let flowers = [];

let flowerColors = [
  "#F28C63", // Soft orange
  "#F7B267", // Peach
  "#E88BB6", // Pink
  "#D65A91", // Rose
  "#A49ACB", // Lavender
  "#7778AD", // Periwinkle
  "#E6C978"  // Pale gold
];

let lastFlowerX;
let lastFlowerY;

let flowerSpacing = 55;

function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  background("#FFFEFC");

  // Draw every flower in the composition
  for (let flower of flowers) {
    drawFlower(flower);
  }
}

// CREATE A FLOWER
function createFlower(x, y) {

  let petals = floor(random(6, 11));
  let flowerSize = random(80, 160);

  let flower = {
    x: x,
    y: y,
    size: flowerSize,
    petals: petals,
    color: random(flowerColors),
    rotation: random(TWO_PI),
    lengths: [],
    widths: [],
    stamens: []
  };

  // Randomize each petal
  for (let i = 0; i < petals; i++) {
    flower.lengths.push(random(0.65, 1.1));
    flower.widths.push(random(0.2, 0.35));
  }

  // Randomize flower stamens
  for (let i = 0; i < 25; i++) {

    let angle = random(TWO_PI);
    let distance = random(12, flowerSize * 0.25);

    flower.stamens.push({
      x: cos(angle) * distance,
      y: sin(angle) * distance,
      size: random(2, 4)
    });
  }

  flowers.push(flower);

  redraw();
}

// DRAW A FLOWER
function drawFlower(flower) {
  push();

  translate(flower.x, flower.y);
  rotate(flower.rotation);

  let petalColor = color(flower.color);
  petalColor.setAlpha(48);

  // Draw translucent petals
  for (let i = 0; i < flower.petals; i++) {

    let angle = TWO_PI / flower.petals * i;

    let length = flower.size * flower.lengths[i];
    let petalWidth = flower.size * flower.widths[i];

    push();
    rotate(angle);

    noStroke();
    fill(petalColor);

    beginShape();

    vertex(0, 0);

    bezierVertex(
      -petalWidth,
      -length * 0.2,
      -petalWidth * 1.4,
      -length * 0.8,
      0,
      -length
    );

    bezierVertex(
      petalWidth * 1.4,
      -length * 0.8,
      petalWidth,
      -length * 0.2,
      0,
      0
    );

    endShape(CLOSE);

    // Delicate central vein
    let veinColor = color(flower.color);
    veinColor.setAlpha(65);

    noFill();
    stroke(veinColor);
    strokeWeight(0.6);

    bezier(
      0, 0,
      -5, -length * 0.3,
      5, -length * 0.7,
      0, -length * 0.92
    );

    // Branching veins
    for (let v = 1; v < 6; v++) {

      let y = -length * (v / 7);
      let branchLength = petalWidth * 0.5;

      strokeWeight(0.4);

      line(
        0, y,
        -branchLength,
        y - length * 0.08
      );

      line(
        0, y,
        branchLength,
        y - length * 0.08
      );
    }

    pop();
  }

  // Flower center
  noStroke();
  fill(255, 245, 220, 150);

  circle(0, 0, flower.size * 0.12);

  // Stamens
  for (let stamen of flower.stamens) {

    stroke(255, 255, 245, 180);
    strokeWeight(0.8);

    line(0, 0, stamen.x, stamen.y);

    noStroke();
    fill(255, 250, 230, 200);

    circle(stamen.x, stamen.y, stamen.size);
  }

  pop();
}

// CLICK ONCE = ONE FLOWER
function mousePressed() {

  if (
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height
  ) {

    createFlower(mouseX, mouseY);

    lastFlowerX = mouseX;
    lastFlowerY = mouseY;
  }
}

// CLICK + HOLD + DRAG = FLOWER CHAIN
function mouseDragged() {

  if (
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height
  ) {

    let distance = dist(
      mouseX,
      mouseY,
      lastFlowerX,
      lastFlowerY
    );

    // Only create a new flower after moving
    // a certain distance
    if (distance > flowerSpacing) {

      createFlower(mouseX, mouseY);

      lastFlowerX = mouseX;
      lastFlowerY = mouseY;
    }
  }

  return false;
}

// KEYBOARD INTERACTIONS
function keyPressed() {

  // Press S to save
  if (key === "s" || key === "S") {
    saveCanvas("surreal-floral-composition", "png");
  }

  // Press C to clear
  if (key === "c" || key === "C") {
    flowers = [];
    redraw();
  }
}
