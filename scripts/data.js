export const maxChanceNumber = 10000;

export const enemiesSet = {
    "Zoombie": {
        name: "Zoombie",
        life: 30,
        damage: 20,
        speed: 1,
        delay: 1000,
        rewards: {
            cash: 50,
            point: 10,
            xp: 240
        },
        size: {
            h: 20,
            w: 10
        },
        color: "#f00"
    },

    "Boom": {
        name: "Boom",
        life: 40,
        damage: 50,
        speed: 0.25,
        delay: 1500,
        rewards: {
            cash: 200,
            point: 50,
            xp: 480
        },
        size:{
            h:7,
            w:10
        },
        color: "#000"
    },

    "Rich Monster": {
        name: "Rich Monster",
        life: 1000,
        damage: 10,
        delay: 1200,
        speed: 0.75,
        rewards: {
            cash: 2000,
            point: 1000
        },
        size:{
            h:10,
            w:5
        },
        color: "#ff0"
    }
}

export const chanceVector = [
    { mob: "Zoombie", min: 0, max: 5000 },
    { mob: "Boom", min: 5000, max: 9000 },
    { mob: "Rich Monster", min: 9000, max: 10000}
];

export function findMobByChance(number)
{
    for (const chance of chanceVector)
    {
        if (number >= chance.min && number < chance.max)
        {
            return enemiesSet[chance.mob];
        }
    }

    return null;
}