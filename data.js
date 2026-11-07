
let moodData = [];
let dataLoaded = false;
let errorMessage = "";

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

async function setup() {

  let canvas = createCanvas(1000, 600);
  canvas.parent("visualization");

  try {

    
    let data = await loadJSON("data.json");

    console.log("p5 JSON result:", data);

   
    if (!data || !data.Monday) {

  
      const response = await fetch("data.json");

      if (!response.ok) {
        throw new Error("Could not access data.json");
      }

      data = await response.json();
    }

    console.log("Final JSON data:", data);


    moodData = dayNames.map(dayName => {

      let entry = data[dayName];

      if (!entry) {
        throw new Error(dayName + " is missing from data.json");
      }

      return {
        day: dayName,
        mood: entry.mood,
        energy: Number(entry.energy)
      };

    });

    dataLoaded = true;

    console.log("Mood data ready:", moodData);

  } catch (error) {

    console.error("Data loading error:", error);
    errorMessage = error.message;

  }
}

function draw() {

  background(255);

  // TITLE
  fill(0);
  noStroke();
  textAlign(LEFT);
  textSize(28);
  text("A WEEK OF MOODS", 80, 70);

  // LEGEND
  textSize(18);
  text("LEGEND", 80, 130);

  noStroke();

  fill(245, 197, 0);
  circle(100, 175, 20);

  fill(0);
  textSize(16);
  text("Happy", 120, 181);

  fill(54, 190, 221);
  circle(250, 175, 20);

  fill(0);
  text("Calm", 270, 181);

  fill(60, 205, 45);
  circle(390, 175, 20);

  fill(0);
  text("Stressed", 410, 181);

  // EXPLANATION
  textSize(16);
  text("Color = Mood", 80, 225);
  text("Size = Energy", 80, 250);
  text("Smaller spirals rotate faster", 80, 275);

  // DATA STATUS
  if (!dataLoaded) {

    fill(0);
    textSize(18);

    text(
      errorMessage
        ? "ERROR: " + errorMessage
        : "Loading data...",
      80,
      350
    );

    return;
  }

  // DRAW SPIRALS
  for (let i = 0; i < moodData.length; i++) {

    let day = moodData[i];

    let x = map(i, 0, 6, 100, 900);
    let y = 415;

    // Energy determines spiral size
    let spiralSize = map(day.energy, 1, 10, 25, 150);

    // Smaller spirals rotate faster
    let rotationSpeed = map(day.energy, 1, 10, 0.09, 0.005);

    // Mood determines color
    if (day.mood === "happy") {
      stroke(245, 197, 0);
    } else if (day.mood === "calm") {
      stroke(54, 190, 221);
    } else {
      stroke(60, 205, 45);
    }

    noFill();
    strokeWeight(4);
    strokeCap(ROUND);

    push();

    translate(x, y);
    rotate(frameCount * rotationSpeed);

    beginShape();

    for (let angle = 0; angle <= TWO_PI * 6; angle += 0.05) {

      let radius = map(
        angle,
        0,
        TWO_PI * 6,
        0,
        spiralSize / 2
      );

      vertex(
        cos(angle) * radius,
        sin(angle) * radius
      );
    }

    endShape();
    pop();

    // DAY LABEL
    noStroke();
    fill(0);
    textAlign(CENTER);
    textSize(20);

    text(day.day.charAt(0), x, 535);
  }
}
