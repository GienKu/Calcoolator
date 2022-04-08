class Matrix {
    constructor(valuesArr){
        this.matrix = valuesArr;
        this.nSize = valuesArr.length;
        this.mSize = valuesArr[0].length;
    }

    computeMatrixDet(){
        const copiedMatrix = JSON.parse(JSON.stringify(this));
        let det = copiedMatrix.matrix[0][0];
        for(let s = 0; s < copiedMatrix.nSize-1; ++s){
            for(let i = s + 1; i < copiedMatrix.nSize; ++i){
                for(let j = s+1; j < copiedMatrix.mSize; ++j){
                    copiedMatrix.matrix[i][j] -= (copiedMatrix.matrix[i][s] / copiedMatrix.matrix[s][s]) * copiedMatrix.matrix[s][j];
                }
            }
            det *= copiedMatrix.matrix[s+1][s+1];
        }
        return det
    }

    addToMatrix(matrixTwo){
        for(let i = 0; i < this.nSize; ++i)
            for(let j = 0; j < this.mSize; ++j)
                this.matrix[i][j] += matrixTwo[i][j];
            return this;
    }

    substractFromMatrix(matrixTwo){
        for(let i = 0; i < this.nSize; ++i)
            for(let j = 0; j < this.mSize; ++j)
                this.matrix[i][j] -= matrixTwo[i][j];
        return this;
    }

    multiplyByMatrix(matrixTwo){
        const tempMatrix = JSON.parse(JSON.stringify(this));

        for(let i = 0; i < this.nSize; ++i)
            for(let j = 0; j < matrixTwo.nSize; ++j){
                this.matrix[i][j] = 0;
                for( let k = 0; k < this.mSize; ++k)
                    this.matrix[i][j] += tempMatrix.matrix[i][k] * matrixTwo.matrix[k][j];
        }
        return this;
    }

    inverseMatrix(){
        this.convertToExtendedMatrix();
        let c;
        let d;
        for(let s = 0; s < this.nSize; ++s){
            c = this.matrix[s][s];
            this.matrix[s][s] -= 1;
            for(let j = s + 1; j < this.mSize; ++j){
                d = this.matrix[s][j] / c;
                for(let i = 0; i < this.nSize; ++i){
                    this.matrix[i][j] = this.matrix[i][j] - (d * this.matrix[i][s]);
                }
            }
        }
        console.log(this);
        let inversedMatrix = [];
        let chunk = [];
        this.mSize /= 2;
        for(let i = 0; i < this.nSize; ++i){
            for(let j = 0; j < this.mSize; ++j) {
                chunk.push(this.matrix[i][j + this.nSize]);
            }
            inversedMatrix.push(chunk);
            chunk = [];
        }
        this.matrix = inversedMatrix;
        console.log(this);
        return this;
    }

    transposeMatrix(){
        let transposedMatrix = [];
        let chunk = [];
        for(let i = 0; i < this.nSize; ++i){
            for(let j = 0; j < this.mSize; ++j) {
                chunk.push(this.matrix[j][i]);
            }
            transposedMatrix.push(chunk);
            chunk = [];
        }
        this.matrix = transposedMatrix;
        return this;
    }

    convertToExtendedMatrix(){
        for(let i = 0; i < this.nSize; ++i){
            for(let j = 0; j < this.mSize; ++j) {
                    if( i == j)
                        this.matrix[i].push(1);
                    else
                        this.matrix[i].push(0);
                }
            }
            this.mSize *= 2;
            return this;
    }

}

