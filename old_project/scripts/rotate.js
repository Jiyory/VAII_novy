
var rot_actID;
var rot_bars;
var rot_buttons;

function startRotate() {
	rot_actID = 0;
	rot_bars = document.getElementsByClassName("rot_info");
	for (var i = 1; i < rot_bars.length; ++i) 
		rot_bars[i].style.opacity = 0;
	
	rot_buttons = document.getElementById("rot_buttons");
	rotUpdateButtons();
	
	setInterval(function() {
		rotateRight();
	}, 10000);
}

function rotUpdateButtons() {
	var buttons = "";
	for (var i = 0; i < rot_bars.length; ++i) {
		if (i == rot_actID)
			buttons += "<span class=\"active\" href=\"\" onclick=\"rotateTo(" + i + ")\">&otimes;</span>";
		else
			buttons += "<span href=\"\" onclick=\"rotateTo(" + i + ")\">&otimes;</span>";
	}
	rot_buttons.innerHTML = buttons;
}

function rotateRight() {
	rot_bars[rot_actID].style.opacity = 0;
	++rot_actID;
	if (rot_actID >= rot_bars.length)
		rot_actID = 0;
	
	rot_bars[rot_actID].style.opacity = 1;
	rotUpdateButtons();
}

function rotateLeft() {
	rot_bars[rot_actID].style.opacity = 0;
	--rot_actID;
	if (rot_actID < 0)
		rot_actID = rot_bars.length - 1;
	
	rot_bars[rot_actID].style.opacity = 1;
	rotUpdateButtons();
}

function rotateTo(number) {
	if (number >= 0 && number < rot_bars.length) {
		rot_bars[rot_actID].style.opacity = 0;
		rot_actID = number;
		rot_bars[rot_actID].style.opacity = 1;
	}
	rotUpdateButtons();
}