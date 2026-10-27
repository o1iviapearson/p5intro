
let circleNumSlider;
let circleGapSlider;
let fromColorPicker;
let toColorPicker;

let lines1NumSlider;
let lines1LenSlider;
let lines1DistSlider;
let lines1ColorPicker;
let lines1SpinSlider;
let line1StrokeWeightSlider;
let showLines1Checkbox;

function setup() {
  createCanvas(400, 400);
  noFill();
  strokeWeight(10);

  // FLOWER RINGS
  createP("FLOWER RINGS");

  createElement("label", "Number of Rings: ");
  circleNumSlider = createSlider(1, 10, 3);

  createP("");
  createElement("label", "Ring Spacing: ");
  circleGapSlider = createSlider(50, 150, 50, 20);

  createP("");
  createElement("label", "Inner Ring Color: ");
  fromColorPicker = createColorPicker('#f720a5');

  createP("");
  createElement("label", "Outer Ring Color: ");
  toColorPicker = createColorPicker('#08f728');


  // FLOWER PETALS
  createP("FLOWER PETALS");

  createElement("label", "Number of Petals: ");
  lines1NumSlider = createSlider(1, 10, 5);

  createP("");
  createElement("label", "Petal Length: ");
  lines1LenSlider = createSlider(50, 150, 100, 20);

  createP("");
  createElement("label", "Petal Distance from Center: ");
  lines1DistSlider = createSlider(50, 150, 100, 20);

  createP("");
  createElement("label", "Petal Color: ");
  lines1ColorPicker = createColorPicker('#0dc1e6');

  createP("");
  createElement("label", "Petal Rotation: ");
  lines1SpinSlider = createSlider(0, 360, 0);

  createP("");
  createElement("label", "Petal Outline Thickness: ");
  line1StrokeWeightSlider = createSlider(1, 15, 8);

  createP("");
  showLines1Checkbox = createCheckbox("Show Petals", true);
}


// DRAW FLOWER PETALS
function drawLines1() {
  let num = lines1NumSlider.value();
  let len = lines1LenSlider.value();

  for (let i = 0; i < num; i++) {
    push();

    stroke(lines1ColorPicker.value());
    strokeWeight(line1StrokeWeightSlider.value());
    noFill();

    // Repeat petals around center
    rotate(i / num * TWO_PI);

    // Move petals outward
    translate(lines1DistSlider.value() * 0.5, 0);

    // Rotate petals with slider
    rotate(radians(lines1SpinSlider.value()));

    // Flower petal
    ellipse(0, 0, len, 45);

    // Small circle at petal tip
    fill('#e4a4e1');
    stroke(lines1ColorPicker.value());
    strokeWeight(3);
    circle(len / 2, 0, 18);

    pop();
  }
}


// DRAW FLOWER RINGS
function drawCirles() {
  let num = circleNumSlider.value();
  let gap = circleGapSlider.value();
  let from = color(fromColorPicker.value());
  let to = color(toColorPicker.value());

  for (let i = 0; i < num; i++) {
    push();

    noFill();
    strokeWeight(10);
    stroke(lerpColor(from, to, i / max(num - 1, 1)));

    circle(0, 0, (i + 1) * gap);

    pop();
  }
}


// DRAW EVERYTHING
function draw() {
  background(220);

  translate(width / 2, height / 2);

  // Flower rings
  drawCirles();

  // Flower petals
  if (showLines1Checkbox.checked()) {
    drawLines1();
  }

  // Flower center
  fill('#e4a4e1');
  noStroke();
  circle(0, 0, 35);
}
