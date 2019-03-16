
var myScreen = document.getElementById("myScreen");
var ctx = myScreen.getContext("2d");
var sound = new Tone.Oscillator(440, "sine").toMaster();


//var audio = new Audio();
//audio.src = "../src/sounds/sound.mp3";
var keyPressed = [0xFF];

var chip8 =function() {



memory= new memory(this);
callstack = new callstack(this);
registers = new registers(this);
screen = new screen();
timers= new timers();
opcodeTest();

timers.setDelayCounter(0);
timers.setSoundCounter(0);


}

chip8();
var context = this;
var cpuTimer = setInterval(function(){return context.callstack.pointer();}, 15); // Cpu frequency = 500Hz 
var frame = requestAnimationFrame(function(){return context.screen.render()});

    