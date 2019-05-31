var clockChip8 = (function(){
    var clockChip8 = function(){
this.isOn=false;
var cpuTimer
var frame
};

clockChip8.prototype.startClock=function(){
cpuTimer = setInterval(function(){return window.callstack.pointer();}, 20); // Cpu frequency = 500Hz 
frame = requestAnimationFrame(function(){return window.screen.render()});
this.isOn=true;
}
clockChip8.prototype.stopClock=function(){
clearInterval(cpuTimer);
screen.render();
window.cancelAnimationFrame(frame);
this.isOn=false;
}
return clockChip8;
})();
