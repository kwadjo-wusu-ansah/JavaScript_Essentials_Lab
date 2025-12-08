/*String Manipulation Functions*/

// Function to convert text to an array of words without punctuations and extra spaces
export const TextToWords = (text) => {
  text = text.replace(/[^\w\s]|_/g, ""); // remove punctuation
  return text.trim().split(/\s+/); // split by whitespace
};

// Function to convert text to an array of characters including spaces and punctuation
export const TextToCharacterWithSpaces = (text) => {
  return text.split("");
};

// Function to convert text to an array of characters excluding spaces
export const TextToCharacterWithoutSpaces = (text) => {
  return text.split("").filter((char) => char !== " ");
};

// Function to convert text to an array of characters excluding spaces and punctuations
export const TextToCharacterWithoutSpacesAndPunctuation = (text) => {
  text = text.replace(/[^\w\s]|_/g, "");
  return text.split("").filter((char) => char !== " ");
};

// Function to convert text to an array of sentences
export const TextToSentences = (text) => {
  return text.split(/[.!?]+/).filter((sentence) => sentence.trim() !== "");
};

/*Formatting Functions*/

// Function to format statistic counts to always have at least two digits  /*formating*/
export const handleStatisticFormat = (Count) => {
  if (Count > 9) {
    return Count.toString();
  } else {
    return "0" + Count.toString();
  }
};

// Function to format reading time display /*formating*/
export const handleReadingTimeFormat = (readingTime) => {
  if (readingTime == 0) {
    return "0";
  } else if (readingTime > 0 && readingTime < 1) {
    return "< 1";
  } else {
    return readingTime.toFixed(0);
  }
};

/*DOM Manipulation Functions*/

// Function to get DOM elements based on selector type
export const getElement = (selectorType, name) => {
  if (selectorType == "id") {
    return document.getElementById(name);
  } else if (selectorType == "class") {
    return document.getElementsByClassName(name);
  } else if (selectorType == "tag") {
    return document.getElementsByTagName(name);
  } else {
    return Error("Invalid selector type");
  }
};
