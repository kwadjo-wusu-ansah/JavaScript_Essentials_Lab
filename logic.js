import {
  TextToWords,
  TextToCharacterWithSpaces,
  TextToCharacterWithoutSpaces,
  TextToCharacterWithoutSpacesAndPunctuation,
  TextToSentences,
  getElement,
  removeNumbersFromText,
  removeNewLinesFromText,
} from "./utils.js";

// Function to compute reading time in minutes based on average reading speed (2) - /*utility*/
export const computeReadingTime = (text) => {
  const averageWordsPerMinute = 200; // average reading speed
  const words = TextToWords(text);

  if (words.length === 1 && words[0] === "") {
    // handle empty string case
    return 0;
  } else {
    const readingTimeMinutes = words.length / averageWordsPerMinute;
    return readingTimeMinutes;
  }
};

// Function to compute character count excluding spaces  (2) - /*utility*/
export const computeTotalCharacterCountWithoutSpaces = (text) => {
  const characters = TextToCharacterWithoutSpaces(text);
  return characters.length;
};

// Function to compute character count including spaces  (2) - /*utility*/
export const computeTotalCharacterCountWithSpaces = (text) => {
  const characters = TextToCharacterWithSpaces(text);
  return characters.length;
};

// Function to compute word count (2) - /*utility*/
export const computeWordCount = (text) => {
  const words = TextToWords(text);
  if (words.length === 1 && words[0] === "") {
    // handle empty string case
    return 0;
  }
  return words.length;
};

//Function to compute the sentence count (2) - /*utility*/
export const computeSentenceCount = (text) => {
  const sentences = TextToSentences(text);
  return sentences.length;
};

// Function to compute Letter Density Results (2) - /*utility*/
export const computeLetterDensityResultsHTML = () => {
  const letterDensity = new Map();
  const textInput = getElement("id", "text-input");
  // sanitize the raw text first, then split into characters
  let content = textInput.value;
  content = removeNumbersFromText(content);
  content = removeNewLinesFromText(content);
  let characters = TextToCharacterWithoutSpacesAndPunctuation(content);
  characters = characters.map((character) => character.toUpperCase());

  for (let i = 0; i < characters.length; i++) {
    if (letterDensity.has(characters[i])) {
      letterDensity.set(characters[i], letterDensity.get(characters[i]) + 1);
    } else {
      letterDensity.set(characters[i], 1);
    }
  }

  const sortedLetterDensity = [...letterDensity].sort(
    (pairA, pairB) => pairB[1] - pairA[1]
  );

  const letterDensityStrings = sortedLetterDensity.map((pair) => {
    const letterDensityPercentage = (
      (pair[1] / characters.length) *
      100
    ).toFixed(2);

    return `<label class= "progress-bar-label">
              ${pair[0]} <progress value="${letterDensityPercentage}" max="100" class= "progress-bar" >${letterDensityPercentage}</progress> ${pair[1]} (${letterDensityPercentage}%)
            </label><br>`;
  });

  return letterDensityStrings;
};
