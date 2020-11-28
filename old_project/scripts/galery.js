
function galDisplay(par) {
	var gal = document.getElementById("galery_full");
	gal.style.display = "block";
	gal.innerHTML = "<img src=\"" + par + "\" alt=\"Kliknutim na pozadie zatvoríš.\">";
}

function galHide() {
	document.getElementById("galery_full").style.display = "none";
}