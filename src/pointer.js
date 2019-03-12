function pointer(execution = 10) {

    var opcode = (memory[stackPointer[point]]);
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