class RectDefinition 
{
    constructor 
    (
        w = 1, h = 1, // size 
        x = 0, y = 0,  // position
        s = null, l = '1', f = null, type = "stroke",// style
        context
    ) 
    
    {
        context.strokeStyle = s;
        context.lineWidth = l;

        if (type == "stroke") 
        {
            context.strokeRect(x, y, w, h);
            return;
        }

        context.fillStyle = f;
        context.fillRect(x, y, w, h);
    }
}

export class Rect {

    #w = 0;
    #h = 0;
    setSize (wParam, hParam) 
    {
        this.#w = wParam;
        this.#h = hParam;
        return this;
    };

    #x = 0;
    #y = 0;
    setPosition (xParam, yParam) 
    {
        this.#x = xParam;
        this.#y = yParam;
        return this;
    };

    #strokeStyle = null;
    #lineWidth = '1';
    #fill = null;
    #type = 'fill'
    setStyle (sParam = null, lParam, fParam = null, typeParam = "fill") 
    {
        this.#strokeStyle = sParam;
        this.#lineWidth = lParam;
        this.#fill = fParam;
        this.#type = typeParam;
        return this;
    }

    #c = null;
    setContext (c) 
    {
        this.#c = c;
        return this;
    }

    create () 
    {
        return new RectDefinition(
            this.#w, this.#h, // size
            this.#x, this.#y, // position
            this.#strokeStyle, this.#lineWidth, this.#fill, this.#type, // style
            this.#c // context
        )
    }
}