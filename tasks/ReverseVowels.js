function reverseVowels(str) {
  var strSize = str.length,
      tempArr = new Array(strSize),
      leftPart = '',
      rightPart = '',
      sentence = '',
      start = 0,
      end,
      i = 0,
      j;
  // debugger;
  for (i; i < strSize; i += 1) {
    j = strSize - 1 - i;

    if (i < j) {
      if (checkVowels(str[i])) {
        leftPart += str[i];
      } else {
        tempArr[i] = str[i];
      }
      if (checkVowels(str[j])) {
        rightPart = str[j] + rightPart;
      } else {
        tempArr[j] = str[j];
      }
    }

    if (i === j) {
      if (checkVowels(str[i])) {
        if(leftPart.length === rightPart.length) {
          tempArr[i] = str[i];
        } else {
          rightPart = str[j] + rightPart;
          sentence = rightPart + leftPart;
          end = sentence.length - 1;
          tempArr[i] = sentence[end];
          end--;
        }
        sentence = rightPart + leftPart;
        end = sentence.length - 1;
      } else {
          tempArr[i] = str[i];
          sentence = rightPart + leftPart;
          end = sentence.length - 1;
      }
    }

    if (i === strSize / 2 && strSize % 2 === 0) {
      sentence = rightPart + leftPart;
      end = sentence.length - 1;
    }

    if (i > j) {
      if (checkVowels(str[i])) {
        tempArr[i] = sentence[end];
        end--;
      }
      if (checkVowels(str[j])) {
        tempArr[j] = sentence[start];
        start++;
      }
    }
  }
  // console.log(leftPart, rightPart);
  return tempArr.join('');
}

function checkVowels(letter) {
  return /[aeiouAUIOE]/.test(letter);
}

console.log(reverseVowels('hello'));