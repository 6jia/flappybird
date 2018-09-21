(function() {
    var SceneManager = window.SceneManager = function() {
        this.smnumber = 1;
        game.bg = new Bg();
        game.land = new Land();
        game.bird = new Bird();
        this.title = game.m["title"];
        this.play = game.m["button_play"];
        this.tutorial = game.m["tutorial"];
        this.titleX = game.canvas.width /2 - 89;
        this.titleY = -48;
        this.playX = game.canvas.width /2 - 58;
        this.playY = game.canvas.height;
        game.pipeArr = [];
        this.bindEvent();
    }
    SceneManager.prototype = {
        update: function() {
            switch (this.smnumber) {
                case 1:
                    this.titleY += 10;
                    if(this.titleY > 120) {
                        this.titleY = 120;
                    }
                    this.playY -= 20;
                    if(this.playY < 260) {
                        this.playY =260;
                    }
                    break;
                case 2:
                    game.bird.wing();
				    this.tutorialOpacity += this.tutorialOpacityIsDown ? -0.1 : 0.1;
				    if(this.tutorialOpacity < 0.1 || this.tutorialOpacity > 0.9){
					    this.tutorialOpacityIsDown = !this.tutorialOpacityIsDown;
				    }
                    break;
                case 3:
                    game.bg.update();
                    game.land.update();
                    game.bird.update();
                    for(var i = 0; i < game.pipeArr.length; i++) {
                        game.pipeArr[i].update();
                    }
                    if(game.fno % 150 == 0){
                        new Pipe();
                    }
                    break;
                case 4:
                    if(game.bird.y > game.canvas.height * 0.78 - 17){
                        this.isBirdLand = true;
                    }
                    this.birdfno++;
                    if(!this.isBirdLand){
                        game.bird.y += 1.4 * this.birdfno;
                    }else{
                        game.fno % 4 == 0 && this.bombStep ++;
                    }
                    this.maskOpacity -= 0.1;
                    if(this.maskOpacity < 0){
                        this.maskOpacity = 0;
                    }
                    break; 
            }
        },
        render: function() {
            switch (this.smnumber) {
                case 1:
                    game.bg.render();
                    game.land.render();
                    game.bird.render();
				    game.bird.x = game.canvas.width / 2;
				    game.bird.y = 220;
                    game.ctx.drawImage(this.title,this.titleX,this.titleY);
                    game.ctx.drawImage(this.play,this.playX,this.playY);
                    break;
                case 2:
                    game.bg.render();
                    game.land.render();
                    game.bird.render();
                    game.ctx.save();
				    game.ctx.globalAlpha = this.tutorialOpacity;
				    game.ctx.drawImage(this.tutorial,game.canvas.width / 2 - 57 , 280);
				    game.ctx.restore();
				break;
                    break;
                case 3:
                    game.bg.render();
                    game.land.render();
                    game.bird.render();
                    for(var i = 0; i < game.pipeArr.length; i++) {
                        game.pipeArr[i].render();
                    }
                    var scoreLength = game.score.toString().length;
                    for(var i = 0 ; i < scoreLength ; i++ ){
                        game.ctx.drawImage(game.m["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i,100);
                    }
                    break;
                case 4:
                    game.bg.render();
                    game.land.render();
                    if(!this.isBirdLand){
                        game.bird.render();
                    }else{
                        if(this.bombStep <= 11){
                            game.ctx.drawImage(game.m["b" + this.bombStep],game.bird.x - 24 - 36, game.bird.y - 24 - 60);
                        }else{
                            this.enter(5);
                        }
                    }
                    for (var i = 0; i < game.pipeArr.length; i++) {
                        game.pipeArr[i] && game.pipeArr[i].render();
                    }
                    game.ctx.fillStyle = "rgba(255,255,255," + this.maskOpacity + ")";
                    game.ctx.fillRect(0,0,game.canvas.width , game.canvas.height);
                    var scoreLength = game.score.toString().length;
                    for(var i = 0 ; i < scoreLength ; i++ ){
                        game.ctx.drawImage(game.m["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i,100);
                    }
                    break;
                case 5: 
                    game.bg.render();
                    game.land.render();
                    for (var i = 0; i < game.pipeArr.length; i++) {
                        game.pipeArr[i] && game.pipeArr[i].render();
                    }
                    var scoreLength = game.score.toString().length;
                    for(var i = 0 ; i < scoreLength ; i++ ){
                        game.ctx.drawImage(game.m["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i,100);
                    }
                    game.ctx.drawImage(game.m["text_game_over"],game.canvas.width / 2 - 102 , 200);
                    break;
            }
        },
        enter: function(number) {
            this.smnumber = number;
            switch (this.smnumber) {
                case 1:
                    this.titleY = -48;
                    this.playY = game.canvas.height;
                    game.bird = new Bird();
				    game.score = 0;
                    break;
                case 2:
                    game.bird.y = 150;
                    this.tutorialOpacity = 1;
                    this.tutorialOpacityIsDown = true;
                    break;
                case 3:
                    game.pipeArr = new Array();
                    break;
                case 4:
                    this.maskOpacity = 1;
                    this.isBirdLand = false; 
                    this.birdfno = 0;
                    this.bombStep = 0;
                    break;
                case 5 :
                    break;
            }
        },
        bindEvent: function() {
            var _this = this;
            game.canvas.onclick = function(event) {
                handleClick(event.clientX,event.clientY)
            }
            function handleClick(mouseX,mouseY) {
                switch (_this.smnumber) {
                    case 1:
                        if(mouseX > _this.playX && mouseX < _this.playX + 116 && mouseY > _this.playY && mouseY < _this.playY + 70) {
                            _this.enter(2);
                        }
                        break;
                    case 2:
                        _this.enter(3);
                        break;
                    case 3:
                        game.bird.fly();
                        break;
                    case 5 : 
                     _this.enter(1);
                        break;
                }
            }
        }
    }
})()