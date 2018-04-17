function drawGuides(canvas) {
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.fillRect(canvas.width/2 - 30, canvas.height/2 -30, 60, 60);
  ctx.stroke();
  ctx.closePath();
}

function pointerInTop(canvas, x, y) {
  var xSatisfy = x < canvas.width;
  var ySatisfy = y < canvas.height / 2 - 30;
  return xSatisfy && ySatisfy;
}

function pointerInBottom(canvas, x, y) {
  var xSatisfy = x < canvas.width;
  var ySatisfy = y > canvas.height / 2 + 30;
  return xSatisfy && ySatisfy;
}

function pointerInLeft(canvas, x, y) {
  var xSatisfy = x < canvas.width/2 - 30;
  var ySatisfy = y < canvas.height;
  return xSatisfy && ySatisfy;
}

function pointerInRight(canvas, x, y) {
  var xSatisfy = x > canvas.width/2 + 30;
  var ySatisfy = y < canvas.height;
  return xSatisfy && ySatisfy;
}

function highlightRectFor(canvas, rect) {
  var y = rect.y + rect.height / 2;
  var x = canvas.width - (rect.x + rect.width / 2);
  
  if (pointerInTop(canvas, x, y)) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
    ctx.closePath();
  }
  if (pointerInBottom(canvas, x, y)) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height);
    ctx.closePath();
  }
  if (pointerInLeft(canvas, x, y)) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
    ctx.closePath();
  }
  if (pointerInRight(canvas, x, y)) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
    ctx.closePath();
  }
}

function plotFaceRect(ctx, rect) {
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.stroke();
  ctx.closePath();
}

function trackFace(pointer) {
  var video = document.getElementById('video');
  var canvas = $('#guidelines')[0];
  drawGuides(canvas);
  pointer.show();
  var tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);
  
  tracking.track('#video', tracker, {camera: true});
  
  var ctx = canvas.getContext("2d");
  tracker.on('track', function (event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGuides(canvas);
    event.data.forEach(function (rect) {
      // plotFaceRect(ctx, rect);
      highlightRectFor(canvas, rect);
      pointer.css({
        top: rect.y + rect.height / 2 - 24,
        left: canvas.width - (rect.x + rect.width / 2 + 24)
      });
    });
  });
}

function stopFaceTracker() {
  tracking.TrackerTask.stop();
}
