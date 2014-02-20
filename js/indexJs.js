// 移动main中的内容
var memory = "0";
var move = 0;

function scroll(e) {
	if (memory != e) {
		clearInterval(move);
		var oldPage = document.getElementById('page' + memory);
		oldPage.style.color = "rgb(236, 199, 9)";
		oldPage.style.cursor = "pointer";
		memory = e;
		var newPage = document.getElementById('page' + e);
		newPage.style.color = "rgb(238, 233, 251)";
		newPage.style.cursor = "text";
		var p = document.getElementById('main');
		if (p.scrollLeft <= 660 && e != 0) {
			move = setInterval(function() {
				p.scrollLeft += (20 + 10 * (e - 1));
				if (p.scrollLeft == 660 * e) {
					clearInterval(move);
				}
			}, 4);
		} else if (p.scrollLeft < 1320) {
			if (e === 2) {
				move = setInterval(function() {
					p.scrollLeft += 20;
					if (p.scrollLeft == 1320) {
						clearInterval(move);
					}
				}, 4);
			} else {
				move = setInterval(function() {
					p.scrollLeft -= 20;
					if (p.scrollLeft == 660 * e) {
						clearInterval(move);
					}
				}, 4);
			};
		} else if (p.scrollLeft >= 1320) {
			move = setInterval(function() {
				p.scrollLeft -= (30 - 10 * e);
				if (p.scrollLeft == 660 * e) {
					clearInterval(move);
				}
			}, 4);
		}
	}
};