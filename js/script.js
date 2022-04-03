function windowOnResize() {
    window.onresize = setWindowHeight;
}

function windowOnLoad(){
    window.onload = setWindowHeight;
    hamburgerMenu();
}
windowOnLoad();
windowOnResize();

function setWindowHeight() {
    const navbar = document.querySelector("nav");
    const navHeight = navbar.offsetHeight;
    let flexContainer = document.querySelector(".flex-container");
    flexContainer.style.height = `calc( 100vh - ${navHeight}px)`;
}

function hamburgerMenu(){
    const hamburger = document.getElementsByClassName("hamburger-menu")[0];
    const menuLayer = document.getElementsByClassName("menu-layer")[0];

    hamburger.addEventListener('click', () => {
        menuLayer.classList.toggle('menu-layer-active');
        hamburger.classList.toggle('hamburger-menu-active');

        hamburger.addEventListener('click', () => {
            menuLayer.classList.toggle('menu-layer-deactive');
            setTimeout(() => menuLayer.classList.toggle('menu-layer-deactive'),1000);
            
        });
    });
}
function buttonEventListenrs(){

}
function getValues(input){
    const values = document.querySelectorAll(input);
    const arr = Array.from(values).map(x => parseFloat(x.value));
    const size = Math.sqrt(arr.length);
    for( var chunks = [], i = 0; i < arr.length; i += size ){
        chunks.push(arr.slice(i, i + size));
    }
    console.log(chunks);
    return chunks;
}

function singleMatrixOperation(input, operation){
    matrixOne = new Matrix(getValues(input));

    if(checkData(matrixOne.matrix, input)){
        printMessage("Please enter correct data!");
    }
    else{
        switch(operation){
            case "det":
                const det = matrixOne.computeMatrixDet();
                printMessage("Result is: " + det.toPrecision(3));
                break;
            case "inverse":
                console.log("inverse");
                break;
            case "transpose":
                console.log("transpose");
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

function checkData(arr, input){
    const inputArr = Array.from(document.querySelectorAll(input));
    let flag = true;
    for( let [row, i] of arr.entries()){
        for( let [col, j]  of i.entries()){
            if(isNaN(j)){
                flag = false;
                inputArr[col + row * arr.length].classList.add("invalid-value");
            }
            else{
                inputArr[col + row * arr.length].classList.remove("invalid-value");
            }
        }
    }
    if(!flag) return true;
    else return false;
}
