var registersChip8 = (function(){
var registersChip8 = function(){
this.Vx=[];  
for (var i = 0; i <= (0xF); i++) 
        {
            this.Vx[i] = 0x00;
            console.log("Vx[" + i + "] initialized to:"+this.Vx[i]);
        }
this.I=0x0000;
console.log("I initialized to: "+ this.I);
};
return registersChip8;
})();

