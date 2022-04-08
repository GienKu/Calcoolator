function switchModule() {

}
//todo
 function matrixModule(){
    const htmlModule = 
    `

    `;
 }
function increaseMatrixSize(num){
    let grid = document.getElementsByClassName("grid-container")[num];
    const size = parseInt(grid.dataset.num) + 1;

    if(size > 5)
        return;
    grid.dataset.num = size;
    loadMatrixGrid(grid, size, num);
}

function decreaseMatrixSize(num){
    let grid = document.getElementsByClassName("grid-container")[num];
    const size = parseInt(grid.dataset.num) - 1;

    if(size < 2)
        return;
    grid.dataset.num = size;
    loadMatrixGrid(grid, size, num);
}

function loadMatrixGrid(grid, size, num){
    let gridHolder = document.querySelectorAll('.grid-holder')[num];
    let input = document.createElement("input");

    input.type = "text";
    num++;
    input.classList.add("value");
    input.classList.add("input-"+num)

    gridHolder.classList.toggle("grid-pre-animation");
    grid.style.gridTemplateColumns = "repeat("+size+",50px)";
    grid.style.gridTemplateRows = "repeat("+size+",30px)";
    grid.textContent="";

    for(let i = 0; i < size * size; ++i){
        grid.appendChild(input.cloneNode(1));
    }
    setTimeout(() => gridHolder.classList.toggle("grid-pre-animation"), 500);
}