// JavaScript Document

var canvas_height = 500;
var canvas_width = 1000;
var direction = "right";
var snake = new Snake(10,20);
var mancare = new Food();
var paused = false;
var score = 0;
var speed = 100;
var start_game;

var update = function(){
		var head_x = snake.vector[0].x;
		var head_y = snake.vector[0].y;
		eraseRectangle(0,0,1000,500);
		snake.paint();
		mancare.paint();
		if(head_x === mancare.x && head_y === mancare.y){
			mancare.update();
			var tail = {x:head_x, y: head_y};
			snake.vector.unshift(tail); //adauga ce a fost mancat
			score++;
			$("#score_board").text("Score: " + score);
		}
		if(head_x >= (canvas_width/snake.size) || head_x <= -1 || head_y >= canvas_height/snake.size || head_y <= -1){
			clearInterval(start_game);
			gameover();
		}
		
		switch(direction){
			case "left": head_x--; break;
			case "right": head_x++; break;
			case "up": head_y--; break;
			case "down": head_y++; break;
		}
		var tail = snake.vector.pop();
		tail.x = head_x;
		tail.y = head_y;
		snake.vector.unshift(tail);
}
	
$(document).ready(function(e) {
	
	var c = document.getElementById("mCanvas");
	var ctx = c.getContext("2d");

	snake.initializare();
		
	start_game = setInterval(update,speed);
	
	$('body').keydown(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
		switch(code){
			case 40: direction = "down"; break;
			case 38: direction = "up"; break;
			case 37: direction = "left"; break;
			case 39: direction = "right"; break;
			case 80: if(!paused){
						clearInterval(start_game);
						paused = true;
						$('#paused').css("visibility","visible");}
					 else{
						 start_game = setInterval(update,speed);
						 paused=false;
						 $('#paused').css("visibility","hidden");}; break;
			case 107: {speed-=10;clearInterval(start_game);start_game = setInterval(update,speed);}break;
			case 109: {speed+=10;clearInterval(start_game);start_game = setInterval(update,speed);}break;
		} 
    });
});

function updateSnake(){
	
};

function drawRectangle(x,y,w,h,color){
	var c = document.getElementById("mCanvas");
	var ctx = c.getContext("2d");
	ctx.fillStyle = color;
	ctx.fillRect(x,y,w,h);
}

function eraseRectangle(x,y,w,h){
	var c = document.getElementById("mCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,1000,500);
}

function Snake(x,y){
	this.x = x;
	this.y = y;
	this.size = 10;
	this.lungime = 10;
	this.vector = [];
	this.color = '#FF6754';
	this.initializare = function(){
		for(var i=0;i<this.lungime;i++){
			this.vector.push({x: this.lungime - i, y: 0});
		}
	}
	
	this.paint = function(){
		var c = document.getElementById("mCanvas");
		var ctx = c.getContext("2d");
		for(var i=0;i<this.vector.length;i++){
			var s = this.vector[i];
			ctx.fillStyle = this.color;
			ctx.fillRect(s.x*this.size,s.y*this.size,this.size,this.size);
		}
	}
			
}

function Food(){
	this.x = 1;
	this.y = 1;
	this.size = 10;
	this.color = "12A112";
	this.update = function(){
		this.x = Math.round((Math.random() * (canvas_width - this.size)) / this.size);
		this.y = Math.round((Math.random() * (canvas_height - this.size)) / this.size);
	}
	
	this.paint = function(){
		var c = document.getElementById("mCanvas");
		var ctx = c.getContext("2d");
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
		console.log("desenam");
	}

}

function gameover(){
	document.getElementById("game_over").style.visibility="visible";
	$('#yScore').text("Your score is: " + score);
	$('#yScore').css("visibility","visible");
};
	
	
