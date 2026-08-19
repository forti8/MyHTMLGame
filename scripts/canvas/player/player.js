import { Defaults, projetiles } from "../../index.js";
import { context } from "../canvas.js";
import { Rect } from "../formas/rect.js";
import { Projetile } from "./projetile.js";

export var levelUpXp = 1000;
class PlayerDefinition 
{
    constructor (damage, life, cash, position, speed) 
    {
        this.damage = damage;
        this.maxLife = life
        this.life = this.maxLife;
        this.cash = cash;
        this.position = position;
        this.speed = speed;
        this.especial = false;
        this.points = 0;
        this.xp = 0;
        this.level = 1;
        this.regen = Defaults.player.passive.regen;
    }

    setPosition (x, y) 
    {
        this.position = {x,y};
    }

    die()
    {
        levelUpXp = 1000
        this.points = 0;
        this.level = 1;
        this.xp = 0;
        this.speed = Defaults.player.speed;
        this.cash = Defaults.player.cash;
        this.maxLife = this.life = Defaults.player.life;
        this.damage = Defaults.player.damage;
    }

    setXp (xp)
    {
        this.xp = xp;
        if(xp >= levelUpXp)
        {
            this.level++;
            this.xp = 0;
            levelUpXp*=Defaults.player.levelUp.readjust;
            this.setRegen(this.regen*Defaults.player.levelUp.upgradeRegen);
            this.setMaxlife(this.maxLife*Defaults.player.levelUp.upgradeMaxLife);
            this.setDamage(this.damage*Defaults.player.levelUp.upgradeDamage);
        }

        return;
    }

    setRegen(rg)
    {
        this.regen = rg;
    }

    regenActive ()
    {
        var newLife = this.life + this.regen;
        if (newLife > this.maxLife) 
        {
            this.setLife(this.maxLife)
            return;
        }

        this.setLife(newLife);
    }

    addPoints (q)
    {
        this.points += q;
    }

    getPosition ()
    {
        return this.position;
    }

    setMaxlife(ml)
    {
        this.maxLife = ml;
    }

    setLife (life) 
    {
        this.life = life;
    }

    setDamage (damage)
    {
        this.damage = damage;
    }

    setCash (cash)
    {
        this.cash = cash;
    }

    setVelSpeed (speed)
    {
        this.speed = speed;
    }

    toogleEspecial ()
    {
        this.especial = !this.especial;
    }

    attack (nearst) 
    {
        var originPosition = {...this.position};
        var {x, y} = originPosition;
        
        var s = Defaults.projetile.size.defaultSize;
        var c = Defaults.projetile.color.defaultColor;

        if(this.especial) 
        {
            s = Defaults.projetile.size.especialSize;
            c = Defaults.projetile.color.especialColor;
            var projetileRect = new Rect()
                .setPosition(x, y)
                .setSize(s,s)
                .setStyle(null, '1', c)
                .setContext(context)
                .create();
        }

        else 
        {
            var projetileRect = new Rect()
                .setPosition(x, y)
                .setSize(s,s)
                .setStyle(null, '1', c)
                .setContext(context)
                .create();
        }
        
        var newProjetile = new Projetile()
            .setPosition(originPosition)
            .setSpeed(Defaults.projetile.attr.speed)
            .setDamage(this.damage)
            .setIndex(projetiles.length)
            .setStyle({
                size: s,
                color: c
            })
            .create();

        projetiles.push(newProjetile);
    }
}

export class Player 
{
    #damage = 0;
    #life = 0;
    #cash = 0;
    #position = null;
    #speed = 0

    setDamage (damage)
    {
        this.#damage = damage;
        return this;
    }

    setCash (cash)
    {
        this.#cash = cash;
        return this;
    }

    setVelSpeed (speed)
    {
        this.#speed = speed;
        return this; 
    }

    setLife (life)
    {
        this.#life = life;
        return this;
    }

    setPosition (x, y)
    {
        this.#position = {x, y};
        return this;
    }

    get cash()
    {
        return this.#cash;
    }

    get damage() 
    {
        return this.#damage;
    }

    get life ()
    {
        return this.#life;
    }

    get position ()
    {
        return this.#position;
    }

    get speed ()
    {
        return this.#speed;
    }

    create ()
    {
        return new PlayerDefinition (
            this.#damage,
            this.#life,
            this.#cash,
            this.#position,
            this.#speed
        )
    }
}