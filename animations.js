function createBubble(){
    const window = document.querySelector(".bubbles-box");
    let bubble = document.createElement("span");
    let bottomOffset = (Math.random() * 100);
    let leftOffset = (Math.random() * 100);
    let randNum = Math.floor(Math.random() * 3);
    const animationArr = ["bubble-1", "bubble-2", "bubble-3"];

    bubble.classList.add("bubble");
    bubble.classList.add(animationArr[randNum]);
    bubble.style.left = leftOffset + "%";
    bubble.style.bottom = bottomOffset + "%";
    window.appendChild(bubble);

    setTimeout(() => bubble.remove(), 5000);
}
setInterval(createBubble, 750);
