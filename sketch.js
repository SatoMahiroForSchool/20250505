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

  // 繪製偵測到的手部關節點
  drawHandKeypoints();
}

function drawHandKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;

    // 手部關節的索引 (左手: 9-10, 右手: 7-8)
    const handKeypoints = [9, 10, 7, 8];

    for (let j of handKeypoints) {
      let keypoint = pose.keypoints[j];

      // 只繪製置信度高於 0.1 的點
      if (keypoint.score > 0.1) {
        fill(0, 255, 0); // 綠色點
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

