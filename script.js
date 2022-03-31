function getValues(){
    const values = document.querySelectorAll('.value');
    const arr = Array.from(values).map(x => parseFloat(x.value));
    const size = Math.sqrt(arr.length);
    for( var chunks = [], i = 0; i < arr.length; i+=size ){
        chunks.push(arr.slice(i, i + size));
    }
    console.log(chunks);
    return chunks;
}
function handleUserActivity(){
    arr = getValues();

    if(checkData(arr)){
        printMessage("Please enter correct data!");
    }
    else{
        const det = computeDet(arr);
        printMessage("Result is: "+ det.toPrecision(3));
    }
}
function printMessage(str){

    let txtBox = document.querySelector('.result');
    txtBox.classList.add("result-pre-animation");
    txtBox.textContent = str;
    setTimeout(() => txtBox.classList.remove("result-pre-animation"),700)
    
}
function clearData(){
    printMessage("Insert data");
    const values = document.querySelectorAll('.value');
    for( let [indx,j] of values.entries()){
            j.value = "";
            values[indx].classList.remove("invalid-value");
    }
}
function checkData(arr){
    const inputArr = Array.from(document.querySelectorAll('.value'));
    let flag = true;
    for( let [row, i] of arr.entries()){
        for( let [col,j]  of i.entries()){
            if(isNaN(j)){
                flag = false;
                inputArr[col+row*arr.length].classList.add("invalid-value");
            }
            else{
                inputArr[col+row*arr.length].classList.remove("invalid-value");
            }
        }
    }
    if(!flag) return true;
    else return false;
}
function computeDet (arr){
    console.log(arr.length);
    let det = arr[0][0];
    for(let s = 0; s < arr.length-1; ++s){
        for(let i = s + 1; i < arr.length; ++i){
            for(let j = s+1; j < arr.length; ++j){
                arr[i][j] -= (arr[i][s] / arr[s][s]) * arr[s][j];
            }
        }
        det *= arr[s+1][s+1];
    }
    return det
}
function increaseSize(){
    let grid = document.getElementsByClassName("grid-container")[0];
    const size = parseInt(grid.dataset.num) + 1;
    if(size > 5)return;
    grid.dataset.num = size;
    loadGrid(grid, size);
    
}
function decreaseSize(){
    let grid = document.getElementsByClassName("grid-container")[0];
    const size = parseInt(grid.dataset.num) - 1;
    if(size < 2)return;
    grid.dataset.num = size;
    loadGrid(grid, size);
}
function loadGrid(grid, size){
    let gridHolder = document.querySelector('.grid-holder');
    let input = document.createElement("input");
    input.type = "text";
    input.classList.add("value");

    gridHolder.classList.toggle("grid-pre-animation");
    grid.style.gridTemplateColumns = "repeat("+size+",50px)";
    grid.style.gridTemplateRows = "repeat("+size+",30px)";
    grid.textContent="";

    for(let i = 0; i < size*size; ++i){
        grid.appendChild(input.cloneNode(1));
    }
    //setTimeout(()=>{return;},700)
    setTimeout(() => gridHolder.classList.toggle("grid-pre-animation"),500);
    //gridHolder.classList.remove("grid-pre-animation");
}

