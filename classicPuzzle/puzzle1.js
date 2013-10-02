window.onload = downLoad;
var contentWidth = 6,
	contentHeight = 4,
	defaultTarget = contentWidth * contentHeight - 1,
	targetClass = "b" + defaultTarget,
	count = 0;

function downLoad() {
	init();
	addListener();
	time();
	flashLogo();
}

function init() {
	var element = "",
		elementArray = [],
		num = 0;
	for (var i = 0; i < contentHeight; i++) {
		for (var j = 0; j < contentWidth; j++) {
			if (num < defaultTarget) {
				elementArray.push("<div id='a" + num + "' onclick='move(this)' style='background-position:" +
					parseInt(-j * 100) + "px " + parseInt(-i * 100) + "px'></div>");
				num++;
			}
		};
	};
	var len = elementArray.length;
	for (var i = 0; i < len; i++) {
		var rand = parseInt(elementArray.length * Math.random());
		element += elementArray[rand];
		elementArray.splice(rand, 1);
	}
	element += "<div id='a" + defaultTarget + "' style='display: none;background-position:" +
		parseInt(-(contentWidth - 1) * 100) + "px " + parseInt(-(contentHeight - 1) * 100) +
		"px;bottom:0px;right:0px'></div>"
	var content = document.getElementById("content");
	content.innerHTML = element;
	elementArray = content.getElementsByTagName("div");
	num = 0;
	for (var i = 0; i < contentHeight; i++) {
		for (var j = 0; j < contentWidth; j++) {
			if (num < defaultTarget) {
				elementArray[num].className = "b" + num;
				elementArray[num].style.top = i * 100 + "px";
				elementArray[num].style.left = j * 100 + "px";
			}
			num++;
		};
	};
}

function move(on) {
	if (moveAction(on)) {
		var onName = on.className;
		on.className = targetClass;
		targetClass = onName;
		if (targetClass == "b" + defaultTarget && check()) {
			showWin();
		}
		document.getElementById("step-count").innerHTML = ++count;
	}
}

function moveAction(on) {
	var i = parseInt(on.className.substring(1)),
		targetNum = parseInt(targetClass.substring(1)),
		posit = 0,
		stop = 0;
	if (targetNum + contentWidth == i) {
		posit = parseInt(on.style.top);
		stop = posit - 100;
		var interval = setInterval(function() {
			if (posit > stop) {
				posit -= 20;
				on.style.top = (posit) + "px";
			} else {
				clearInterval(interval);
			}
		}, 10);
		return true;
	}
	if (targetNum - contentWidth == i) {
		posit = parseInt(on.style.top);
		stop = posit + 100;
		var interval = setInterval(function() {
			if (posit < stop) {
				posit += 20;
				on.style.top = (posit) + "px";
			} else {
				clearInterval(interval);
			}
		}, 10);
		return true;
	}
	if (targetNum + 1 == i && !(i % contentWidth == 0)) {
		posit = parseInt(on.style.left);
		stop = posit - 100;
		var interval = setInterval(function() {
			if (posit > stop) {
				posit -= 20;
				on.style.left = (posit) + "px";
			} else {
				clearInterval(interval);
			}
		}, 10);
		return true;
	}
	if (targetNum - 1 == i && !(i % contentWidth == parseInt(contentWidth - 1))) {
		posit = parseInt(on.style.left);
		stop = posit + 100;
		var interval = setInterval(function() {
			if (posit < stop) {
				posit += 20;
				on.style.left = (posit) + "px";
			} else {
				clearInterval(interval);
			}
		}, 10);
		return true;
	}
	return false;
}

function check() {
	var contentDiv = document.getElementById("content").getElementsByTagName("div"),
		len = contentDiv.length - 1;
	for (var i = 0; i < len; i++) {
		if (contentDiv[i].id.substring(1) != contentDiv[i].className.substring(1)) {
			return false;
		};
	};
	return true;
}

function showWin() {
	document.getElementById("a" + defaultTarget).style.display = "block";
	alert("你赢了!");
}

function setDifficulty(n) {
	var content = document.getElementById("content"),
		contentDiv = content.getElementsByTagName("div"),
		contentDiv = document.getElementById("content").getElementsByTagName("div");
	contentWidth = parseInt(2 * n + 2);
	contentHeight = parseInt(n + 2);
	defaultTarget = contentWidth * contentHeight - 1,
	targetClass = "b" + defaultTarget;
	content.style.width = contentWidth * 100 + "px";
	content.style.height = contentHeight * 100 + "px";
	init();
	for (var i = 0; i < contentDiv.length; i++) {
		contentDiv[i].style.backgroundSize = contentWidth * 100 + "px " + contentHeight * 100 + "px";
	};
}

function changeImg(url) {
	var elementArray = document.getElementById("content").getElementsByTagName("div");
	var len = elementArray.length;
	for (var i = 0; i < len; i++) {
		elementArray[i].style.backgroundImage = "url(" + url + ")";
	};
	document.getElementById("imge0").style.backgroundImage = "url(" + url + ")";
}

function showAnswer() {
	var answer = document.getElementById("answer");
	var answerTop = parseInt(answer.style.top);
	if (answerTop != -30) {
		answer.style.top = "-30px";
	} else {
		answer.style.top = "-330px";
	}
}

function time() {
	var s = 0,
		m = 0,
		start = setInterval(startCount, 1000);

	function startCount() {
		if (s < 60) {
			s++;
		} else {
			s = 0;
			m++;
		}
		if (m >= 60) {
			alert("你超时了！");
		}
		document.getElementById("time").innerHTML = m + ':' + s;
	}
}

function flashLogo(){
		var i=0,j=0;
		var ele = document.getElementById("logo").getElementsByTagName("span");
		var color = ['#f06','#33b5e5','#00f','#0f0','#f00','#fff','#fa0','#f03','#0ef','#fc0','#f00'];
		setInterval(function(){
			for(i=0;i<ele.length;i++){
				var random = Math.round(10 * Math.random());
				ele[i].style.color = color[random];
			}
		},1000);
	}

function addListener() {
	//添加触发难度控制的事件
	document.getElementById("difficulty1").onclick = function() {
		setDifficulty(1);
	}
	document.getElementById("difficulty2").onclick = function() {
		setDifficulty(2);
	}
	document.getElementById("difficulty3").onclick = function() {
		setDifficulty(3);
	}
	//添加切换图片的事件
	document.getElementById("imge1").onclick = function() {
		changeImg("1.jpg");
	}
	document.getElementById("imge2").onclick = function() {
		changeImg("2.jpg");
	}
	document.getElementById("imge3").onclick = function() {
		changeImg("3.jpg");
	}
	//添加查看原图的事件触发
	document.getElementById("switch").onclick = function() {
		showAnswer();
	}
}