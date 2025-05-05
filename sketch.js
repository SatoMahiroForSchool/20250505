let video;
let handPose;
let hands = [];

function preload() {
  handPose = ml5.handPose();
}

function modelLoaded() {
  console.log("HandPose 模型已載入");
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
    // ...
    video.hide();
  
    // Start detecting hands from the webcam video
    handPose.detectStart(video, gotHands);
  }
  
  // 初始化攝影機
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // 確保 handPose 已正確初始化
  if (handPose) {
    handPose.on("predict", gotHands);
  } else {
    console.error("HandPose 初始化失敗，請檢查程式碼或 ml5.js 版本。");
  }
  // Callback function for when handPose outputs data

function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

function draw() {
  background(0);
  image(video, 0, 0,width, height);
  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }
  }
}

