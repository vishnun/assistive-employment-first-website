function localStorageExists() {
  return typeof(Storage) !== "undefined";
}

var Settings = {
  updateFontSize: function (fontSize) {
    if (localStorageExists()) {
      localStorage.setItem('fontSize', fontSize);
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

ready(function () {
  if (!localStorageExists()) {
    return;
  }
  
  updateFontSize();
});
