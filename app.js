
var myScreen = document.getElementById("myScreen");
var ctx = myScreen.getContext("2d");
var audio = new Audio();
audio.src = "../src/sounds/sound.mp3";
var keyPressed = [0xFF];

var chip8 =function() {

var screen = new Array();

memory.memoryInit();
registers.initVx();
registers.initI();

opcodeTest();

timers.setDelayCounter(0);
timers.setSoundCounter(0);

screenInit();

}

chip8();

var cpuTimer = setInterval(callstack.pointer, 15); // Cpu frequency = 500Hz 
var frame = setInterval(render, 30);

    