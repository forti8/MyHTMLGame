import {
    inicialize,
    draw,
    width,
    height,
    context
} from "./canvas/canvas.js";

import "./modal/controller.js";
import { Enemy } from "./canvas/enemy/enemy.js";
import { Rect } from "./canvas/formas/rect.js";
import { createCommands } from "./canvas/player/setup.js";
import { findNearstEnemy, genEnemy } from "./functions.js";

export var player = null;
export var enemies = [];
export var projetiles = [];
export var nearstEnemy = null;

export const Defaults = {
    setNearst: function (n) {
        nearstEnemy = n
    },

    player: {
        life: 100,
        damage: 15,
        speed: 10,
        cash: 0,
        especialCount: 10,

        passive: {
            regen: 15
        },

        levelUp: {
            readjust: 1.1,
            upgradeDamage: 1.04,
            upgradeRegen: 1.02,
            upgradeMaxLife: 1.02
        },

        attack: {
            defaultCooldown: 1500,
            especialCooldown: 300,
            especialDuration: 3000,
            especialDamage: 40
        }
    },
    
    projetile: {
        attr: {
            speed: 7
        },

        color: {
            defaultColor: '#ff0',
            especialColor: 'rgb(189, 0, 79)',
        },

        size: {
            defaultSize: 5,
            especialSize: 7
        }
    }
}

export function resetVariables()
{
    playerAttackCooldown = Defaults.player.attack.defaultCooldown;
    lastTime = 0;
    spawnEnemyTimer = 0;
    playerAttackTimer = 0;
    especialTimer = 0;
    especialAttackCount = 0;
    isEspecial = false;
}

function update ()
{
    for (const e of enemies)
    {
        e.move(player.position);
        e.attack(player.position, player)
    }

    for (const p of projetiles)
    {
        findNearstEnemy();
        if (nearstEnemy != null) 
        {
            p.move(nearstEnemy);
        }

        else 
        {
            projetiles.length = 0;
        }
    }
}

function startGame ()
{
    player = inicialize(enemies);
    createCommands();
    gameLoop();
}

const spawnEnemyCooldown = 5000;
const regenCooldown = 1000;
var playerAttackCooldown = Defaults.player.attack.defaultCooldown;

var lastTime = 0;
var spawnEnemyTimer = 0;
var playerAttackTimer = 0;
var regenTimer = 0;
var especialTimer = 0;

var especialAttackCount = 0;
var isEspecial = false;
var pauseGame = false;

export function pause ()
{
    console.log("pause")
    pauseGame = true;
}

function gameLoop (timestamp = 0)
{
    if (pauseGame)
    {
        return;
    }

    findNearstEnemy()
    var deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    spawnEnemyTimer += deltaTime;
    if (spawnEnemyTimer >= spawnEnemyCooldown)
    {
        genEnemy();
        spawnEnemyTimer = 0;
    }

    regenTimer += deltaTime;
    if (regenTimer >= regenCooldown)
    {
        player.regenActive();
        regenTimer = 0;
    }

    playerAttackTimer += deltaTime;
    if(playerAttackTimer >= playerAttackCooldown && enemies.length > 0)
    {
        player.attack(nearstEnemy);
        playerAttackTimer = 0;

        if (!player.especial) {
            especialAttackCount++;
            if(especialAttackCount >= Defaults.player.especialCount)
            {
                playerAttackCooldown = Defaults.player.attack.especialCooldown;
                especialAttackCount = 0;
                player.toogleEspecial();
                player.setDamage(Defaults.player.attack.especialDamage);
            }
        }
    }
    
    if (player.especial)
    {
        especialTimer += deltaTime;
        if (especialTimer >= Defaults.player.attack.especialDuration)
        {
            player.setDamage(Defaults.player.damage);
            player.toogleEspecial();
            playerAttackCooldown = Defaults.player.attack.defaultCooldown
            especialTimer = 0;
        }
    }

    update();
    draw(player, enemies);
    requestAnimationFrame(gameLoop);
}

startGame();