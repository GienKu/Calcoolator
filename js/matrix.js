class Matrix {
    constructor(valuesArr){
        this.matrix = valuesArr;
    }
    computeMatrixDet(){
        let det = this.matrix[0][0];
        for(let s = 0; s < this.matrix.length-1; ++s){
            for(let i = s + 1; i < this.matrix.length; ++i){
                for(let j = s+1; j < this.matrix.length; ++j){
                    this.matrix[i][j] -= (this.matrix[i][s] / this.matrix[s][s]) * this.matrix[s][j];
                }
            }
            det *= this.matrix[s+1][s+1];
        }
        return det
    }
    addToMatrix(matrixTwo){

    }
    substractFromMatrix(matrixTwo){

    }
    multiplyByMatrix(matrixTwo){

    }
    inverseMatrix(matrixTwo){

    }
    transposeMatrix(){

    }
}

