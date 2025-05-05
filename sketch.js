let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);

  // 初始化攝影機
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 初始化 PoseNet
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', function (results) {
    poses = results;
  });
}

function modelLoaded() {
  console.log('PoseNet 已載入');
}

function draw() {
  background(0);
  image(video, 0, 0, width, height);

  // 繪製偵測到的關節點
  drawKeypoints();
}

function drawKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;

    // 遍歷所有關節點
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];

      // 只繪製置信度高於 0.2 的點
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

