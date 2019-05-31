var callstackChip8 = (function(){
    function callstackChip8(){
    this.stackPointer= [0x200];
    this.pileStack= 0;
    this.execution= 10;
    console.log(this);
    }
    callstackChip8.prototype.stopExecution= function(){
        clearInterval(cpuTimer);
        //screen.render();
        window.cancelAnimationFrame(frame)
        return;
    }
    
    callstackChip8.prototype.pointer= function(){
        let opcode = (memory.ram[this.stackPointer[this.pileStack]]);
        opcode = (opcode << 8);
        opcode = ((memory.ram[this.stackPointer[this.pileStack] + 1]) + opcode);
        if (Number.isNaN(opcode)){
            this.stopExecution();  //stop all the timer
            console.log("Opcode is not a Number");
            return;
        }
        opcodeInterpreter(opcode);
        this.stackPointer[this.pileStack] = this.stackPointer[this.pileStack] + 2;
        if ((this.stackPointer[this.pileStack] > ((0xFFF))) | (this.stackPointer[this.pileStack] < (0x200))) 
            {
        //stop all the timer when we point out of memory
            this.stopExecution();
            }
        this.execution--;
        if (this.execution > 0) {
         this.pointer();
        }
        else
        {
            this.execution=10;
            timers.ticDelayTimer();
        }
    }
    return callstackChip8;
})();
