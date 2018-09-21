(function() {
    var Bg = window.Bg = function() {
        this.image = game.m["bg_day"];
        this.x = 0;
        this.y = game.canvas.height * 0.78 -400;
        this.w = 288;
        this.h = 512;
        this.speed = 1;
    }
    Bg.prototype = {
        update: function() {
            this.x -= this.speed;
            if(this.x < -this.w) {
                this.x = 0;
            }
        },
        render: function() {
            game.ctx.drawImage(this.image,this.x,this.y);
            game.ctx.drawImage(this.image, this.x + this.w, this.y);
            game.ctx.drawImage(this.image, this.x + this.w * 2, this.y);
            game.ctx.fillStyle = "#4ec0ca";
            game.ctx.fillRect(0,0,game.canvas.width,this.y + 1);
            game.ctx.fillStyle = "#5ee270";
		    game.ctx.fillRect(0,this.y + this.h - 1,game.canvas.width,this.y);
        }
    }
})()