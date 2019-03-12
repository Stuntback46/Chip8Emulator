var timers = {
    delayCounter: 0,
    soundCounter: 0,
    setDelayCounter: function(value) {this.delayCounter=value;},
    setSoundCounter: function(value) {this.soundCounter=value;},
    ticDelayTimer: function() {

        if (this.delayCounter !== 0) {
            this.delayCounter = (this.delayCounter - 1);
        }
        this.ticSoundTimer();

    },
    ticSoundTimer: function() {

        if (this.soundCounter !== 0) {
            this.soundCounter = (this.soundCounter - 1);
        } else {
            audio.pause();
        }
        return;
    }
}
