var callstack = (function(){
    function callstack(){
    this.stackPointer= [0x200];
    this.pileStack= 0;
    this.execution= 10;
    console.log(this);
    }
    callstack.prototype.stopExecution= function(){
        clearInterval(cpuTimer);
        screen.render();
        window.cancelAnimationFrame(frame)
        return;
    }
    
    callstack.prototype.pointer= function(){
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
    return callstack;
})();
  

/*var callstack = {
    stackPointer: [0x200],
    pileStack: 0,
    execution: 10,
    stopExecution:function(){
        clearInterval(cpuTimer);
        render();
        clearInterval(frame);
        return;
    },
    pointer: function() {
        let opcode = (memory.ram[callstack.stackPointer[callstack.pileStack]]);
        opcode = (opcode << 8);
        opcode = ((memory.ram[callstack.stackPointer[callstack.pileStack] + 1]) + opcode);
        if (Number.isNaN(opcode)){
            callstack.stopExecution();  //stop all the timer
            console.log("Opcode is not a Number");
            return;
        }
        opcodeInterpreter(opcode);
        callstack.stackPointer[callstack.pileStack] = callstack.stackPointer[callstack.pileStack] + 2;
        if ((callstack.stackPointer[callstack.pileStack] > ((0xFFF))) | (callstack.stackPointer[callstack.pileStack] < (0x200))) 
            {
        //stop all the timer when we point out of memory
            callstack.stopExecution();
            }
        callstack.execution--;
        if (callstack.execution > 0) {
         callstack.pointer();
        }
        else
        {
            callstack.execution=10;
            timers.ticDelayTimer();
        }
    }
    };
*/