export function openDieModal ()
{
    const dieModal = document.getElementById("dieModal")
    dieModal.classList.remove("hidden");
}

function closeDieModal ()
{
    const dieModal = document.getElementById("dieModal")
    dieModal.classList.add("hidden");
}

const rematchButton = document.getElementById("rematch");
rematchButton.addEventListener("click", closeDieModal)