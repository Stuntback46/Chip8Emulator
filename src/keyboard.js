document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyUpHandler(e) {
        e.keyCode;
        switch (e.keyCode) {
            case 49:
                keyPressed = 0xFF;
                break;
            case 50:
                keyPressed = 0xFF;
                break;
            case 51:
                keyPressed = 0xFF;
                break;
            case 52:
                keyPressed = 0xFF;
                break;
            case 65:
                keyPressed = 0xFF;
                break;
            case 90:
                keyPressed = 0xFF;
                break;
            case 69:
                keyPressed = 0xFF;
                break;
            case 82:
                keyPressed = 0xFF;
                break;
            case 81:
                keyPressed = 0xFF;
                break;
            case 83:
                keyPressed = 0xFF;
                break;
            case 68:
                keyPressed = 0xFF;
                break;
            case 70:
                keyPressed = 0xFF;
                break;
            case 87:
                keyPressed = 0xFF;
                break;
            case 88:
                keyPressed = 0xFF;
                break;
            case 67:
                keyPressed = 0xFF;
                break;
            case 86:
                keyPressed = 0xFF;
                break;
            default:
                break;
        }
    }

    function keyDownHandler(e) {
        switch (e.keyCode) {
            case 49:
                keyPressed = 0x1;
                break;
            case 50:
                keyPressed = 0x2;
                break;
            case 51:
                keyPressed = 0x3;
                break;
            case 52:
                keyPressed = 0xC;
                break;
            case 65:
                keyPressed = 0x4;
                break;
            case 90:
                keyPressed = 0x5;
                break;
            case 69:
                keyPressed = 0x6;
                break;
            case 82:
                keyPressed = 0xD;
                break;
            case 81:
                keyPressed = 0x7;
                break;
            case 83:
                keyPressed = 0x8;
                break;
            case 68:
                keyPressed = 0x9;
                break;
            case 70:
                keyPressed = 0xE;
                break;
            case 87:
                keyPressed = 0xA;
                break;
            case 88:
                keyPressed = 0x0;
                break;
            case 67:
                keyPressed = 0xB;
                break;
            case 86:
                keyPressed = 0xF;
                break;
            default:
                return;
        }

    }