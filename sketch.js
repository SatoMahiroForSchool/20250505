let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(640, 480);
	//createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded); //呼叫在ml5.js上的net函數，用此函數來判斷各位置，呼叫成功即執行function modelLoaded 
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;  //把抓到的幾個點，都放置pose變數內
    skeleton = poses[0].skeleton; //把相關於骨架的點都放到skeleton變數內
  }
}


function modelLoaded() {   //顯示pose model已經準備就緒
  console.log('poseNet ready');
}

function draw() {
    background(0);
    image(video, 0, 0);  //顯示你的畫面在螢幕上
    translate(video.width,0)  //因為攝影機顯示的是反像的畫面，需要透過這兩條指令來做反轉
	  scale(-1,1)    //因為攝影機顯示的是反像的畫面，需要透過這兩條指令來做反轉
}

