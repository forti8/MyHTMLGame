import { height, width, context } from "./canvas/canvas.js";
import { Enemy } from "./canvas/enemy/enemy.js";
import { Rect } from "./canvas/formas/rect.js";
import { Text } from "./canvas/formas/text.js";
import { findMobByChance, maxChanceNumber } from "./data.js";
import { player, nearstEnemy, enemies, Defaults } from "./index.js";

function getDistance (x, y)
{
    var distanceX = Math.abs(x - player.position.x); 
    var distanceY = Math.abs(y - player.position.y);
    var totalDistance = distanceX + distanceY;

    return totalDistance;
}

export function findNearstEnemy ()
{
    if (enemies.length == 0) return;

    var lowestDistance = width + height;
    if (nearstEnemy != null) 
    {
        lowestDistance = getDistance(
            nearstEnemy.position.x, 
            nearstEnemy.position.y
        );
    }

    for (const e of enemies)
    {
        var {x, y} = e.position;
        var distance = getDistance(x, y);
    
        if (distance < lowestDistance) 
        {
            Defaults.setNearst(e);
            e.toogleNearst();
        };
    }
}

export function genEnemy ()
{
    const maxCount = 3;
    var randomCount = Math.floor(Math.random() * (maxCount)) + 1;
    
    for (var i = 0; i<randomCount; i++)
    {
        var randomMob = Math.floor(Math.random() * (maxChanceNumber + 1));
        var mobData = findMobByChance(randomMob);
        var randomX = Math.floor(Math.random() * (width + 1));
        var randomY = Math.floor(Math.random() * (height + 1));
        
        var newEnemy = new Enemy()
            .setLife(mobData.life)
            .setDamage(mobData.damage)
            .setPosition(randomX, randomY)
            .setIndex(enemies.length)
            .setSize(mobData.size.h, mobData.size.w)
            .setMob(mobData.name)
            .setSpeed(mobData.speed)
            .setCashReward(mobData.rewards.cash)
            .setPointReward(mobData.rewards.point)
            .setXpReward(mobData.rewards.xp)
            .create();
    
        var enemyRect = new Rect()
            .setPosition(randomX, randomY)
            .setSize(mobData.size.w, mobData.size.h)
            .setStyle(null, '1', mobData.color)
            .setContext(context)
            .create();

        var enemyLife = new Text()
            .setColor("green")
            .setContent(`Vida ${mobData.life}`)
            .setFont("12px sans-serif")
            .setContext(context)
            .setIsStroke(false)
            .setPosition(
                (randomX + mobData.size.h + 5),
                (randomY),
            )
            .create();
    
        enemies.push(newEnemy);
        if (enemies.length == 1) Defaults.setNearst(enemies[0]);
    }
}