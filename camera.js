const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Open camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    alert("Camera access denied!");
  });

// Capture & detect skin
function capture() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);

  const pixel = ctx.getImageData(
    canvas.width / 2,
    canvas.height / 2,
    1,
    1
  ).data;

  const r = pixel[0];
  const g = pixel[1];
  const b = pixel[2];

  // Basic skin detection logic
  if (r > g && r > b) {
    window.location.href = "epiglow_dry.html";
  } else {
    window.location.href = "epiglow_oily.html";
  }
}
