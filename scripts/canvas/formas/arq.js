class ArqDefinition 
{
    constructor (p, r, s, e, c)
    {
        this.position = p;
        this.radius = r;
        this.startAngle = s;
        this.endAngle = e;
        this.context = c;
    }
}

export class Arq
{
    #position = null;
    #radius = 1;
    #startAngle = 0;
    #endAngle = 360;
    #context = null

    setAngle (start, end)
    {
        this.#startAngle = start;
        this.#endAngle = end;
        return this;
    }

    setRadius (r)
    {
        this.#radius = r;
        return this;
    }

    setPosition (x, y)
    {
        this.#position = {x, y};
        return this;
    }

    setContext (c)
    {
        this.#context = c;
        return this;
    }

    create ()
    {
        return new ArqDefinition (
            this.#position,
            this.#radius,
            this.#startAngle,
            this.#endAngle,
            this.#context
        )
    }
}