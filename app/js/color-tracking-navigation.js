// $(function () {
//   var video = document.getElementById('video');
//
//   tracking.ColorTracker.registerColor('TrackColor', function(r, g, b) {
//     var red = r > 180 && r < 230;
//     var green = g < 50 && g > 10;
//     var blue = b < 50 && b > 10;
//     return red && green && blue;
//   });
//
//   var tracker = new tracking.ColorTracker(['TrackColor']);
//
//   var arrow = $("#assistive-arrow");
//
//   tracking.track('#video', tracker, {camera: true});
//
//   tracker.on('track', function (event) {
//     if (event.data.length === 0) {
//       console.log("Can't track anything..");
//       arrow.hide();
//       return;
//     }
//     arrow.show();
//     event.data.forEach(function (rect) {
//       if (rect.color === 'TrackColor') {
//         arrow.css({
//           top: rect.y + rect.height / 2,
//           left: screen.width - (rect.x + rect.width / 2)
//         });
//         // console.log("cyan", rect.x, rect.y, rect.height, rect.width, rect.color);
//       }
//     });
//   });
// });