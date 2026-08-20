import { draw } from "../canvas.js";
import { enemies, player, Defaults, nearstEnemy, resetVariables, pause} from "../../index.js";
import { findNearstEnemy } from "../../functions.js";

function reset ()
{
    enemies.length = 0;
    player.setLife(Defaults.player.life);
    player.setDamage(Defaults.player.damage);
    player.setCash(Defaults.player.cash);
    player.setVelSpeed(Defaults.player.speed);
    pause();
}

class EnemyDefinition
{
    constructor (
        life, 
        damage, 
        position, 
        speed, 
        index, 
        size, 
        mob,
        isNearst,
        pointReward,
        cashReward,
        xpReward
    )

    {
        this.life = life;
        this.mob = mob
        this.damage = damage;
        this.position = position;
        this.speed = speed;
        this.index = index;
        this.size = size;
        this.isNearst = isNearst;
        this.pointReward = pointReward;
        this.cashReward = cashReward
        this.xpReward = xpReward;
    }

    toogleNearst ()
    {
        this.isNearst = !this.isNearst;
        return;
    } 

    die (p)
    {
        const index = enemies.indexOf(this);
        
        if (index !== -1)
        {
            enemies.splice(index, 1);
        }

        if (this.isNearst)
        {
            Defaults.setNearst(null);
            findNearstEnemy();
        }

        p.addPoints(this.pointReward);
        p.setCash(p.cash + this.cashReward);
        p.setXp(p.xp + this.xpReward);
    }

    isColliding(playerPosition, enemyPosition) 
    {
        var {h, w} = this.size;
        return (
            playerPosition.x < enemyPosition.x + w &&
            playerPosition.x + w > enemyPosition.x &&
            playerPosition.y < enemyPosition.y + h &&
            playerPosition.y + h > enemyPosition.y
        );
    }

    damageAply (damage, player)
    {
        var life = this.life;

        if (life - damage <= 0)
        {
            this.die(player);
        }

        this.setLife(life - damage);
    }

    setLife (life)
    {
        this.life = life;
    }    

    attack(playerPosition, p)
    {
        if (this.isColliding(playerPosition, this.position)) {
            var playerLife = p.life;

            if (playerLife - this.damage <= 0) {
                reset();
                resetVariables();
                player.die();
                draw(player, enemies);
                return;
            }

            p.setLife(playerLife - this.damage);
        }

    }

    move (playerPosition)
    {
        var {x, y} = playerPosition;
        if (x > this.position.x) 
        {
            this.position.x += this.speed;
        }

        else 
        {
            this.position.x -= this.speed;
        }

        if (y > this.position.y) 
        {
            this.position.y += this.speed;
        }
        else 
        {
            this.position.y -= this.speed;
        }
    }
}

export class Enemy 
{
    #life = 0;
    #damage = 3;
    #position = null;
    #speed = 7;
    #index = 0;
    #size = null;
    #mob = "Zoombie";
    #isNearst = false;
    #pointReward = 1;
    #cashReward = 10;
    #xpReward = 100;

    setDamage (damage) {
        this.#damage = damage;
        return this;
    }

    setLife (life) 
    {
        this.#life = life;
        return this;
    }

    setSpeed (speed)
    {
        this.#speed = speed;
        return this;
    }

    setPosition (x, y)
    {
        this.#position = {x, y};
        return this;
    }

    setIndex(index)
    {
        this.#index = index;
        return this;
    }

    setSize (h, w)
    {
        this.#size = {h, w};
        return this;
    }

    setMob (mob)
    {
        this.#mob = mob;
        return this;
    } 

    setNearest (status)
    {
        this.#isNearst = status;
        return this;
    }

    setPointReward(pw)
    {
        this.#pointReward = pw;
        return this;
    }

    setCashReward(cr)
    {
        this.#cashReward = cr;
        return this;
    }

    setXpReward(xpReward)
    {
        this.#xpReward = xpReward;
        return this;
    }
    

    create ()
    {
        return new EnemyDefinition(
            this.#life, 
            this.#damage,
            this.#position,
            this.#speed,
            this.#index,
            this.#size,
            this.#mob,
            this.#isNearst,
            this.#pointReward,
            this.#cashReward,
            this.#xpReward
        )
    }
}