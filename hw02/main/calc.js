"use strict";
var inProgress = 0;
function calculate(s) {
	console.log(typeof document.getElementById("res").innerText);
	if (s == '\+' || s == '\-' || s == 'x' || s == '\/') {
		inProgress += 1;
		console.log(inProgress);
	}
	if (s == 'c') {
		inProgress = 0;
		document.getElementById("res").innerText = '';
	}
	else if (inProgress < 2) {
		var curNum = document.getElementById("res").innerText + s.toString();
		document.getElementById("res").innerText = curNum;
		console.log(curNum);
	}
	else {
		inProgress = 0;
		document.getElementById("res").innerText = evaluate(document.getElementById("res").innerText, 0);
	}	
}

function evaluate(s, p) {
	var num1 = "";
	var func = "none";
	for(let i = p; i < s.length; i++) {
		if (s[i] == '\+' || s[i] == '\-' || s[i] == '\/' || s[i] == 'x') {
			func = s[i];
			p = i + 1;
			break;
		} else {
			num1 += s[i];
		}
	}
	switch (func) {
		case '\+':
			return Number(num1) + Number(s.substring(p,));
		case '\-':
			return Number(num1) - Number(s.substring(p,));
		case 'x':
			return Number(num1) * Number(s.substring(p,));
		case '\/':
			if (Number(s.substring(p,)) == 0) {
				return "Err";
			} else {
				return Number(num1) / Number(s.substring(p,));
			}
		default:
			return Number(num1);
	}
}
	
