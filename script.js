var cnv;
let n;
let x;
let points;
let radius, diameter, angle;
var nSlider, xSlider;
let offset, inc;

function ptc(r, theta) {
  return createVector(r*cos(theta), r*sin(theta));
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.position((windowWidth-width)/2, (windowHeight-height)/2);
  frameRate(200);
  diameter = min(windowWidth, windowHeight)-100;
  radius = diameter / 2;
  // nSlider = createSlider(10, 500, 40, 1);
  // xSlider = createSlider(2, 50, 2, 0.001);
  n = 2;
  x = 2;
  inc = 0;
  makePoints();
}

function makePoints() {
  points = new Array(n);
  angle = PI;
  for (let i = 0; i < n; i++) {
    let pt = ptc(radius, angle);
    angle -= (PI/n)*2;
    points[i] = new Point(pt.x, pt.y, i);
  }
}

function draw() {
  // background(0);
  translate(width/2, height/2);
  // let d = floor(map(abs(dist(mouseX, mouseY, radius, mouseY)), 0, width/2, width/2, -width/2));
  let d;
  if (mouseX <= width/2) {
    d = floor(mouseX-width/2 + radius);
  } else {
    d = floor(radius-mouseX+width/2);
  } 
  
  if (d > 0) {
    n = ceil(d);
  } else {
    n = 2;
  }
  inc = -map(mouseY-height/2, -height/2, height/2, -1, 1);
  if (x >= 2) {
    x += inc;
  } else {
    x = 1;
    if (inc > 0) {
      x = 2;
    }
  }
  clear();
  makePoints();
  stroke(255);
  noFill();
  strokeWeight(1);
  circle(0, 0, diameter);
  for (pt of points) {
    fill(255);
    noStroke();
    pt.show();
    let other = points[floor(x*pt.id)%n];
    strokeWeight(1);
    line(pt.pos.x, pt.pos.y, other.pos.x, other.pos.y);
  }
  stroke(255);
  fill(255);
  textSize(20);
  textFont('Courier New');
  text(`${mouseX-width/2}, ${mouseY-height/2}`, 0, -height/2+30);
  text(`n: ${n}`, -width/2+20, -height/2+30);
  text(`x: ${x.toFixed(3)}`, -width/2+20, -height/2+60);
  text(`delta: ${inc.toFixed(3)}`, -width/2+20, -height/2+90);
}
