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
        for(let i = 0; i < this.matrix.length; ++i)
            for(let j = 0; j < this.matrix.length; ++j)
                this.matrix[i][j] += matrixTwo[i][j];
            return this;
    }
    substractFromMatrix(matrixTwo){
        for(let i = 0; i < this.matrix.length; ++i)
            for(let j = 0; j < this.matrix.length; ++j)
                this.matrix[i][j] -= matrixTwo[i][j];
        return this;
    }
    multiplyByMatrix(matrixTwo){

    }
    inverseMatrix(matrixTwo){

    }
    transposeMatrix(){
        const tempMatrix = JSON.parse(JSON.stringify(this));
        for(let i = 0; i < this.matrix.length; ++i){
            for(let j = 0; j < this.matrix.length; ++j) {
                this.matrix[j][i] = tempMatrix.matrix[i][j];
            }
        }
        return this;
    }
    createExtendedMatrix() {

    }
}

