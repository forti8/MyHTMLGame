import { player, projetiles } from "../../index.js";

function isColliding(projetilePos, enemyPosition) 
{
    const width = 10;
    const height = 20;

    return (
        projetilePos.x < enemyPosition.x + width &&
        projetilePos.x + width > enemyPosition.x &&
        projetilePos.y < enemyPosition.y + height &&
        projetilePos.y + height > enemyPosition.y
    );
}

class ProjetileDefinition 
{
    constructor (position, speed, damage, index, style)
    {
        this.position = position;
        this.speed = speed;
        this.damage = damage;
        this.index = index;
        this.style = style
    }

    move (nearst)
    {
        var {x, y} = nearst.position;
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


        if (isColliding(this.position, nearst.position))
        {
            nearst.damageAply(this.damage, player)
            const index = projetiles.indexOf(this);

            if (index !== -1)
            {
                projetiles.splice(index, 1);
            }
        }
    }
}

export class Projetile 
{
    #position = null;
    #speed = 20;
    #damage = 1;
    #index = 0;
    #style = null;

    setPosition (position)
    {
        this.#position = position;
        return this;
    } 

    setSpeed (speed)
    {
        this.#speed = speed;
        return this;
    }

    setDamage (damage)
    {
        this.#damage = damage;
        return this;
    }

    setIndex (index)
    {
        this.#index = index;
        return this;
    }

    setStyle (style)
    {
        this.#style = style;
        return this;
    }

    create ()
    {
        return new ProjetileDefinition(
            this.#position,
            this.#speed,
            this.#damage,
            this.#index,
            this.#style
        )
    }
}