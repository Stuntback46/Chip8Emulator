var timersChip8 = (function(){
    var timersChip8 = function(){
    this.delayCounter= 0;
    this.soundCounter= 0;
    this.sound= false;
    }
    timersChip8.prototype.setDelayCounter=function(value){this.delayCounter=value;}
    timersChip8.prototype.setSoundCounter=function(value) {this.soundCounter=value;}
    timersChip8.prototype.ticDelayTimer=function() {

        if (this.delayCounter !== 0) {
            this.delayCounter = (this.delayCounter - 1);
        }
        this.ticSoundTimer();

    }
timersChip8.prototype.ticSoundTimer=function() {
          if (this.soundCounter !== 0) {
            this.soundCounter = (this.soundCounter - 1);
        } else if ((this.sound===true) && (this.soundCounter === 0) ) 
        {
            sound.stop();
            this.sound= false;
        }
    }
return timersChip8;
})();
 