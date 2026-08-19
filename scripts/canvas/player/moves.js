import { draw } from "../canvas.js";
import { 
    enemies
} from "../../index.js";

export function up (){
    var visualKey = document.getElementById('w');
    visualKey.classList.remove("ative");
}
export function down () {
    var visualKey = document.getElementById('s');
    visualKey.classList.remove("ative");
}
export function right () {
    var visualKey = document.getElementById('d');
    visualKey.classList.remove("ative");
}
export function left () {
    var visualKey = document.getElementById('a');
    visualKey.classList.remove("ative");
}

export function moveUp (player) 
{
    var visualKey = document.getElementById('w');
    visualKey.classList.add("ative");

    var {x, y} = player.position;
    var speed = player.speed;
    
    player.setPosition(x, (y - speed));
    draw(player, enemies);
}

export function moveDown (player) 
{
    var visualKey = document.getElementById('s');
    visualKey.classList.add("ative");

    var {x, y} = player.position;
    var speed = player.speed;

    player.setPosition(x, (y + speed));
    draw(player, enemies);
}

export function moveLeft (player) 
{
    var visualKey = document.getElementById('a');
    visualKey.classList.add("ative");

    var {x, y} = player.position;
    var speed = player.speed;

    player.setPosition((x - speed), y);
    draw(player, enemies);
}

export function moveRight (player) 
{
    var visualKey = document.getElementById('d');
    visualKey.classList.add("ative");
    var {x, y} = player.position;
    var speed = player.speed;

    player.setPosition((x+speed), y);
    draw(player, enemies);
}