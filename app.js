var memory = [];

var stackPointer = [0x200]; //Beginning for most programs otherwise 0x600  
var point = 0; //Initialization of dTimer
var myScreen = document.getElementById("myScreen");
var ctx = myScreen.getContext("2d");
var screen = new Array();
var characterAddress = [];
var keyPressed = [0xFF];
var audio = new Audio();
audio.src = "../src/sounds/sound.mp3";

var ratioTimer = 0;

memoryInit();
registers.initVx();
registers.initI();
opcodeTest();
stackPointer = [0x200]; //very important to init 
timers.setDelayCounter(0);
timers.setSoundCounter(0);
point = 0; //very important to init
screenInit();

var cpuTimer = setInterval(pointer, 15); // Cpu frequency = 500Hz 
var frame = setInterval(render, 30);



    