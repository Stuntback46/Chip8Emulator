var callstack = {
    stackPointer: [0x200],
    stack: 0,
    execution: 10,
    stopExecution:function(){clearInterval(cpuTimer);},
    pointer: function() {
        let opcode = (memory.ram[callstack.stackPointer[callstack.stack]]);
        opcode = (opcode << 8);
        opcode = ((memory.ram[callstack.stackPointer[callstack.stack] + 1]) + opcode);
        if (Number.isNaN(opcode)){
            callstack.stopExecution();
            console.log("Opcode is not a Number");
            return;
        }
        opcodeInterpreter(opcode);
        callstack.stackPointer[callstack.stack] = callstack.stackPointer[callstack.stack] + 2;
        if ((callstack.stackPointer[callstack.stack] > ((0xFFF))) | (callstack.stackPointer[callstack.stack] < (0x200))) 
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














/*function pointer(execution = 10) {

    let opcode = (memory[stackPointer[point]]);
    opcode = (opcode << 8);
    opcode = ((memory[stackPointer[point] + 1]) + opcode)

    //point is a pile (I have to change that variable name)
    //opcodeInterpreter(memory[stackPointer[point]]);
    opcodeInterpreter(opcode);
    stackPointer[point] = stackPointer[point] + 2;
    if ((stackPointer[point] > ((0xFFF))) | (stackPointer[point] < (0x200))) {
        //stop all the timer when we point out of memory
        clearInterval(cpuTimer);
    }
    execution--;
    if (execution > 0) {
      pointer(execution);
        }
        else{timers.ticDelayTimer();}
    }
    */