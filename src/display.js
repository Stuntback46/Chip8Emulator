var screen = (function(){

function screen(){
this.onScreen = new Array();
this.init();
}

screen.prototype.display=function (row, x, y, I)
{

var sprite = memory.ram[I];
let result = 0;
registers.Vx[(0xF)] = (0x00);
let ox = 0;
let oy = 0;
        for ( var z = 0; z < row; z++) {
            sprite = memory.ram[I + z];

            for (var i = 0; i < 8; i++) {
                //used to manage if we try to draw a pixel out of screen     
                if ((x + i) > 63) {
                    ox = -64;
                }
                if ((y + z) > 31) {
                    oy = -32;
                }
                //check if the pixel is already lighted on the screen
                // if yes result = 1
                result = (((sprite >> (7 - i)) & 0x01) & (this.onScreen[y + z + oy][x + i + ox]))
                if (result > 0) {
                    registers.Vx[(0xF)] = (0x01);
                }
               
                //xor pixel on screen and pixel in memory
                (this.onScreen[y + z + oy][x + i + ox]) = ((this.onScreen[y + z + oy][x + i + ox]) ^ ((sprite >> (7 - i)) & 0x001));
                ox = 0;
                oy = 0;
            }

        }
        //reads the screen memory and display the pixel on screen
}

screen.prototype.render = function() {
        ctx.clearRect(0, 0, 512, 256);
        for (var i = 0; i < 32; i++) {
            for (var j = 0; j < 64; j++) {
                if (this.onScreen[i][j] > 0) {
                    ctx.beginPath();
                    ctx.rect(j * 8, i * 8, 8, 8);
                    ctx.fillStyle = "yellow";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
        frame = requestAnimationFrame(function(){return window.screen.render()});
    }

screen.prototype.init = function() { //used to initialize the real screen and the screen memory
        ctx.clearRect(0, 0, 512, 256);
        for (var i = 0; i < 32; i++) {
            this.onScreen[i] = new Array();

        }
        for (var i = 0; i < 32; i++) {
            for (var j = 0; j < 64; j++) {
                this.onScreen[i][j] = 0;
            }
            //screen[y][x]
        }
        console.log("Screen Initialized")
    }
     return screen;
})();
       