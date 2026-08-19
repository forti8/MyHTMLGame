class TextDefinition {
    constructor (content, font, color, position, context, isStroke)
    {
        this.content = content;
        this.font = font;
        this.color = color;
        this.position = position;

        var {x,y} = this.position;
        context.font = this.font;
        if (isStroke)
        {
            context.strokeStyle = color;
            context.strokeText(content, x, y);
            return;
        }

        context.fillStyle = color;
        context.fillText(content, x, y);
    }
}

export class Text {
    #content = "";
    #font = "";
    #color = "";
    #position = null
    #context = null;
    #stroke = false;

    setContent (content)
    {
        this.#content = content;
        return this;
    }

    setFont (font)
    {
        this.#font = font;
        return this;
    }

    setColor (color)
    {
        this.#color = color;
        return this;
    }

    setContext (context)
    {
        this.#context = context;
        return this;
    }

    setPosition(x, y)
    {
        this.#position = {x, y};
        return this;
    }


    setIsStroke (s)
    {
        this.#stroke = s;
        return this;
    }
    create ()
    {
        return new TextDefinition(
            this.#content,
            this.#font,
            this.#color,
            this.#position,
            this.#context,
            this.#stroke
        )
    }
}