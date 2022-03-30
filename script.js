function getValues(){
    const rows = document.querySelectorAll('.row');
    const arr = [];
    for(let i = 0; i < rows.length; ++i){
        arr.push(Array.from(rows[i].children).map(x => parseFloat(x.value)));
    }
    console.log(arr);
    return arr;
}
function handleUserActivity(){
    arr = getValues();

    const resultDiv = document.querySelector('.result');
    if(checkData(arr)){
        resultDiv.innerHTML = "Please enter correct data!";
    }
    else{
        const det = computeDet(arr);
        resultDiv.textContent = "Result is: "+ det.toPrecision(3);
    }
}
function clearData(){
    document.querySelector('.result').innerHTML = "";
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


