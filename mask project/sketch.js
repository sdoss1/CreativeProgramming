//notes:

//the right/leftEyebrowUpper is more of the corner of the eye
//two tattoos does not load

//option command J to open the console in chrome

let video; //connect webcam to the sketch
let model; // face sees machine learning model
let face; //face detection


function preload() {
  snake = loadImage('assets/snake.png');
  snake2 = loadImage('assets/snake2.png');
  god = loadImage('assets/god.png');
  people = loadImage('assets/people.png');
  compass = loadImage('assets/compass.png');
  spirit = loadImage('assets/spirit.png');
  love = loadImage('assets/love.png');
  tribalsnake = loadImage('assets/tribalsnake.png');
  leftarrows = loadImage('assets/leftarrows.png');
  rightarrows = loadImage('assets/rightarrows.png');
}

function setup() {
  createCanvas(640,480);

video = createCapture(VIDEO); //create the video capture
video.size(640,480); //resolution, lower it for less performance issues
video.hide(); //hides second video that might appear on screen

while(!tf.ready()) {
  // this while-loop will just repeat until
  // everything is ready for us
}

console.log('loading model...');
loadFaceModel(); //load model in asynchronous function

}

async function loadFaceModel(){
  model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
    {maxFaces: 1} //tracks only 1 face
  );
  console.log('...done!');
}

function draw() {
  // background(100);
  //image(video,0,0); //displays the video
  //if the face has data attached to it, print to the console in draw
if(video.loadedmetadata && model !== undefined) {
  getFace();
}

if (face!== undefined) {
  //open console.log to see arrays and points
  // console.log(face);
  // noLoop();

  image(video, 0,0,width,height);

//draw the face tattoos here!

  //white dots on the face for map
  //open console.log to see arrays and points
  // fill(255);
  noFill();
  noStroke();
  for (let pt of face.scaledMesh) {
    pt = scalePoint(pt);
    circle(pt.x, pt.y, 3);
    // rect(pt.x,pt.y,3,5)
  }

  // command slash below to mask the face with a solid shape

  // fill(0,150,255,100);
  // noStroke();
  // beginShape();
  // for (pt of face.annotations.silhouette){
  //   pt = scalePoint(pt);
  //   vertex(pt.x, pt.y);
  // }
  endShape(CLOSE);

  //eye test
  // let leftEye = scalePoint(face.annotations.leftEyeIris[0]);
  // let rightEye = scalePoint(face.annotations.rightEyeIris[0]);

  //brow test
  // let leftEyebrowUpper = scalePoint(face.annotations.leftEyebrowUpper[0]);
  // let rightEyebrowUpper = scalePoint(face.annotations.rightEyebrowUpper[0]);

  //cheek test
  let leftCheek = scalePoint(face.annotations.leftCheek[0]);
  let rightCheek = scalePoint(face.annotations.rightCheek[0]);

  //below lips test
  let lipsLowerOuter = scalePoint(face.annotations.lipsLowerOuter[0]);

  //under eye test
  let leftEyeLower2 = scalePoint(face.annotations.leftEyeLower2[0]);
  let rightEyeLower2 = scalePoint(face.annotations.rightEyeLower2[0]);

  //between eyes test
  let midwayBetweenEyes = scalePoint(face.annotations.midwayBetweenEyes[0]);
  

  //bounding box to scale size fowards and backwards
  let topLeft = scalePoint(face.boundingBox.topLeft);
  let bottomRight = scalePoint(face.boundingBox.bottomRight);
  let w = bottomRight.x = topLeft.x;
  let dia = w/6; //change this number to change the size of the shape
  let dia2 = w/10;

  //draw the shape: eyes
  // fill(255);
  // noStroke();
  // circle(leftEyer.x, leftEye.y, dia);
  // circle(rightEye.x, rightEye.y, dia);

  //draw the shape: cheeks
  fill(255);
  noStroke();
  image(love, leftCheek.x-15, leftCheek.y-10,40,40);
  image(spirit, rightCheek.x-20, rightCheek.y-10, 40,40);

  //draw the shape: below lips
   fill(255);
  noStroke();
  image(compass, lipsLowerOuter.x+15, lipsLowerOuter.y+15, 40,40);
  image(rightarrows, lipsLowerOuter.x-30, lipsLowerOuter.y, 35,35);
  image(leftarrows, lipsLowerOuter.x+70, lipsLowerOuter.y, 35,35);

  //draw the shape undereye
  fill(255);
  noStroke();
  image(god,rightEyeLower2.x, rightEyeLower2.y+20, 40,20);
  image(people,leftEyeLower2.x-35, leftEyeLower2.y+20, 40,20);

  //draw the shape: between eyes
  // fill(255);
  // noStroke();
  // circle(midwayBetweenEyes.x, midwayBetweenEyes.y, dia);
  image(snake2, midwayBetweenEyes.x-10, midwayBetweenEyes.y, 20,70)
  image(tribalsnake, midwayBetweenEyes.x-10, midwayBetweenEyes.y-80, 10,90)
}
}
//convert coordinates from video to canvas
function scalePoint(pt){
  let x = map(pt[0], 0,video.width, 0,width);
  let y = map(pt[1], 0,video.height, 0,height);
return createVector(x,y);
}

//get the face
async function getFace(){
  const predictions = await model.estimateFaces({
    input: document.querySelector('video')

  });
  if (predictions.length === 0){
    face = undefined;
  
  }
  else{
    face = predictions[0];
  }
}
