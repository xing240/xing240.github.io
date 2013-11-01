var canvasDom = document.getElementById('container');
var cxt = canvasDom.getContext("2d");
var canvasWidth = 0,
	canvasHeight = 0;
var preys = [];
var score = 0;
window.onload = init;
//白球
var player = {
	x: 200,
	y: 300,
	r: 10,
	color: "rgb(255, 255, 255)"
};
//红球
function Prey(x, y, r, moveX, moveY, color) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.moveX = moveX;
	this.moveY = moveY;
	this.color = color;
	this.exist = true;
}
//画圈
function DrawRound(x, y, r, color) {
	cxt.fillStyle = color;
	cxt.beginPath();
	cxt.arc(x, y, r, 0, Math.PI * 2, true);
	cxt.closePath();
	cxt.fill();
}
//成绩显示

function drawScore() {
	cxt.fillStyle = "#f0f0f0";
	cxt.font = "30px Arial";
	cxt.fillText("分数：" + score, canvasWidth - 200, 50);
}
//画布
function canvasDraw() {
	cxt.clearRect(0, 0, canvasWidth, canvasHeight);
	DrawRound(player.x, player.y, player.r, player.color);
	preys.forEach(function(prey) {
		DrawRound(prey.x, prey.y, prey.r, prey.color);
	});
	drawScore();
}

//碰撞处理

function collision() {
	preys.forEach(function(prey) {
		var distanceX = Math.abs(player.x - prey.x);
		var distanceY = Math.abs(player.y - prey.y);
		var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
		if (distance < player.r + prey.r-2) {
			if (player.r > prey.r) {
				prey.exist = false;
				score += prey.r;
				player.r += prey.r/100+0.5;
			} else {
				alert("Game over!!!");
				location.reload();
			}
		}
	});
}
//产生红球
function producePrey() {
	if (preys.length < 25) {
		var w = Math.random() * canvasWidth,
			h = Math.random() * canvasHeight,
			r = parseInt(Math.random() * 40 + player.r*0.7 - 6),
			ws = Math.random() * 3 + 1,
			hs = Math.random() * 3 + 1,
			negative = Math.random() >= 0.5 ? 1 : -1,
			boo = Math.random();
		if (boo <= 0.25) {
			preys.push(new Prey(0, h, r, ws, negative * hs, "red"));
		} else if (boo <= 0.5) {
			preys.push(new Prey(canvasWidth, h, r, -1 * ws, negative * hs, "red"));
		} else if (boo <= 0.75) {
			preys.push(new Prey(w, 0, r, negative * ws, hs, "red"));
		} else {
			preys.push(new Prey(w, canvasHeight, r, negative * ws, -1 * hs, "red"));
		}
	}
}
//游戏运行
function run() {
	preys.forEach(function(prey) {
		prey.x += prey.moveX;
		prey.y += prey.moveY;
		if (prey.x + prey.r < 0 || prey.x - prey.r > canvasWidth || prey.y + prey.r < 0 || prey.y - prey.r > canvasHeight) {
			prey.exist = false;
		}
	});
	preys = preys.filter(function(prey) {
		return prey.exist;
	});
	collision();
	producePrey();
	canvasDraw();
}

//跨浏览器获取窗口大小

function setCanvasSize() {
	canvasWidth = window.innerWidth;
	canvasHeight = window.innerHeight;
	if (typeof canvasWidth != "number") {
		alert(canvasHeight);
		if (document.compatMode == "CSS1Compat") {
			canvasWidth = document.documentElement.clientWidth;
			canvasHeight = document.documentElement.clientHeight;
		} else {
			canvasWidth = document.body.clientWidth;
			canvasHeight = document.body.clientHeight;
		}
	};
	canvasDom.width = canvasWidth;
	canvasDom.height = canvasHeight;
}
//跨浏览器事件添加

function addHandler(element, type, handler) {
	if (element.addEventListener) {
		element.addEventListener(type, handler, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + type, handler);
	} else {
		element["on" + type] = handler;
	}
}
//玩家移动
var move = function(e) {
	var mouseX = e.clientX,
		mouseY = e.clientY,
		distance = player.r;
	if (mouseX > distance && mouseX < canvasWidth - distance) {
		player.x = mouseX;
	}
	if (mouseY > distance && mouseY < canvasHeight - distance) {
		player.y = mouseY;
	}
};
//初始化
function init() {
	setCanvasSize();
	addHandler(canvasDom, "mousemove", move);
	var interval = setInterval("run()", 30);
}