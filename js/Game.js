(function() {
    var Game = window.Game = function() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.fno = 0;
        this.init();
        this.score = 0;
        var _this = this;
        this.load(function() {
           _this.start();
       })
    }
    Game.prototype = {
        init: function() {
            var canvasW = document.documentElement.clientWidth;
            var canvasH = document.documentElement.clientHeight;
            if(canvasW > 414) {
                canvasW = 414;
            }else if(canvasW < 320) {
                canvasW = 320;
            }
            if(canvasH > 736) {
                canvasH = 736;
            }else if(canvasH < 568) {
                canvasH = 568;
            }
            this.canvas.width = canvasW;
            this.canvas.height = canvasH;
        },
        load: function(callback) {
            this.m = {};
            var allMaterial = 0;
            var _this = this;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                    var obj = JSON.parse(xhr.responseText);
                    for (var i = 0; i < obj.images.length; i++) {
                        _this.m[obj.images[i].name] = new Image();
                        _this.m[obj.images[i].name].src = obj.images[i].url;
                        _this.m[obj.images[i].name].onload = function() {
                            allMaterial++;
                            _this.ctx.clearRect(0,0,_this.canvas.width,_this.canvas.height);
                            var text = "正在加载资源，请稍等...";
                            _this.ctx.font = "20px Microsoft Yahei";
                            _this.ctx.textAlign = "center";
                            _this.ctx.fillStyle = "#000";
                            _this.ctx.fillText(text,_this.canvas.width / 2,_this.canvas.height * (1 - 0.618));
                            if(allMaterial == obj.images.length) {
                                callback();
                            }
                        }
                    }
                }
            }
            xhr.open("get","./m.json",true);
            xhr.send(null);
        },
        start: function() {
            var _this = this;
            this.sm = new SceneManager();
            this.timer = setInterval(function() {
                _this.fno++;
                _this.ctx.clearRect(0,0,_this.canvas.width,_this.canvas.height);
                _this.sm.update();
                _this.sm.render();
                _this.ctx.font = "16px Microsoft Yahei";
                _this.ctx.textAlign = "left";
                _this.ctx.fillStyle = "#000";
                _this.ctx.fillText("FNO：" + _this.fno,10,20);
                _this.ctx.fillText("场景号：" + _this.sm.smnumber,10,50);
            },20)
        }
    }
})()