var timers = (function(){
    var timers = function(){
    this.delayCounter= 0;
    this.soundCounter= 0;
    this.sound= false;
    }
    timers.prototype.setDelayCounter=function(value){this.delayCounter=value;}
    timers.prototype.setSoundCounter=function(value) {this.soundCounter=value;}
    timers.prototype.ticDelayTimer=function() {

        if (this.delayCounter !== 0) {
            this.delayCounter = (this.delayCounter - 1);
        }
        this.ticSoundTimer();

    }
timers.prototype.ticSoundTimer=function() {
          if (this.soundCounter !== 0) {
            this.soundCounter = (this.soundCounter - 1);
        } else if ((this.sound===true) && (this.soundCounter === 0) ) 
        {
            sound.stop();
            this.sound= false;
        }
    }
return timers;
})();
 