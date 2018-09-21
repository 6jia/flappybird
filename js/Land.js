(function() {
    var Land = window.Land = function() {
        this.image = game.m["land"];
        this.x = 0;
        this.y = game.canvas.height * 0.78;
        this.w = 336;
        this.h = 112;
        this.speed = 1;
    }
    Land.prototype = {
        update: function() {
            this.x -= this.speed;
            if(this.x < -this.w) {
                this.x = 0;
            }
        },
        render: function() {
            game.ctx.drawImage(this.image,this.x,this.y);
            game.ctx.drawImage(this.image,this.x + this.w,this.y);
			game.ctx.drawImage(this.image,this.x + this.w*2,this.y);
            game.ctx.fillStyle = "#ded895";
		    game.ctx.fillRect(0,this.y + this.h - 1,game.canvas.width,this.y);
        }
    }
})()