/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const cleanStr = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~() \[\]\\@"'<>?]/g,"");
  const strArray = [...(cleanStr.toLowerCase())];
  const revStrArray = [...strArray].reverse();
  if (JSON.stringify(strArray) === JSON.stringify(revStrArray)) {
    return true;
  }
  return false;
}

module.exports = isPalindrome;