(function() {
 var Pipe = window.Pipe = function() {
    this.pipeDown = game.m["pipe_down"];
    this.pipeUp = game.m["pipe_up"];
    this.allheight = game.canvas.height * 0.78;
    this.gap = 160;
    this.pipeH = 320;
    this.downH = 100 + parseInt(Math.random() * (this.pipeH - 100));
    this.upH = this.allheight - this.downH - this.gap;
    this.x = game.canvas.width;
    game.pipeArr.push(this);
    this.speed = 2;
 }
 Pipe.prototype = {
     update: function() {
        this.x -= this.speed;
		if(game.bird.R > this.x && game.bird.L < this.x + 52){
			if(game.bird.T < this.downH || game.bird.B > this.downH + this.gap){
         		game.sm.enter(4);
     		}
        }
        if(this.x < -52){
			for (var i = 0; i < game.pipeArr.length; i++) {
				if(game.pipeArr[i] === this){
					game.pipeArr.splice(i,1);
				}
			}
        }
        if(game.bird.R > this.x + 52 && !this.alreadyPass){
			game.score ++;
			this.alreadyPass = true;
		}
     },
     render: function() {
        game.ctx.drawImage(this.pipeDown,0,this.pipeH - this.downH,52,this.downH,this.x,0,52,this.downH);
		game.ctx.drawImage(this.pipeUp,0,0,52,this.upH,this.x,this.gap + this.downH,52,this.upH);
     }
 }
})()