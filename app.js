var memory = [];

var myScreen = document.getElementById("myScreen");
var ctx = myScreen.getContext("2d");
var screen = new Array();
var characterAddress = [];
var keyPressed = [0xFF];
var audio = new Audio();
audio.src = "../src/sounds/sound.mp3";



memoryInit();
registers.initVx();
registers.initI();
opcodeTest();
callstack.stackPointer = [0x200]; //very important to init 
timers.setDelayCounter(0);
timers.setSoundCounter(0);
callstack.stack = 0; //very important to init
screenInit();

var cpuTimer = setInterval(callstack.pointer, 15); // Cpu frequency = 500Hz 
var frame = setInterval(render, 30);



    