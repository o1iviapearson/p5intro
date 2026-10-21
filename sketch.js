function setup() {
   createCanvas(1000, 1000);
}

function draw() {
background(98, 77, 110);
noStroke();

// Hair

noStroke();
fill(61, 33, 9)
circle(300, 400, 150);
circle(700, 400, 150);
circle(290, 300, 150);
circle(700, 250, 150);
circle(270, 450, 150);
circle(690, 450, 150);
circle(290, 500, 150);
circle(700, 500, 150);
circle(270, 550, 150);
circle(690, 550, 150);
circle(290, 600, 150);
circle(700, 600, 150);


// 
fill(232, 198, 155)
ellipse (500, 400, 450, 500);
ellipse(730, 350, 100, 150);
ellipse(270, 350, 100, 150);

// Smile
noFill();
stroke(150, 26, 88);
strokeWeight(5);

arc(500, 510, 150, 100, 0, PI);

// Hair
noStroke();
fill(61, 33, 9)
circle(300, 290, 150);
circle(350, 230, 150);
circle(650, 220, 150);
circle(600, 250, 150);
circle(550, 200, 150);
circle(470, 180, 150);


// Eyes
noStroke();
fill(255);
ellipse(400, 400, 45, 35);
ellipse(600, 400, 45, 35);

// Pupils
fill(45, 25, 15);
circle(400, 400, 22);
circle(600, 400, 22);

// Eye highlights
fill(255);
circle(405, 395, 7);
circle(605, 395, 7);


// Silver hoop earrings
noFill();
stroke(192, 192, 192);
strokeWeight(10);

// Left earring
ellipse(270, 440, 65, 100);

// Right earring
ellipse(730, 440, 65, 100);


// Eyebrows
noFill();
stroke(61, 33, 9);
strokeWeight(7);

arc(400, 365, 65, 20, PI, TWO_PI);
arc(600, 365, 65, 20, PI, TWO_PI);


// Nose
noFill();
stroke(190, 140, 110);
strokeWeight(4);

arc(500, 455, 25, 18, 0, PI);

// Blush
noStroke();
fill(222, 145, 145, 110);

ellipse(360, 460, 85, 40);
ellipse(640, 460, 85, 40);
}