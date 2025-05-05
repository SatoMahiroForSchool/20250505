let video;
let handPose;
let hands = [];

function preload() {
  // 確保 ml5.js 已正確載入
  if (ml5 && ml5.handpose) {
    handPose = ml5.handpose({ flipHorizontal: true }, modelLoaded);
  } else {
    console.error("ml5.js 的版本不支援 handpose 方法，請更新 ml5.js。");
  }
}

function modelLoaded() {
  console.log("HandPose 模型已載入");
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);

  // 初始化攝影機
  video = createCapture(VIDEO, (stream) => {
    console.log("攝影機已啟用");
  });
  video.size(width, height);
  video.hide();

  // 確保 handPose 已正確初始化
  if (handPose) {
    handPose.on("predict", gotHands);
  } else {
    console.error("HandPose 初始化失敗，請檢查程式碼或 ml5.js 版本。");
  }
}

function draw() {
  background(0);
  image(video, 0, 0);

  // 確保至少有一隻手被偵測到
  if (hands.length > 0) {
    for (let hand of hands) {
      // 繪製手部關節點
      for (let keypoint of hand.landmarks) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint[0], keypoint[1], 10);
      }
    }
  }
}
