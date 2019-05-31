var myScreen = document.getElementById("myScreen");
var ctx = myScreen.getContext("2d");
var sound = new Tone.Oscillator(800, "sine").toMaster();


//var audio = new Audio();
//audio.src = "../src/sounds/sound.mp3";
var keyPressed = [0xFF];

function start(result){
if (typeof clock === 'undefined') {
                clock = new clockChip8;
                chip8(result);
            } else {
                clock.stopClock();
            }
            chip8(result);

}

function onChange(event) {
    if (event.target.files[0]) {
        readFile(event.target.files[0]);
    };
}
function readFile(file){

        var reader = new FileReader();
        reader.onload = function(e) {
            // The file's text will be printed here
            var result = new Uint8Array(e.target.result);
            start(result);
        }
        reader.readAsArrayBuffer(file);

}

function onChangeDropBox(event) {
    if(event.target.value)
    {  
        ROM_LIST_FILE = "../src/roms/"+event.target.value;
       var xhr=new XMLHttpRequest();
        xhr.open("GET", ROM_LIST_FILE, true);
        //Now set response type
        xhr.responseType = 'arraybuffer';
        xhr.addEventListener('load',function(){
        if (xhr.status === 200){
        var result = new Uint8Array(xhr.response);
        start(result);
  }
})
xhr.send();
              
  }
  
}

var chip8 = function(result) {
    console.log(this);
    memory = new memoryChip8(this);
    callstack = new callstackChip8(this);
    registers = new registersChip8(this);
    screen = new screenChip8();
    timers = new timersChip8();
    opcodeTest(result);
    timers.setDelayCounter(0);
    timers.setSoundCounter(0);
    sound.start();
    sound.stop(0.4);
    clock.startClock();
}