// $(function () {
//   var video = document.getElementById('video');
//
//   tracking.ColorTracker.registerColor('TrackColor', function (r, g, b) {
//     var red = r > 170 && r < 200;
//     var green = g > 148 && g < 180;
//     var blue = b > 40 && b < 100;
//     return red && green && blue;
//   });
//
//   var tracker = new tracking.ColorTracker(['TrackColor']);
//
//   var arrow = $("#assistive-arrow");
//   tracking.track('#video', tracker, {camera: true});
//
//   arrow.show();
//
//   tracker.on('track', function (event) {
//     event.data.forEach(function (rect) {
//       if (rect.color === 'TrackColor') {
//         arrow.css({
//           top: rect.y + rect.height / 2,
//           left: screen.width - (rect.x + rect.width / 2)
//         });
//         console.log("color:", rect.x, rect.y, rect.height, rect.width, rect.color);
//       }
//     });
//   });
// });
