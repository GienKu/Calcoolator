function draggableCalculator(){
    let calcHolder = document.querySelector(".calculatorHolder");
    const calcBar = document.querySelector(".calc-bar");
    calcHolder.classList.toggle("calc-active");
    
    calcBar.addEventListener("mousedown", () => {
        window.addEventListener("mousemove", onDrag);
        calcBar.classList.toggle("calc-bar-grabbed");
    });
    
    window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", onDrag);
        calcBar.classList.toggle("calc-bar-grabbed");
    });
}
function onDrag(e){
    const calcHolder = document.querySelector(".calculatorHolder");
    let styles = window.getComputedStyle(calcHolder);
    let left = parseInt(styles.left);
    let top = parseInt(styles.top);
    
    calcHolder.style.left = `${left + e.movementX}px`;
    calcHolder.style.top = `${top + e.movementY}px`;
}