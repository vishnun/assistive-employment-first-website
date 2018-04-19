var gutterWidth = 80;

function drawGuides(canvas) {
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.fillRect(canvas.width / 2 - gutterWidth / 2, canvas.height / 2 - gutterWidth / 2, gutterWidth, gutterWidth);
  ctx.stroke();
  ctx.closePath();
}

function pointerInTop(canvas, x, y) {
  var xSatisfy = x < canvas.width;
  var ySatisfy = y < canvas.height / 2 - gutterWidth / 2;
  return xSatisfy && ySatisfy;
}

function pointerInBottom(canvas, x, y) {
  var xSatisfy = x < canvas.width;
  var ySatisfy = y > canvas.height / 2 + gutterWidth / 2;
  return xSatisfy && ySatisfy;
}

function pointerInLeft(canvas, x, y) {
  var xSatisfy = x < canvas.width / 2 - gutterWidth / 2;
  var ySatisfy = y < canvas.height;
  return xSatisfy && ySatisfy;
}

function pointerInRight(canvas, x, y) {
  var xSatisfy = x > canvas.width / 2 + gutterWidth / 2;
  var ySatisfy = y < canvas.height;
  return xSatisfy && ySatisfy;
}

function moveMouseFor(mouse, canvas, coords) {
  var x = coords.x;
  var y = coords.y;
  if (pointerInTop(canvas, x, y)) {
    mouse.animate({
      top: "-=10"
    }, 10);
  }
  
  if (pointerInBottom(canvas, x, y)) {
    mouse.animate({
      top: "+=10"
    }, 10);
  }
  
  if (pointerInLeft(canvas, x, y)) {
    mouse.animate({
      left: "-=10"
    }, 10);
  }
  
  if (pointerInRight(canvas, x, y)) {
    mouse.animate({
      left: "+=10"
    }, 10);
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

function trackFace(mouse, pointer) {
  var video = document.getElementById('video');
  var canvas = $('#guidelines')[0];
  drawGuides(canvas);
  
  var tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(1);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);
  
  tracking.track('#video', tracker, {camera: true});
  
  var ctx = canvas.getContext("2d");
  var trackingCallback = function (event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGuides(canvas);
    event.data.forEach(function (rect) {
      var left = canvas.width - (rect.x + rect.width / 2 + 20 );
      var top = rect.y + rect.height / 2 - 20;
      plotFaceRect(ctx, rect);
      highlightRectFor(canvas, rect);
      moveMouseFor(mouse, canvas, {x: left, y: top});
      pointer.css({
        top: top,
        left: left
      });
    });
  };
  
  tracker.on('track', trackingCallback);
}


$(function () {
  var mouse = $("#assistive-arrow");
  
  $("body").keypress(function (event) {
    // if C is pressed (for click)
    if (event.which === 99) {
      event.preventDefault();
      var el = document.elementFromPoint(mouse.offset().left - 5, mouse.offset().top - 5);
      if (el) {
        el.click()
      }
    }
    if (event.which === 114) {
      mouse.css({
        left: 500, top: 500
      });
    }
  });
  
});
