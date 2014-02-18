var answer = new Array(40),
	isShow = new Array(40),
	isFlip = new Array(40),
	showLen = 0,
	memory = 0,
	score = 0;

function addEle(num) {
	var elemId = new Array(num),
		imgId = new Array(num);
	for (i = num / 2; i--;) {
		imgId[i] = imgId[i + num / 2] = parseInt(Math.random() * 15 + 1);
	}
	for (i = num; i--;) {
		elemId[i] = parseInt(Math.random() * 40 + 1);
		// while (isShow[elemId[i]]) {
		// 	elemId[i] = parseInt(Math.random() * 40 + 1);
		// }
		while (isShow[elemId[i]]) {
			if (elemId[i] >= 40) {
				elemId[i] = 1;
			} else {
				elemId[i] += 1;
			}
		}
		answer[elemId[i]] = '<img src="img/element/' + imgId[i] + '.png" />';
		isShow[elemId[i]] = true;
		isFlip[elemId[i]] = false;
		var elem = $('#e' + elemId[i]);
		elem.html('<img src="img/eleBg.jpg" />');
	}
	showLen += num;
};

function time() {
	var t = 90;
	setTimeout(function() {
		if (t > 0) {
			t--;
			$('.time-val').html(t);
			setTimeout(arguments.callee, 1000);
		} else {
			gameOver();
		}
	}, 1000)
};

function run() {
	addEle(6);
	setTimeout(function() {
		if (showLen === 40) {
			gameOver();
		} else {
			if (showLen <= 34) {
				addEle(6);
			} else if (showLen === 36) {
				addEle(4);
			} else if (showLen === 38) {
				addEle(2);
			}
			setTimeout(arguments.callee, 12000);
		}
	}, 12000);
};

function addEvent() {
	$('.element').bind("click", function() {
		var elem = $(this),
			id = elem.attr("id").substring(1);
		if (isShow[id] && !isFlip[id]) {
			elem.flip({
				direction: 'lr',
				speed: 300,
				onBefore: function() {
					elem.html(answer[id]);
				}
			});
			isFlip[id] = true;
			if (memory) {
				var id1 = memory,
					elem1 = $('#e' + memory);
				if (answer[memory] === answer[id]) {
					memory = 0;
					showLen -= 2;
					setTimeout(function() {
						elem.html('<div class="hide"></div>');
						elem1.html('<div class="hide"></div>');
						isShow[id] = false;
						isShow[id1] = false;
						score += 10;
						$('#score-val').html(score);
					}, 1000);
				} else {
					memory = 0;
					setTimeout(function() {
						elem.revertFlip();
						elem1.revertFlip();
						isFlip[id] = false;
						isFlip[id1] = false;
					}, 1000);
				}
			} else {
				memory = id;
			}
		}
	});
};

function gameOver() {
	alert('Game over!!!Your score: ' + score);
	location.reload();
}

$(document).ready(function() {
	run();
	time();
	addEvent();
});