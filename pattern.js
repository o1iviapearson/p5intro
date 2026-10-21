function setup() {

}



let gridSize = 75;
let cols, rows;

function setup() {
  createCanvas(800, 800);
  cols = int(width / gridSize);
  rows = int(height / gridSize);
}

function draw() {
  background(34, 29, 56);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let x = i * gridSize + gridSize / 2;
      let y = j * gridSize + gridSize / 2;

      // Distance from mouse
      let d = dist(x, y, mouseX, mouseY);

      // Circle size
      let circleSize = map(d, 0, 800, 70, 10);
      circleSize = constrain(circleSize, 10, 70);

      // Purple and pink colors
      let r = map(x, 0, width, 180, 250);
      let b = map(y, 0, height, 140, 250);

      // NEW: Gentle wave movement
      let wave = sin(frameCount * 0.05 + i + j);
      let movement = map(wave, -1, 1, -15, 15);

      push();
      translate(0, movement);

      noFill();
      stroke(r, 110, b);
      strokeWeight(5);

      circle(x, y, circleSize);

      // Center dot
      noStroke();
      fill(246, 214, 181);
      circle(x, y, circleSize * 0.2);

      pop();
    }
  }
}
