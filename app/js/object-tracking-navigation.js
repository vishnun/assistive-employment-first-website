var topInterval, bottomInterval, rightInterval, leftInterval;

function drawGuides(canvas) {
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.fillRect(canvas.width / 2 - 30, canvas.height / 2 - 30, 60, 60);
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
  var xSatisfy = x < canvas.width / 2 - 30;
  var ySatisfy = y < canvas.height;
  return xSatisfy && ySatisfy;
}

function pointerInRight(canvas, x, y) {
  var xSatisfy = x > canvas.width / 2 + 30;
  var ySatisfy = y < canvas.height;
  return xSatisfy && ySatisfy;
}

function moveMouseFor(mouse, canvas, coords) {
  var x = coords.x;
  var y = coords.y;
  if (pointerInTop(canvas, x, y)) {
    // topInterval = setInterval(function () {
    mouse.animate({
      top: "-=20"
    }, 20);
    // }, 200);
  } else {
    clearInterval(topInterval);
  }

  if (pointerInBottom(canvas, x, y)) {
    // bottomInterval = setInterval(function () {
    mouse.animate({
      top: "+=20"
    }, 20);
    // }, 200);
  } else {
    clearInterval(bottomInterval);
  }

  if (pointerInLeft(canvas, x, y)) {
    // leftInterval = setInterval(function () {
    mouse.animate({
      left: "-=20"
    }, 20);
    // }, 30);
  } else {
    clearInterval(leftInterval);
  }

  if (pointerInRight(canvas, x, y)) {
    // rightInterval = setInterval(function () {
    mouse.animate({
      left: "+=20"
    }, 20);
    // }, 30);
  } else {
    clearInterval(rightInterval);
  }

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

function trackFace(mouse) {
  var video = document.getElementById('video');
  var canvas = $('#guidelines')[0];
  drawGuides(canvas);
  var pointer = $('#object-pointer');

  mouse.show();

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
        top: rect.y + rect.height / 2 - 20,
        left: canvas.width - (rect.x + rect.width / 2 + 20)
      });
    });
  });
}

function stopFaceTracker() {
  tracking.TrackerTask.stop();
}


$(function () {
  var mouse = $("#assistive-arrow");
  mouse.show();
  var trigger = true;

  var mouseEntercallback = function (event) {
    if (!trigger) {
      return;
    }
    mouse.show();
    var x = event.pageX;
    var y = event.pageY;
    var canvas = $('#guidelines')[0];
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGuides(canvas);
    highlightRectFor(canvas, {x: x, y: y, width: 50, height: 50});
    moveMouseFor(mouse, canvas, {x: x, y: y})
  };

  $('body').click(mouseEntercallback);

  $("body").keypress(function (event) {
    // if C is pressed (for click)
    if (event.which == 99) {
      event.preventDefault();
      trigger = false;
      var el = document.elementFromPoint(mouse.offset().left - 5, mouse.offset().top - 5);
      if (el) {
        el.click()
      }
    } else {
      trigger = true;
    }
  });

});
