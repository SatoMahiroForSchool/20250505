let video;
let hands;
let canvasElement;
let canvasCtx;

function setup() {
  createCanvas(640, 480);
  canvasElement = document.querySelector('canvas');
  canvasCtx = canvasElement.getContext('2d');

  // 初始化攝影機
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // 初始化 MediaPipe Hands
  hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
  });

  hands.setOptions({
    maxNumHands: 2, // 偵測最多 2 隻手
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  hands.onResults(onResults);

  // 啟用攝影機
  const camera = new Camera(video.elt, {
    onFrame: async () => {
      await hands.send({ image: video.elt });
    },
    width: 640,
    height: 480,
  });
  camera.start();
}

function onResults(results) {
  // 清除畫布
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

  // 繪製手部關節點和骨架
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
      drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 1 });
    }
  }
  canvasCtx.restore();
}

function draw() {
  // draw() 不需要額外處理，因為 MediaPipe Hands 自動處理影像和結果
}

