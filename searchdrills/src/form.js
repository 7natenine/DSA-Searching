import React, { Component } from 'react'

let dataSet = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5];
dataSet.sort((a, b) => (a > b) ? 1 : -1);

export class form extends Component {

    lookForNumberLinear = (num, data) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i] === num) {
                return i + 1;
            }
        }
    }
    failedAttempts = null;
    lookForNumberBinary = (data, num, start = 0, end = data.length -1, tries) => {
        if(start > end){
            this.failedAttempts = tries;
            return -1;
        }
        let index = Math.floor((start + end) / 2);
        let item = data[index];
        tries = tries || 0;

        if(item === num){
            return index;
        } else if( item < num){
            return this.lookForNumberBinary(data, num, index +1, end, tries + 1)
        } else if( item > num) {
            return this.lookForNumberBinary(data, num, start, index -1, tries + 1);
        }
        return tries;
    }

    handleSubmit = ev => {
        ev.preventDefault();
        let input = parseInt(ev.target.input.value);
        if(this.lookForNumberBinary(dataSet, input) < 0){
            alert('i was unable to find the number and i looked ' + this.failedAttempts + ' times')
        } else {
            alert(this.lookForNumberBinary(dataSet, input));
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>clicks</label>
                    <input type='text box' name='input'></input>
                    <button type='submit'>click</button>
                </form>
            </div>
        )
    }
}

export default form;
