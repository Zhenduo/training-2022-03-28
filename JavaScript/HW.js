// Question 1
function reverse(number) {
    let reverted = 0;
    let lastDigit;
    while (number != 0) {
        lastDigit = number % 10;
        reverted = reverted * 10 + lastDigit;
        number = Math.floor(number / 10);
    }
    return reverted;
}
console.log(reverse(123));

//Question 2
function palindrome(string) {
    for (let i=0; i<string.length/2; i++) {
        if (string[i] !== string[string.length-1-i]) {
            console.log("Not palindrome");
            return false;
        }
    }
    console.log("Is palindrome");
    return true;
}
console.log(palindrome("madam"));

//Question 3
function combination(string) {
    let array = [];
    let current = 0;
    while (current < string.length) {
        let char = string.charAt(current);
        let tempArray = [char];
        for (let i=0; i<array.length; i++) {
            tempArray.push(array[i]+char);
        }
        array = array.concat(tempArray);
        current+=1;
    }
    return array;
}
console.log(combination("dog"));

//Question 4
function alphebet(string) {
    let array = string.split('');
    let resultArray = array.sort();
    let resultString = "";
    for (let i=0; i<resultArray.length; i++) {
        resultString+=resultArray[i];
    }
    return resultString;
}
console.log(alphebet("webmaster"));

//Question 5
function uppercase(string) {
    let array = string.split(' ');
    let resultString = "";
    for (let i=0; i<array.length; i++) {
        let currentWord = array[i];
        let convert = "";
        let upper = currentWord.charAt(0).toUpperCase();
        let rest = currentWord.slice(1);
        convert += upper + rest;
        resultString = resultString + convert + " ";
    }
    return resultString;
}
console.log(uppercase("the quick brown fox"));

//Question 6
function longest(string) {
    let array = string.split(' ');
    if (array.length > 0) {
        let longest = array[0];
        for (let i=1; i<array.length; i++) {
            if (array[i].length > longest.length) {
                longest = array[i];
            }
        }
        return longest;
    } else {
        return "";
    }
}
console.log(longest("Web Development Tutorial"))

//Question 7
function vowel(string) {
    let array = string.split('');
    let count = 0;
    for (let i=0; i<array.length; i++) {
        if (array[i] == 'a' || array[i] == 'e' || array[i] == 'i' || array[i] == 'o' || array[i] == 'u') {
            count += 1;
        }
    }
    return count;
}
console.log(vowel("The quick brown fox"));

//Question 8
function isPrime(number) {
    if (number > 1) {
        for (let i=2; i<number; i++) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}
console.log(isPrime(97));

//Question 9
function type(args) {
    return typeof args;
}
console.log(type(isPrime));

//Question 10
function identityMatrix(n) {
    let matrix = [];
    for (let i=0; i<n; i++) {
        let col = [];
        for (let j=0; j<n; j++) {
            if (i === j) {
                col.push(1);
            } else {
                col.push(0);
            }
        }
        matrix.push([col]);
    }
    return matrix;
}
console.log(identityMatrix(4));

//Question 11
function secondlowestgreatest(array) {
    if (array.length > 2) {
        let sorted = array.sort((a,b) => a-b);
        if (sorted.length === 3) {
            return [sorted[1], sorted[1]];
        } else {
            return [sorted[1], sorted[sorted.length-2]];
        }
    } else {
        return [];
    }
}
console.log(secondlowestgreatest([5,6,1,4,20]))

//Question 12
function isPerfect(number) {
    if (number !== 0) {
        let array = [];
        let sum = 0;
        for (let i=1; i<=number; i++) {
            if (number % i === 0) {
                array.push(i);
            }
        }
        for (let j=0; j<array.length; j++) {
            sum += array[j];
        }
        if (sum / 2 === number) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
console.log(isPerfect(496));

//Queston 13
function factors(number) {
    if (number < 1) {
        return NaN;
    } else {
        let array = [];
        for (let i=1; i<=number; i++) {
            if (number % i === 0) {
                array.push(i);
            }
        }
        return array;
    }
}
console.log(factors(100));

//Question 14
function amountTocoints(amount, coin) {
    let coinList = coin.sort((a,b) => b-a);
    let amountLeft = amount;
    let array = [];
    let currentCoin = coinList[0];
    let count = 0;
    while (amountLeft > 0) {
        if (amountLeft - currentCoin === 0 ) {
            array.push(currentCoin);
            break;
        } else if (amountLeft - currentCoin > 0) {
            array.push(currentCoin);
            amountLeft -= currentCoin;
        } else {
            count+=1;
            currentCoin = coinList[count];
        }
    }
    return array;
}
console.log(amountTocoints(46, [25,10,5,2,1]));

//Question 15
function exponent(b, n) {
    return b ** n;
}
console.log(exponent(4, 5));

//Question 16
function unique(string) {
    let array = string.split('');
    let uniqueString = [];
    let answer = "";
    for (let i=0; i<array.length; i++) {
        if (uniqueString.indexOf(array[i]) === -1) {
            uniqueString.push(array[i]);
        }
    }
    for (let j=0; j<uniqueString.length; j++) {
        answer += uniqueString[j];
    }
    return answer;
}
console.log(unique("thequickbrownfoxjumpsoverthelazydog"));

//Question 17
function occurrence(string) {
    let map = new Map();
    let array = string.split('');
    for (let i=0; i<array.length; i++) {
        if (map.has(array[i])) {
            let occur = map.get(array[i]);
            map.set(array[i], occur+=1);
        } else {
            map.set(array[i], 1);
        }
    }
    return map;
    
}
console.log(occurrence("aaabbbcccaaa"));

//Question 18
function binarySearch(array, desired, start, end) {
    if (array.length < 1) {
        return false;
    } else {
        let sorted = array.sort((a,b) => a-b);
        if (start > end) {
            return false;
        } else {
            let middle = Math.floor((start+end)/2);
            if (sorted[middle] === desired) {
                return true;
            } else if (sorted[middle] > desired) { 
                return binarySearch(array, desired, start, middle-1);
            } else {
                return binarySearch(array, desired, middle+1, end);
            }
        }
    }
}
console.log(binarySearch([5,6,2,4,8,3], 3, 0, 5));

//Question 19
function larger(array, number) {
    let result = [];
    for (let i=0; i<array.length; i++) {
        if (array[i] > number) {
            result.push(array[i]);
        }
    }
    return result;
}
console.log(larger([53,50,20,33,42,51], 50));

//Question 20
function randomID(length) {
    let characterList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i=0; i<length; i++) {
        id += characterList.charAt(Math.floor(Math.random() * characterList.length));
    }
    return id;
}
console.log(randomID(10));

//Question 21
function subset(array, length) {
    if (array.length < length) {
        return NaN;
    } else if (array.length === length) {
        return array;
    } else {
        let result = [[]];
        let current;
        for (let x of array) {
            current = result.map(item => [...item, x]);
            result = [...result,...current];
        }
        let finalResult = [[]];
        for (let i=0; i<result.length; i++) {
            if (result[i].length === length) {
                finalResult.push(result[i]);
            }
        }
        return finalResult;
    }
}
console.log(subset([1,2,3], 2))

//Question 22
function specificOccurence(string, letter) {
    let array = string.split('');
    let count = 0;
    for (let i=0; i<array.length; i++) {
        if (array[i] === letter) {
            count += 1;
        }
    }
    return count;
}
console.log(specificOccurence("microsoft.com", "o"));

//Question 23
function nonrepeat(string) {
    let map = occurrence(string);
    let candidateAnswer = [];
    map.forEach((value, key) => {
        if (value === 1) {
            candidateAnswer.push(key);
        }
    });
    return candidateAnswer[0];
}
console.log(nonrepeat("abacddbec"));

//Question 24
function bubbleSort(array) {
    let swap;
    let index = array.length-1;
    let tempArray = array;
    do {
        swap = false;
        for (let i=0; i < index; i++) {
            if (tempArray[i] < tempArray[i+1]) {
                swap = true;
                let temp = tempArray[i];
                tempArray[i] = tempArray[i+1];
                tempArray[i+1] = temp;
            }
        }
        index -= 1;
    } while (swap);
    return tempArray;
}
console.log(bubbleSort([12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]));

//Question 25
function countryName(array) {
    let longest = "";
    for (let i=0; i<array.length; i++) {
        if (array[i].length > longest.length) {
            longest = array[i];
        }
    }
    return longest;
}
console.log(countryName(["Australia", "Germany", "United States of America"]));

//Question 26
function longestnonrepeat(string) {
    let array = string.split("");
    let subset = "";
    let candidates = [];
    for (let i=0; i<array.length; i++) {
        if (subset.includes(array[i])) {
            candidates.push(subset);
            subset = array[i];
        } else {
            subset += array[i];
        }
    }
    candidates.push(subset);
    let longest = "";
    for (let j=0; j<candidates.length; j++) {
        if (candidates[j].length > longest.length) {
            longest = candidates[j];
        }
    }
    console.log(candidates)
    return longest;
}
console.log(longestnonrepeat("abcaazxgo"));

//Question 27
function longestPalindrome(string) {
    let array = combination(string);
    let longest = "";
    for (let i=0; i<array.length; i++) {
        if (array[i].length > longest.length && palindrome(array[i])) {
            longest = array[i];
        }
    }
    return longest;
}
console.log(longestPalindrome("bananas"));

//Question 28
function functionParameter(name, cb) {
    console.log(name);
    cb();
}
function getAge() {
    console.log("20");
}
functionParameter("adam", getAge);

//Question 29
function getFunctionName() {
    console.log(arguments.callee.name);
}
getFunctionName();