function localStorageExists() {
	if (typeof(Storage) !== "undefined") {
		return true;
	}
	return false;
}

var Settings = {
	updateFontSize: function(fontSize) {
		if (localStorageExists()) {
			localStorage.setItem('fontSize', fontSize);
		}
	},
  screenReaderOn: function () {
    if (localStorageExists()) {
      localStorage.getItem('screenReader');
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

ready(function() {
	if (!localStorageExists()) {
		return;
	}

	updateFontSize();
});
