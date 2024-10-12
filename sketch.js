const num_points = 5_000;
let points = [];

let image_brain;
let texture;

function randomizeColor(c) {
  console.log(hue(c), saturation(c), brightness(c));
  let h = round(min(max(hue(c) + random(-10, 10), 0), 360));
  let s = saturation(c);
  let b = brightness(c);
  if (b < 30) {
    s += 10;
  }
  else {
    s -= 25;
  }
  s = min(max(s, 0), 100);
  console.log(`hsb(${h}, ${s}%, ${b}%)`)
  return color(`hsb(${h}, ${s}%, ${b}%)`);
  // return c;
}

function preload() {
  image_brain = loadImage('crop_retrato4.jpg');
  texture = loadImage('texture.jpg');

}

function setup() {

  let canvas = createCanvas(image_brain.width, image_brain.height);
  canvas.parent('#canvas');
  background(255);
  noStroke();

  ellipseMode(CENTER);

  noLoop();
}

function draw() {

  points = [];
  for (let i = 0; i < num_points; i++) {
    points.push(new c2.Point(random(width), random(height)));
  }

  let delaunay = new c2.Delaunay();
  delaunay.compute(points);
  let vertices = delaunay.vertices;
  let edges = delaunay.edges;
  let triangles = delaunay.triangles;
  console.log(triangles);

  for (let i = 0; i < triangles.length; i++) {
    let centroid = triangles[i].centroid();
    let c = image_brain.get(centroid.x, centroid.y);
    c = randomizeColor(c);
    console.log(c);
    fill(c);
    stroke(1, 0.5);
    triangle(triangles[i].p1.x, triangles[i].p1.y,
      triangles[i].p2.x, triangles[i].p2.y,
      triangles[i].p3.x, triangles[i].p3.y);
  }

  blendMode(MULTIPLY);
  tint(256, 128);
  image(texture, 0, 0, width, height);
}
