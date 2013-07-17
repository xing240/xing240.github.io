// 移动main中的内容

function scroll(e) {
	document.getElementById('page0').style.color = "rgb(236, 199, 9)";
	document.getElementById('page1').style.color = "rgb(236, 199, 9)";
	document.getElementById('page2').style.color = "rgb(236, 199, 9)";
	document.getElementById('page' + e).style.color = "rgb(238, 233, 251)";
	var p = document.getElementById('main');
	if (p.scrollLeft <= 0 && e != 0) {
		var move = setInterval(function() {
			p.scrollLeft += (6 + 4 * (e - 1));
			if (p.scrollLeft >= 660 * e) {
				clearInterval(move);
				//alert(p.scrollLeft);
			}
		}, 1);
	} else if (p.scrollLeft <= 700 && e != 1) {
		if (e == 2) {
			var move = setInterval(function() {
				p.scrollLeft += 6;
				if (p.scrollLeft >= 1320) {
					clearInterval(move);
					//alert(p.scrollLeft);
				}
			}, 1);
		} else if (e == 0) {
			var move = setInterval(function() {
				p.scrollLeft -= 6;
				if (p.scrollLeft <= 0) {
					clearInterval(move);
					//alert(p.scrollLeft);
				}
			}, 1);
		};
	} else if (p.scrollLeft >= 1300 && e != 2) {
		var move = setInterval(function() {
			p.scrollLeft -= (10 - 4 * e);
			if (p.scrollLeft <= 660 * e) {
				clearInterval(move);
				//alert(p.scrollLeft);
			}
		}, 1);
	}
}