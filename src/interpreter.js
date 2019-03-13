
function opcodeInterpreter(opcode) {
    
    var x = ((opcode) & (0x0F00));
    x = x / 256;
    //used to determinate the value of x in Vx
    var y = ((opcode) & (0x00F0));
    y = y / 16;
    //used to determinate the value of x in Vx

    //0NNN is not implemented for now
    if (opcode === 0x00E0) {
        //Clears the screen
        screenInit();
        //penser a vider les tableaux

    } else if (opcode === 0x00EE) {
        //Returns from a subroutine.
        callstack.stack = callstack.stack - 1;
        //stackPointer[point] = (stackPointer[point] - 2)


    } else if (((opcode) & (0xF000)) === (0x1000)) {
        //1NNN
        //Jumps to address NNN.
        callstack.stackPointer[callstack.stack] = (((opcode) & (0x0FFF)) - 2)

    } else if (((opcode) & (0xF000)) === (0x2000)) {
        //2NNN
        //Calls subroutine at NNN.
        callstack.stack = callstack.stack + 1;
        callstack.stackPointer[callstack.stack] = (((opcode) & (0x0FFF)) - 2)


    } else if (((opcode) & (0xF000)) === (0x3000)) {
        //3XNN
        //Skips the next instruction if VX equals NN. 
        //(Usually the next instruction is a jump to skip a code block)
        if ((registers.Vx[x]) === ((opcode) & (0x00FF))) {
            callstack.stackPointer[callstack.stack] = callstack.stackPointer[callstack.stack] + 2;
        }

    } else if (((opcode) & (0xF000)) === (0x4000)) {
        //4XNN
        //Skips the next instruction if VX doesn't equal NN. 
        //(Usually the next instruction is a jump to skip a code block)
        if ((registers.Vx[x]) !== ((opcode) & (0x00FF))) {
            callstack.stackPointer[callstack.stack] = callstack.stackPointer[callstack.stack] + 2;
        }


    } else if (((opcode) & (0xF00F)) === (0x5000)) {
        //5XY0
        //Skips the next instruction if VX equals VY. 
        //(Usually the next instruction is a jump to skip a code block)
        if (registers.Vx[x] === registers.Vx[y]) {
            callstack.stackPointer[callstack.stack] = callstack.stackPointer[callstack.stack] + 2;
        }
    } else if (((opcode) & (0xF000)) === (0x6000)) {
        //6XNN
        //Sets VX to NN.

        registers.Vx[x] = ((opcode) & (0x00FF));


    } else if (((opcode) & (0xF000)) === (0x7000)) {
        //7XNN
        //Adds NN to VX. (Carry flag is not changed)
        registers.Vx[x] = ((registers.Vx[x]) + ((opcode) & (0x00FF)));
        registers.Vx[x] = ((registers.Vx[x]) & (0x00FF));


    } else if (((opcode) & (0xF00F)) === (0x8000)) {
        //8XY0
        //Sets VX to the value of VY.
        registers.Vx[x] = registers.Vx[y];

    } else if (((opcode) & (0xF00F)) === (0x8001)) {
        //8 XY1
        //Sets VX to VX or VY. (Bitwise OR operation)
        registers.Vx[x] = ((registers.Vx[x]) | (registers.Vx[y]));

    } else if (((opcode) & (0xF00F)) === (0x8002)) {
        //8XY2
        //Sets VX to VX and VY. (Bitwise AND operation)
        registers.Vx[x] = ((registers.Vx[x]) & (registers.Vx[y]));

    } else if (((opcode) & (0xF00F)) === (0x8003)) {
        //8 XY3
        //Sets VX to VX xor VY.
        registers.Vx[x] = ((registers.Vx[x]) ^ (registers.Vx[y]));

    } else if (((opcode) & (0xF00F)) === (0x8004)) {
        //8XY4
        //Adds VY to VX. VF is set to 1 when there's a carry, and to 0 when there isn't.
        registers.Vx[x] = registers.Vx[y] + registers.Vx[x]
        if (registers.Vx[x] > 255) {
            registers.Vx[15] = 1;
            registers.Vx[x] = registers.Vx[x] & 0x00FF;
        } else {
            registers.Vx[15] = 0;
        }

    } else if (((opcode) & (0xF00F)) === (0x8005)) {
        //8XY5
        //VY is subtracted from VX. VF is set to 0 when there's a borrow, and 1 when there isn't.
        if (registers.Vx[x] >= registers.Vx[y]) {
            registers.Vx[15] = 0x01;
        } else {
            registers.Vx[15] = 0x00;
        }
        registers.Vx[x] = registers.Vx[x] - registers.Vx[y];
        registers.Vx[x] = registers.Vx[x] & 0x00FF;


    } else if (((opcode) & (0xF00F)) === (0x8006)) {
        //8 XY6
        //Stores the least significant bit of VX in VF and then shifts VX to the right by 1.
        registers.Vx[15] = (registers.Vx[x] & 0x01);
        registers.Vx[x] = (registers.Vx[x] & 0xFE);
        registers.Vx[x] = registers.Vx[x] / 2;

    } else if (((opcode) & (0xF00F)) === (0x8007)) {
        //8XY7
        //Sets VX to VY minus VX. VF is set to 0 when there's a borrow, and 1 when there isn't.
        if (registers.Vx[y] >= registers.Vx[x]) {
            registers.Vx[15] = 0x01;
        } else {
            registers.Vx[15] = 0x00;
        }
        registers.Vx[x] = registers.Vx[y] - registers.Vx[x];
        registers.Vx[x] = registers.Vx[x] & 0x00FF;

    } else if (((opcode) & (0xF00F)) === (0x800E)) {
        //8XYE
        //Stores the most significant bit of VX in VF and then shifts VX to the left by 1.
        if ((registers.Vx[x] & 0x80)!==0)
        {registers.Vx[15] = 0x01;}
        else
        {registers.Vx[15] = 0x00;}    
        registers.Vx[x] = (registers.Vx[x] & 0x7F);
        registers.Vx[x] = registers.Vx[x] * 2;

    } else if (((opcode) & (0xF00F)) === (0x9000)) {
        //9XY0
        //Skips the next instruction if VX doesn't equal VY. 
        //(Usually the next instruction is a jump to skip a code block)
        if (registers.Vx[x] !== registers.Vx[y]) {
            callstack.stackPointer[callstack.stack] = callstack.stackPointer[callstack.stack] + 2;
        }


    } else if (((opcode) & (0xF000)) === (0xA000)) {
        //ANNN
        //Sets I to the address NNN.
        I = ((opcode) & (0x0FFF));

    } else if (((opcode) & (0xF000)) === (0xB000)) {
        //BNNN
        //Jumps to the address NNN plus V0.
        callstack.stackPointer[callstack.stack] = ((((opcode) & (0x0FFF)) + registers.Vx[0]) - 2)

    } else if (((opcode) & (0xF000)) === (0xC000)) {
        //CXNN
        //Sets VX to the result of a bitwise and operation on a random number (Typically: 0 to 255) and NN.
        registers.Vx[x] = ((getRandomInt(256)) & (opcode & 0x00FF));


    } else if (((opcode) & (0xF000)) === (0xD000)) {
        //DXYN
        //Draws a sprite at coordinate (VX, VY) that has a width of 8 pixels and a height of N pixels.
        //Each row of 8 pixels is read as bit-coded starting from memory location I; 
        //I value doesn’t change after the execution of this instruction. 
        //As described above, VF is set to 1 if any screen pixels are flipped from 
        // set to unset when the sprite is drawn, and to 0 if that doesn’t happen
        var n = ((opcode) & (0x000F));
        screenDisplay(n, registers.Vx[x], registers.Vx[y], I);

    } else if (((opcode) & (0xF0FF)) === (0xE09E)) {
        //EX9E
        //Skips the next instruction if the key stored in VX is pressed. 
        //(Usually the next instruction is a jump to skip a code block)
        if (registers.Vx[x] === keyPressed) {
            callstack.stackPointer[callstack.stack] = callstack.stackPointer[callstack.stack] + 2
        }

    } else if (((opcode) & (0xF0FF)) === (0XE0A1)) {
        //EXA1
        //Skips the next instruction if the key stored in VX isn't pressed. 
        //(Usually the next instruction is a jump to skip a code block)
        if (registers.Vx[x] !== keyPressed) {
            callstack.stackPointer[callstack.stack] = callstack.stackPointer[callstack.stack] + 2
        }
    } else if (((opcode) & (0xF0FF)) === (0xF007)) {
        //FX07
        //Sets VX to the value of the delay timer.
        registers.Vx[x] = timers.delayCounter;

    } else if (((opcode) & (0xF0FF)) === (0XF00A)) {
        //FX0A
        //A key press is awaited, and then stored in VX. 
        //(Blocking Operation. All instruction halted until next key event)
        if (keyPressed > 0xF) {
            callstack.stackPointer[callstack.stack] = callstack.stack[callstack.stack] - 2;
        } else {
            registers.Vx[x] = keyPressed;
        }
        registers.Vx[x] = keyPressed;

    } else if (((opcode) & (0xF0FF)) === (0xF015)) {
        //FX15
        //Sets the delay timer to VX.
        timers.delayCounter = registers.Vx[x];

    } else if (((opcode) & (0xF0FF)) === (0xF018)) {
        //FX18
        //Sets the sound timer to VX.
        timers.soundCounter = registers.Vx[x];
        audio.play();
    } else if (((opcode) & (0xF0FF)) === (0xF01E)) {
        //FX1E
        //Adds VX to I.
        I = registers.Vx[x] + I;
        if (I > 0xFFF) {
            registers.Vx[15] = 1;
        } else {
            registers.Vx[15] = 0;
        }
        I = I & 0x0FFFF;


    } else if (((opcode) & (0xF0FF)) === (0xF029)) {
        //FX29
        //Sets I to the location of the sprite for the character in VX. 
        //Characters 0-F (in hexadecimal) are represented by a 4x5 font.
        I = characterAddress[Vx[x]];
        //screenDisplay(n, Vx[x], Vx[y], I);

    } else if (((opcode) & (0xF0FF)) === (0xF033)) {
        //FX33
        //Stores the binary-coded decimal representation of VX,
        //with the most significant of three digits at the address in I,
        //the middle digit at I plus 1, and the least significant digit at I plus 2. 
        //(In other words, take the decimal representation of VX,
        // place the hundreds digit in memory at location in I, 
        //the tens digit at location I+1, and the ones digit at location I+2.)
        let moduloVxHundreds = registers.Vx[x] % 100;
        moduloVxHundreds = (registers.Vx[x] - moduloVxHundreds) / 100;
        memory.ram[I] = moduloVxHundreds;
        let moduloVxTens = ((registers.Vx[x]) - (moduloVxHundreds * 100)) % 10;
        moduloVxTens = (registers.Vx[x] - moduloVxTens - (moduloVxHundreds * 100)) / 10;
        memory.ram[I + 1] = moduloVxTens;
        let moduloVx = ((registers.Vx[x]) - (moduloVxHundreds * 100) - (moduloVxTens * 10));
        moduloVx = moduloVx - (moduloVx % 1);
        memory.ram[I + 2] = moduloVx;

    } else if (((opcode) & (0xF0FF)) === (0xF055)) {
        //FX55
        //Stores V0 to VX (including VX) in memory starting at address I. 
        //The offset from I is increased by 1 for each value written, but I itself is left unmodified.
        for (var i = 0; i <= x; i++) {
            memory.ram[I + i] = registers.Vx[i];
        }

    } else if (((opcode) & (0xF0FF)) === (0xF065)) {
        //FX65
        //Fills V0 to VX (including VX) with values from memory starting at address I.
        // The offset from I is increased by 1 for each value written, but I itself is left unmodified.
        for (var i = 0; i <= x; i++) {
            registers.Vx[i] = memory.ram[I + i];

        }
    } else if (((opcode) & (0xF000)) === (0x0000)) {
        //0NNN  
        //Calls RCA 1802 program at address NNN. Not necessary for most ROMs.
        console.log("[!]" + (opcode.toString(16)));


    } else {
        console.log("Opcode Unknown " + (opcode.toString(16)))

    }
   
    return;
}

  function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }