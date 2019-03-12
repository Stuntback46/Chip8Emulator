function memoryInit() {

    //For reminder: 0x000->0x1FF=Reserved for interpreter
    //0x200->0x5FF= Most programs start here
    //0x600->0xFFF= Some programs start here
    //
    //initialization of the whole memory
    for (var i = 0x00; i <= 0xFFF; i++) {
        memory[i] = 0x00;
    }

    console.log("Memory initialized");

    //Storage of all characters code
    //0x000 to 0x04F (5 bytes by character)

    var charCode = [0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
        0x20, 0x60, 0x20, 0x20, 0x70, // 1
        0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
        0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
        0x90, 0x90, 0xF0, 0x10, 0x10, // 4
        0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
        0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
        0xF0, 0x10, 0x20, 0x40, 0x40, // 7
        0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
        0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
        0xF0, 0x90, 0xF0, 0x90, 0x90, // A
        0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
        0xF0, 0x80, 0x80, 0x80, 0xF0, // C
        0xE0, 0x90, 0x90, 0x90, 0xE0, // D
        0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
        0xF0, 0x80, 0xF0, 0x80, 0x80 //F
    ];
    //set the characters code in memory
    //address table of characters
    var i = 0;
    for (var a = 0; a < 0x4F; a = (a + 0x05)) {


        characterAddress[i] = (a);
        i++;
    }

    for (var i = 0; i < charCode.length; i++) {
        memory[i] = charCode[i];
    }

    console.log("Characters code initialized and addressed: 0x000 to 0x04F ");
}