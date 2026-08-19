import { player } from "../../index.js";
import { Command } from "./command.js";
import { down, left, moveDown, moveLeft, moveRight, moveUp, right, up } from "./moves.js";

export function createCommands() {
    const commands = [
        ['w', moveUp],
        ['s', moveDown],
        ['a', moveLeft],
        ['d', moveRight]
    ];

    const commandsKeyup = [
        ['w', up],
        ['s', down],
        ['a', left],
        ['d', right]
    ];

    for (const [key, handler] of commands) {
        new Command()
            .setKey(key)
            .setHandler(handler)
            .setTypeEvent("keydown")
            .setPlayer(player)
            .create();
    }

    for (const [key, handler] of commandsKeyup) {
        new Command()
            .setKey(key)
            .setHandler(handler)
            .setTypeEvent("keyup")
            .setPlayer(player)
            .create();
    }
}