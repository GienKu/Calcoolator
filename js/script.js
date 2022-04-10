function windowOnLoad(){
    buttonEventListeners();
}
windowOnLoad();

function menuDeactive(){
    const hamburger = document.getElementsByClassName("hamburger-menu")[0];
    const menuLayer = document.getElementsByClassName("menu-layer")[0];
    const pageWrapper = document.querySelector(".page-wrapper");
    
    menuLayer.classList.toggle('menu-layer-deactive');
    pageWrapper.classList.remove("disabled-scroll");
    setTimeout(() => menuLayer.classList.toggle('menu-layer-deactive'), 1000);
    hamburger.removeEventListener('click', menuDeactive);
}

function menuActive() {
    const hamburger = document.getElementsByClassName("hamburger-menu")[0];
    const menuLayer = document.getElementsByClassName("menu-layer")[0];
    const pageWrapper = document.querySelector(".page-wrapper");

    menuLayer.classList.toggle('menu-layer-active');
    hamburger.classList.toggle('hamburger-menu-active');
    pageWrapper.classList.add("disabled-scroll");
    hamburger.addEventListener('click', menuDeactive);
}

function buttonEventListeners(){
    //matrix a
    document.getElementById("but-a1").addEventListener('click', () => singleMatrixOperation('.input-1', 'det'));
    document.getElementById("but-a2").addEventListener('click', () => singleMatrixOperation('.input-1','inverse'));
    document.getElementById("but-a3").addEventListener('click', () => singleMatrixOperation('.input-1','transpose'));
    document.getElementById("but-a4").addEventListener('click', () => decreaseMatrixSize(0));
    document.getElementById("but-a5").addEventListener('click', () => clearData('.input-1'));
    document.getElementById("but-a6").addEventListener('click', () => increaseMatrixSize(0));
    //matrix b
    document.getElementById("but-b1").addEventListener('click', () => singleMatrixOperation('.input-2', 'det'));
    document.getElementById("but-b2").addEventListener('click', () => singleMatrixOperation('.input-2','inverse'));
    document.getElementById("but-b3").addEventListener('click', () => singleMatrixOperation('.input-2','transpose'));
    document.getElementById("but-b4").addEventListener('click', () => decreaseMatrixSize(1));
    document.getElementById("but-b5").addEventListener('click', () => clearData('.input-2'));
    document.getElementById("but-b6").addEventListener('click', () => increaseMatrixSize(1));
    //operations
    document.getElementById("but-add").addEventListener('click', () => doubleMatrixOperations('.input-1', '.input-2', 'add'));
    document.getElementById("but-substract").addEventListener('click', () => doubleMatrixOperations('.input-1', '.input-2', 'substract'));
    document.getElementById("but-multiply").addEventListener('click', () => doubleMatrixOperations('.input-1', '.input-2', 'multiply'));

    document.getElementById("but-copy-a").addEventListener('click', () => copyValuesFromResult("a"));
    document.getElementById("but-copy-b").addEventListener('click', () => copyValuesFromResult("b"));
    document.getElementById("but-go-back").addEventListener('click', () => goBackFromResult());
    //menu/hamburger
    document.getElementsByClassName("hamburger-menu")[0].addEventListener('click', menuActive);
}

function getValues(input){
    const values = document.querySelectorAll(input);
    const arr = Array.from(values).map(x => parseFloat(x.value));
    const size = Math.sqrt(arr.length);

    for( var chunks = [], i = 0; i < arr.length; i += size ){
        chunks.push(arr.slice(i, i + size));
    }

    return chunks;
}

function singleMatrixOperation(input, operation){
    matrixOne = new Matrix(getValues(input));
    
    if(checkData(matrixOne, input)){
        printMessage("Please enter correct data!");
    }
    else{
        switch(operation){
            case "det":
                const det = matrixOne.computeMatrixDet();
                printMessage("Result is: " + parseFloat(det.toFixed(3)));
                break;

            case "inverse":
                if(matrixOne.computeMatrixDet() != 0){
                    matrixOne.inverseMatrix();
                    sessionStorage.setItem("matrixOne", JSON.stringify(matrixOne));
                    createResultMatrixBox(matrixOne);
                    console.log(matrixOne.matrix);
                }
                else{
                    printMessage("Determinant is equal to 0 - inversed matrix doesn't exist!")
                }
                break;

            case "transpose":
                matrixOne.transposeMatrix();
                sessionStorage.setItem("matrixOne", JSON.stringify(matrixOne));
                createResultMatrixBox(matrixOne);
                break;

        }
    }
}

function doubleMatrixOperations(inputOne, inputTwo, operation) {
    matrixOne = new Matrix(getValues(inputOne));
    matrixTwo = new Matrix(getValues(inputTwo));
    
    if(checkData(matrixOne, inputOne) || checkData(matrixTwo, inputTwo)){
        printMessage("Please enter correct data!");
    }
    else{
        switch(operation){
            case "add":
                if(matrixOne.nSize != matrixTwo.nSize || matrixOne.mSize != matrixTwo.mSize)
                    printMessage("Cannot add matrix A to B - different sizes")
                else{
                    matrixOne.addToMatrix(matrixTwo.matrix);
                    sessionStorage.setItem("matrixOne", JSON.stringify(matrixOne));
                    createResultMatrixBox(matrixOne);
                }
                break;

            case "substract":
                if(matrixOne.nSize != matrixTwo.nSize || matrixOne.mSize != matrixTwo.mSize)
                    printMessage("Cannot substract matrix B from A - different sizes")
                else{
                    matrixOne.substractFromMatrix(matrixTwo.matrix);
                    sessionStorage.setItem("matrixOne", JSON.stringify(matrixOne));
                    createResultMatrixBox(matrixOne);
                }
                break;

            case "multiply":
                if(matrixOne.mSize != matrixTwo.nSize)
                    printMessage("Cannot multiply matrices A and B - different sizes")
                else{
                    matrixOne.multiplyByMatrix(matrixTwo);
                    sessionStorage.setItem("matrixOne", JSON.stringify(matrixOne));
                    createResultMatrixBox(matrixOne);
                }
                break;

        }
    }
}

function printMessage(str){
    let txtBox = document.querySelector('.result');
    txtBox.classList.add("result-pre-animation");
    txtBox.textContent = str;
    setTimeout(() => txtBox.classList.remove("result-pre-animation"), 700)
}

function clearData(input){
    printMessage("Insert data");
    const values = document.querySelectorAll(input);

    for( let [indx,j] of values.entries()){
            j.value = "";
            values[indx].classList.remove("invalid-value");
    }
}

function checkData(matrix, input){
    const inputArr = Array.from(document.querySelectorAll(input));
    let flag = true;

    for( let [row, i] of matrix.matrix.entries()){
        for( let [col, j]  of i.entries()){
            if(isNaN(j)){
                flag = false;
                inputArr[col + row * matrix.nSize].classList.add("invalid-value");
            }
            else{
                inputArr[col + row * matrix.nSize].classList.remove("invalid-value");
            }
        }
    }
    if(!flag) return true;
    else return false;
}

function createResultMatrixBox(matrix){
    const resultBox = document.querySelector(".result-matrix-values");
    let resultBoxHolder = document.querySelector(".result-matrix");
    let resultValue = document.createElement("span");

    resultValue.classList.add("result-value");
    resultBoxHolder.classList.toggle("result-matrix-active");
    resultBox.style.gridTemplateColumns = "repeat(" + matrix.mSize + ",50px)";
    resultBox.style.gridTemplateRows = "repeat(" + matrix.nSize + ",30px)";
    resultBox.textContent = "";

    for( let i = 0; i < matrix.nSize * matrix.mSize; ++i){
        resultBox.appendChild(resultValue.cloneNode());
    } 
    writeValuesToResultBox(matrix);
}

function goBackFromResult() {
    const resultBoxHolder = document.querySelector(".result-matrix");
    resultBoxHolder.classList.toggle("result-matrix-active");
    resultBoxHolder.classList.toggle("result-matrix-deactive");
    setTimeout(() => resultBoxHolder.classList.toggle("result-matrix-deactive"),1500)
}

function writeValuesToResultBox(matrix){
    const resultArr = Array.from(document.querySelectorAll('.result-value'));
    
    for( let [row, i] of matrix.matrix.entries()){
        for( let [col, j]  of i.entries()){
                resultArr[col + row * matrix.nSize].textContent = parseFloat(matrix.matrix[row][col].toFixed(3));
        }
    }
}
function copyValuesFromResult(target) {
    matrix = JSON.parse(sessionStorage.getItem("matrixOne"));
    if(target === "a")
        matrixGrid = Array.from(document.querySelectorAll(".grid-container")[0].children);
    else
        matrixGrid = Array.from(document.querySelectorAll(".grid-container")[1].children);

    for( let [row, i] of matrix.matrix.entries()){
        for( let [col, j]  of i.entries()){
                matrixGrid[col + row * matrix.nSize].value = parseFloat(matrix.matrix[row][col].toFixed(3));
        }
    }
    goBackFromResult();
}