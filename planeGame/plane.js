var canvasDom = document.getElementById('container');
var cxt = canvasDom.getContext("2d");
var canvasWidth = 0,
	canvasHeight = 0;
var playerPane = new Image(),
	enemyPane1 = new Image(),
	enemyPane2 = new Image(),
	enemyPane3 = new Image();
playerPane.src = "plane11.png";
enemyPane1.src = "plane31.png";
enemyPane2.src = "plane51.png";
enemyPane3.src = "plane61.png";
var enemys = [];
var bullets = [];
var bulletsType = true,
	bulletTimeout = 0,
	doubleBulletTimeout = 0;
var difficulty = 0;
var score = 0;
var existBigEnemy = false;
window.onload = init;
//玩家飞机
var player = {
	x: 0,
	y: 300,
	width: 70,
	height: 70,
	draw: function() {
		cxt.drawImage(playerPane, this.x, this.y);
	},
	shoot: function(type) {
		if (type) {
			bullets.push(new Bullet(this.x + 80, this.y + 29, 40, 20, type));
		} else {
			bullets.push(new Bullet(this.x + 80, this.y, 40, 20, type));
			bullets.push(new Bullet(this.x + 80, this.y + 60, 40, 20, type));
		}
	}
};
//特殊但药包
var doubleBullet = {
	x: 0,
	y: 0,
	width: 40,
	height: 40,
	exist: false,
	draw: function() {
		cxt.fillStyle = "#457bd5";
		cxt.beginPath();
		cxt.arc(this.x + 15, this.y + 15, 30, 0, Math.PI * 2, true);
		cxt.closePath();
		cxt.fill();
	}
};
//子弹
function Bullet(x, y, width, height, type) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.type = type;
	this.exist = true;
}
Bullet.prototype = {
	constructor: Bullet,
	draw: function() {
		if (this.type) {
			cxt.fillStyle = "#f0f0f0";
			cxt.fillRect(this.x, this.y + 10, 15, 4);
			cxt.fillRect(this.x - 20, this.y + 10, 15, 4);
			cxt.fillRect(this.x - 40, this.y + 10, 15, 4);
		} else {
			cxt.fillStyle = "#457bd5";
			cxt.fillRect(this.x, this.y + 10, 15, 4);
			cxt.fillRect(this.x - 20, this.y + 10, 15, 4);
			cxt.fillRect(this.x - 40, this.y + 10, 15, 4);
		}
	}
}
//敌机
function Enemy(x, y, speed, width, height, lifeValue, type) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.width = width;
	this.height = height;
	this.lifeValue = lifeValue;
	this.type = type;
}
Enemy.prototype = {
	constructor: Enemy,
	draw: function() {
		if (this.type == 1) {
			cxt.drawImage(enemyPane3, this.x, this.y);
		} else if (this.type == 6) {
			cxt.drawImage(enemyPane2, this.x, this.y);
		} else {
			cxt.drawImage(enemyPane1, this.x, this.y);
		}
	}
}
//游戏运行
function run() {
	bulletTimeout++;
	if (bulletTimeout > 10) {
		player.shoot(bulletsType);
		bulletTimeout = 0;
		difficulty++;
	}
	bullets.forEach(function(bullet) {
		bullet.x += 35;
		if (bullet.x >= canvasWidth) {
			bullet.exist = false;
		}
	});
	enemys.forEach(function(enemy) {
		enemy.x -= enemy.speed;
		if (enemy.x <= -300) {
			enemy.lifeValue = 0;
		}
	});
	bullets = bullets.filter(function(bullet) {
		return bullet.exist;
	});
	enemys = enemys.filter(function(enemy) {
		if (enemy.lifeValue <= 0) {
			score += enemy.type * 10;
			if(enemy.type==30){
				existBigEnemy=false;
			}
			return false;
		} else {
			return true;
		}
	});
	doubleBulletTimeout++;
	if (doubleBullet.exist) {
		doubleBullet.x -= 15;
		if (doubleBullet.x < -30) {
			doubleBullet.exist = false;
		}
	}
	if (!bulletsType) {
		if (doubleBulletTimeout > 1000) {
			bulletsType = true;
			doubleBulletTimeout = 0;
		}
	}
	productEnemys();
	collision();
	canvasDraw();
}
//敌机和特殊弹药包产生
function productEnemys() {
	var speed = Math.random() * 12 + 2 + difficulty * 0.03;
	if (Math.random() < 0.03) {
		enemys.push(new Enemy(canvasWidth, Math.random() * (canvasHeight - 70), speed, 80, 70, 1, 1));
	}
	if (Math.random() > 0.995) {
		enemys.push(new Enemy(canvasWidth, Math.random() * (canvasHeight - 140), speed, 150, 110, 6, 6));
	}
	if (Math.random() > 0.999 && !existBigEnemy) {
		existBigEnemy = true;
		enemys.push(new Enemy(canvasWidth, Math.random() * (canvasHeight - 260), speed-5, 350, 250, 15, 30));
	}
	if (doubleBulletTimeout > 1100 && !doubleBullet.exist) {
		doubleBullet.x = canvasWidth;
		doubleBullet.y = Math.random() * (canvasHeight - 150) + 70;
		doubleBullet.exist = true;
		doubleBulletTimeout = 0;
	}
}
//碰撞检验
function isCollide(a, b) {
	return a.x + a.width > b.x + 10 && a.x < b.x + b.width - 10 &&
		a.y < b.y + b.height - 20 && a.y + a.height > b.y + 20;
}
//碰撞处理
function collision() {
	enemys.forEach(function(enemy) {
		if (isCollide(player, enemy)) {
			alert("Game Over!!!");
			location.reload();
		}
		bullets.forEach(function(bullet) {
			if (isCollide(enemy, bullet)) {
				enemy.lifeValue -= 1;
				bullet.exist = false;
			}
		});
	});
	if (isCollide(player, doubleBullet) && doubleBullet.exist) {
		bulletsType = false;
		doubleBullet.exist = false;
		doubleBulletTimeout = 0;
	}
}
//画图
function canvasDraw() {
	cxt.clearRect(0, 0, canvasWidth, canvasHeight);
	player.draw();
	bullets.forEach(function(bullet) {
		bullet.draw();
	});
	enemys.forEach(function(enemy) {
		enemy.draw();
	});
	if (doubleBullet.exist) {
		doubleBullet.draw();
	}
	drawScore();
}
//成绩显示
function drawScore() {
	cxt.fillStyle = "#f0f0f0";
	cxt.font = "30px Arial";
	cxt.fillText("分数：" + score, canvasWidth - 200, 50);
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
//移动玩家飞机
var move =function(e){
	var mouseX = e.clientX,
		mouseY = e.clientY;
	if (mouseX > 40 && mouseX < canvasWidth - 60) {
		player.x = mouseX - 40;
	}
	if (mouseY > 39 && mouseY < canvasHeight - 38) {
		player.y = mouseY - 39;
	}
}
//初始化
function init() {
	canvasWidth = document.body.clientWidth;
	var stop=false;
	setCanvasSize();
	var interval = setInterval("run()", 30);
	addHandler(canvasDom,"click",function(){
		if(!stop){
			clearInterval(interval);
			stop=true;
		}else{
			interval = setInterval("run()", 30);
			stop=false;
		}
	})
	addHandler(canvasDom,"mousemove",move);
	alert("游戏说明:\n   1、单击左键暂停游戏；\n   2、蓝色圆点为特殊弹药。");
}