import { enemiesSet } from "../data.js";
import { Defaults, projetiles } from "../index.js";
import { Rect } from "./formas/rect.js";
import { Text } from "./formas/text.js";

import {
    levelUpXp,
    Player
} from "./player/player.js";

var canvas = document.getElementById("jogo");

export var context = canvas.getContext("2d");
export const width = window.innerWidth;
export const height = window.innerHeight;
export function inicialize (enemies) 
{
    canvas.height = height;
    canvas.width = width;

    var randomX = Math.floor(Math.random() * (width + 1));
    var randomY = Math.floor(Math.random() * (height + 1));

    var player = new Player()
        .setLife(Defaults.player.life)
        .setDamage(Defaults.player.damage)
        .setCash(Defaults.player.cash)
        .setPosition(randomX, randomY)
        .setVelSpeed(Defaults.player.speed)
        .create();

    var points = new Text()
        .setContent(`Pontos: ${player.points}`)
        .setFont("60px sans-serif")
        .setColor("black")
        .setIsStroke(false)
        .setPosition(0, 0)
        .setContext(context)
        .create();

    draw(player, enemies);
    return player;
}


export function draw (player, enemies) 
{
    clean();
    var positionPlayer = player.position;

    var playerRect = new Rect()
        .setPosition(positionPlayer.x, positionPlayer.y)
        .setSize(10, 20)
        .setStyle(null, '1', '#04f')
        .setContext(context)
        .create();

    var points = new Text()
        .setContent(`Pontos: ${player.points}`)
        .setFont("30px sans-serif")
        .setColor("black")
        .setIsStroke(false)
        .setPosition(20, 40)
        .setContext(context)
        .create();

    var playerLevelText = new Text()
        .setContent(`${player.level} lv`)
        .setFont("12px sans-serif")
        .setColor("black")
        .setIsStroke(false)
        .setPosition(player.position.x - 5, player.position.y - 10)
        .setContext(context)
        .create();

    var lifeText = new Text()
        .setContent(`Vida: ${player.life.toFixed(2)} / ${player.maxLife.toFixed(2)}`)
        .setFont("20px sans-serif")
        .setColor("#f22")
        .setIsStroke(false)
        .setPosition(20, 68)
        .setContext(context)
        .create();

    var xpText = new Text()
        .setContent(`xp ${player.xp.toFixed(2)} / ${levelUpXp.toFixed(2)}`)
        .setFont("20px sans-serif bold")
        .setColor("#000")
        .setIsStroke(false)
        .setPosition(20, 96)
        .setContext(context)
        .create();

    var cashText = new Text()
        .setContent(`$ ${player.cash.toFixed(2)}`)
        .setFont("20px sans-serif bold")
        .setColor("#000")
        .setIsStroke(false)
        .setPosition(20, 126)
        .setContext(context)
        .create();

    for (const p of projetiles)
    {
        let size = p.style.size;
        var projetileRect = new Rect()
            .setPosition(p.position.x, p.position.y)
            .setSize(size, size)
            .setStyle(null, '1', p.style.color)
            .setContext(context)
            .create();
    }

    for (const e of enemies)
    {
        var mobData = enemiesSet[e.mob];
        var enemyRect = new Rect()
            .setPosition(e.position.x, e.position.y)
            .setSize(mobData.size.w,  mobData.size.h)
            .setStyle(null, '1', mobData.color)
            .setContext(context)
            .create();

        var enemyLife = new Text()
            .setColor("black")
            .setContent(`Vida ${e.life.toFixed(2)}/${mobData.life.toFixed(2)}`)
            .setFont("12px sans-serif")
            .setContext(context)
            .setIsStroke(false)
            .setPosition(
                (e.position.x - mobData.size.w * 2),
                (e.position.y - 5),
            )
            .create();
    }
}

function clean ()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
}