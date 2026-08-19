class CommandDefinition {
    constructor(
        key,
        func,
        typeEvent,
        player
    ) {
        var validEvents = ["keypress", "keydown", "keyup"];

        if (!validEvents.includes(typeEvent)) {
            throw new Error("Invalid Event");
        }

        document.addEventListener(typeEvent, function (e) {
            if (e.key === key) {
                func(player);
            }
        });
    }
}

export class Command 
{
    #key = null;
    setKey (key) 
    {
        this.#key = key;
        return this;
    }

    get key()
    {
        return this.#key;
    }

    #func = null;
    setHandler (func) 
    {
        this.#func = func;
        return this;
    }

    #typeEvent = null;
    setTypeEvent (typeEvent) 
    {
        this.#typeEvent = typeEvent;
        return this;
    }

    #player = null;
    setPlayer (player) 
    {
        this.#player = player;
        return this;
    }

    create () {
        return new CommandDefinition(
            this.#key,
            this.#func,
            this.#typeEvent,
            this.#player
        )
    }
}