const number = [20, 12, 35, 11, 17, 9, 58, 23, 69, 21];
console.log(number);

const bubbleSort = number => {
    for (let i = 0; i < number.length; i++) {
        for (let j = 0; j < number.length; j++) {
            if (number[j] > number[j + 1]) {
                const condition = number[j];
                number[j] = number[j + 1];
                number[j + 1] = condition
            }
        }
    }
    return number
}

bubbleSort(number);
console.log(number);