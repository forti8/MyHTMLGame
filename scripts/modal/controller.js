import { startGame } from "../index.js";

export function openDieModal ()
{
    const dieModal = document.getElementById("dieModal")
    dieModal.classList.remove("hidden");
}

function closeDieModal ()
{
    const dieModal = document.getElementById("dieModal");
    dieModal.classList.add("hidden");

    startGame();
}

const rematchButton = document.getElementById("rematch");
rematchButton.addEventListener("click", closeDieModal)