let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded); 
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;  
    skeleton = poses[0].skeleton; 
  }
}

function modelLoaded() {   
  console.log('poseNet ready');
}

function draw() {
  background(0);
  image(video, 0, 0);  
  translate(video.width, 0);  
  scale(-1, 1);    

  if (pose) {
    // 繪製關節點
    for (let i = 0; i < pose.keypoints.length; i++) {
      let keypoint = pose.keypoints[i];
      if (keypoint.score > 0.2) { // 確保置信度足夠高
        fill(0, 255, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }

    // 繪製骨架
    for (let i = 0; i < skeleton.length; i++) {
      let partA = skeleton[i][0];
      let partB = skeleton[i][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

