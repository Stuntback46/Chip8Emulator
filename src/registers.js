registers = {
    Vx: [],
    I: 0x0000, //I is a 16 bits address register 
    initVx: function() {
        for (var i = 0; i <= (0xF); i++) 
        {
            this.Vx[i] = 0x00;
            console.log("Vx initialized to:"+this.Vx[i]);
        }
    },
    initI: function() {
    	this.I=0x0000;
    	console.log("Vx initialized to:"+this.I);}
    
}



