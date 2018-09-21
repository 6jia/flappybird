
(function() {
    var Bird = window.Bird = function() {
        this.color = parseInt(Math.random() * 3);
        this.birdArr = [
            game.m["bird" + this.color + "_0"],
            game.m["bird" + this.color + "_1"],
            game.m["bird" + this.color + "_2"]
        ];
        this.wingStep = 0;
        this.x = game.canvas.width * (1 - 0.618)  -24;
        this.y = 100;
        this.fno = 0;
        this.d = 0;
        this.hasEnergy = false;
    }
    Bird.prototype = {
        update: function() {
            this.wing();
            if(!this.hasEnergy) {
                this.y += parseInt(this.fno * 0.53);
            }else {
                this.y -= parseInt((20 - this.fno) * 0.51);
                if(this.fno > 20){
                    this.hasEnergy = false;
                    this.fno = 0;
                }
            }
            this.d += 0.04;
            this.fno++;

            if(this.y < 0){
                this.y = 0;
            }

            this.T = this.y - 12;
		    this.R = this.x + 17; 
		    this.B = this.y + 12;
            this.L = this.x - 17;
            if(this.B > game.canvas.height * 0.78){

                game.sm.enter(4);
            }
        },
        render: function() {
            game.ctx.save();
            game.ctx.translate(this.x, this.y);
            game.ctx.rotate(this.d);
            game.ctx.drawImage(this.birdArr[this.wingStep],-24,-24);
            game.ctx.restore();
            
        },
        fly: function() {
            this.hasEnergy = true;
            this.d = -0.6;
            this.fno = 0;
        },
        wing: function() {
            if(game.fno % 3 == 0) {
                this.wingStep++;
            }
            if(this.wingStep > 2) {
                this.wingStep = 0;
            }
        }
    }
})()