

function showTechnol() {
	$("#id").val("");
	$("#nadpis").val("");
	$("#obsah").val("");
	document.getElementById("techn_update").style.display = "block";
	$("#add_but").prop('disabled', true);
	$("#tech_err").text("Prázdny vstup!");
}

function hideTechnol() {
	document.getElementById("techn_update").style.display = "none";
}

function setTechnol(id) {
	showTechnol();
	$("#tech_err").text("Neupravený vstup!");
	$.ajax({
		type: "GET",
		url: "../php/get_technol.php",
		data: "id="+id,		
		dataType: 'json',
		success: function(result) {
			$("#id").val(result[0]);
			$("#nadpis").val(result[1]);
			$("#obsah").val(result[2]);
		},
		error: function(ajCont) {
			alert("Nastala chyba!" + ajCont);
		}
	});
}

function delTechnol(id) {
	if (confirm("Ste si istý, že chcete zmazať tento článok?")) {
		$.ajax({
			type: "GET",
			url: "../php/techn_update.php",
			data: "id="+id,
			success: function(result) {
				location.assign("techn");
			},
			error: function(ajCont) {
				alert("Nastala chyba!" + ajCont);
				location.assign("techn");
			}
		});
	}
}

function technCheckInput() {
	var nadpis = $("#nadpis").val();
	var obsah = $("#obsah").val();
	if (nadpis.length < 5) {
		$("#add_but").prop('disabled', true);
		$("#tech_err").text("Krátky nadpis. Nadpis musí obsahovať aspoň 5 znakov.");
	} else if (obsah.length < 15) {
		$("#add_but").prop('disabled', true);
		$("#tech_err").text("Krátky obsah. Obsah musí obsahovať aspoň 15 znakov.");
	} else {
		$("#add_but").prop('disabled', false);
		$("#tech_err").text("");
	}
}