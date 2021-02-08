var btnstart = document.getElementById("btnstart");
var blue = document.getElementById("blue");
var violet = document.getElementById("violet");
var orange = document.getElementById("orange");
var green = document.getElementById("green");

class Game{
    constructor(){
        this.init();
        this.generator();
    }

    init(){
        btnstart.classList.add('hide');
        this.nivel = 1;
        this.colores={
            blue,
            violet,
            orange,
            green
        }
    }

    generator(){
        this.sequence = new Array(10).fill(0).map(n =>Math.floor(Math.random()*4));
    }
}


function start(){
    var game = new Game();
}