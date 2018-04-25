function localStorageExists() {
  return typeof(Storage) !== "undefined";
}

// Settings object is used across the pages to handle the settings on localstorage. They toggle on and off various features.

var Settings = {
  updateFontSize: function (fontSize) {
    if (localStorageExists()) {
      localStorage.setItem('fontSize', fontSize);
    }
  },
  
  updateFaceTracker: function (val) {
    if (localStorageExists()) {
      localStorage.setItem('faceTracker', val);
    }
  },
  
  toggleFaceTracker: function () {
    if (localStorageExists()) {
      if (this.isFaceTrackerToggledOn()) {
        localStorage.setItem('faceTracker', "false");
      } else {
        localStorage.setItem('faceTracker', "true")
      }
    }
  },
  
  isFaceTrackerToggledOn: function () {
    if (localStorageExists()) {
      var toggle = localStorage.getItem('faceTracker');
      return toggle === "true";
    }
  },
  
  updateColorTracker: function (val) {
    if (localStorageExists()) {
      localStorage.setItem('colorTracker', val);
    }
  },
  
  toggleColorTracker: function () {
    if (localStorageExists()) {
      if (this.isFaceTrackerToggledOn()) {
        localStorage.setItem('colorTracker', "false");
      } else {
        localStorage.setItem('colorTracker', "true")
      }
    }
  },
  
  isColorTrackerToggledOn: function () {
    if (localStorageExists()) {
      var toggle = localStorage.getItem('colorTracker');
      return toggle === "true";
    }
  },
  
  toggleScreenReader: function () {
    if (localStorageExists()) {
      if (this.isScreenReaderToggledOn()) {
        localStorage.setItem('screenReader', "false");
      } else {
        localStorage.setItem('screenReader', "true")
      }
    }
  },
  isScreenReaderToggledOn: function () {
    if (localStorageExists()) {
      var toggle = localStorage.getItem('screenReader');
      return toggle === "true";
    }
  },
  
  changeReaderSettings: function (rate) {
    if (localStorageExists()) {
      localStorage.setItem("readerRate", rate);
    }
  }
};

function updateFontSize() {
  var rootEl = document.getElementsByTagName('html')[0];
  var fontSize = localStorage.getItem('fontSize');
  if (fontSize) {
    rootEl.style.fontSize = fontSize;
  }
}


function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function updateScreenReaderStatus() {
  var toggle = document.getElementById('screen-reader-toggle');
  toggle.checked = Settings.isScreenReaderToggledOn();
  
  var rate = localStorage.getItem("readerRate");
  var rateRange = document.getElementById('changeReaderRange');
  rateRange.value = rate;
}

ready(function () {
  if (!localStorageExists()) {
    return;
  }
  
  updateFontSize();
  updateScreenReaderStatus();
});
