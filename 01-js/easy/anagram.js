/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  const str1Array = [...(str1.toLowerCase())].sort(); 
  const str2Array = [...(str2.toLowerCase())].sort();
  if (JSON.stringify(str1Array) === JSON.stringify(str2Array)) {
    return true;
  }
  return false;
}

module.exports = isAnagram;
