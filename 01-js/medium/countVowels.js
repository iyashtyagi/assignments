/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  const vowels = ["a","e","i","o","u"];
  let totalVowels = 0;
  const strArray = [...(str.toLowerCase())];
  strArray.forEach(element => {
    if(vowels.includes(element)){
      totalVowels++;
    };
  });
  return totalVowels;
}

module.exports = countVowels;