import {
  computeReadingTime,
  computeTotalCharacterCountWithoutSpaces,
  computeTotalCharacterCountWithSpaces,
  computeWordCount,
  computeSentenceCount,
  computeLetterDensityResultsHTML,
} from "./logic.js";
import {
  getElement,
  handleReadingTimeFormat,
  handleStatisticFormat,
} from "./utils.js";

// Function to toggle between light and dark themes
export const toggleTheme = () => {
  const root = document.documentElement;
  const isLight = root.dataset.theme === "light";
  if (isLight) {
    root.dataset.theme = "dark";
  } else {
    root.dataset.theme = "light";
  }
};

// Function to display See more
export const displaySeeMore = () => {
  const seeMoreText = getElement("id", "see-text-more");
  const seeLessText = getElement("id", "see-text-less");

  seeMoreText.style.display = "block";
  seeLessText.style.display = "none";
};

// Function to display See less
export const displaySeeLess = () => {
  const seeMoreText = getElement("id", "see-text-more");
  const seeLessText = getElement("id", "see-text-less");
  seeLessText.style.display = "block";
  seeMoreText.style.display = "none";
};

// Function to Update reading time display in the DOM
export const updateReadingTime = () => {
  const textArea = getElement("id", "text-input");
  const readingTimeDisplay = getElement("id", "reading-time");

  const text = textArea.value;
  const readingTime = computeReadingTime(text);
  const formattedTime = handleReadingTimeFormat(readingTime);

  readingTimeDisplay.textContent = formattedTime;
};

// Function to Update character count excluding spaces in the DOM
export const updateTotalCharacterCountWithoutSpaces = () => {
  const textArea = getElement("id", "text-input");
  const charCountDisplay = getElement("id", "total-characters");

  const text = textArea.value;
  const charCount = computeTotalCharacterCountWithoutSpaces(text);
  const formattedCount = handleStatisticFormat(charCount);

  charCountDisplay.textContent = formattedCount;
};

// Function to Update character count including spaces in the DOM
export const updateTotalCharacterCountWithSpaces = () => {
  const textArea = getElement("id", "text-input");
  const charCountDisplay = getElement("id", "total-characters");

  const text = textArea.value;
  const charCount = computeTotalCharacterCountWithSpaces(text);
  const formattedCount = handleStatisticFormat(charCount);

  charCountDisplay.textContent = formattedCount;
};

// Function to update character count based on checkbox state
export const updateTotalCharacterCount = () => {
  const excludeSpacesCheckbox = getElement("id", "exclude-spaces");
  const isChecked = excludeSpacesCheckbox.checked;

  if (isChecked) {
    updateTotalCharacterCountWithoutSpaces();
  } else {
    updateTotalCharacterCountWithSpaces();
  }
};

// Function to Update word count in the DOM
export const updateWordCount = () => {
  const textArea = getElement("id", "text-input");
  const wordCountDisplay = getElement("id", "word-count");

  const text = textArea.value;
  const wordCount = computeWordCount(text);
  const formattedCount = handleStatisticFormat(wordCount);

  wordCountDisplay.textContent = formattedCount;
};

// Function to Update sentence count in the DOM
export const updateSentenceCount = () => {
  const textArea = getElement("id", "text-input");
  const sentenceCountDisplay = getElement("id", "sentence-count");

  const text = textArea.value;
  const sentenceCount = computeSentenceCount(text);
  const formattedCount = handleStatisticFormat(sentenceCount);

  sentenceCountDisplay.textContent = formattedCount;
};

// displays Character Limit Box
export const toggleCharacterLimitBox = () => {
  const characterLimitCheckbox = getElement("id", "set-character-limit");
  const characterLimitInput = getElement("class", "character-limit-input")[0];
  const textArea = getElement("id", "text-input");
  const isChecked = characterLimitCheckbox.checked;

  if (isChecked) {
    characterLimitInput.style.visibility = "visible";
  } else {
    characterLimitInput.style.visibility = "hidden";
    characterLimitInput.value = ""; //clear value
    textArea.removeAttribute("maxlength"); // un-set maxLength
  }
};

// set Character limit
export const setCharacterLimit = () => {
  const characterLimitInput = getElement("class", "character-limit-input")[0];
  const textInput = getElement("id", "text-input");
  textInput.maxLength = characterLimitInput.value;
};

// display Limit Reached Message
export const displayLimitReachedMessage = () => {
  const textArea = getElement("id", "text-input");
  const limitReachedMessage = getElement("class", "limit-reached-message")[0];
  const characterLimitInput = getElement("class", "character-limit-input")[0];
  const characterLimit = getElement("id", "charater-limit");

  const characterCount = computeTotalCharacterCountWithSpaces(textArea.value);
  if (characterLimitInput.value == 0) {
    textArea.removeAttribute("maxlength");
    return;
  }
  if (characterLimitInput.value == "") {
    textArea.removeAttribute("maxlength");

    limitReachedMessage.style.display = "none";
  } else if (characterCount >= characterLimitInput.value) {
    limitReachedMessage.style.display = "block";
    characterLimit.textContent = characterLimitInput.value;
  } else {
    limitReachedMessage.style.display = "none";
  }
};

// Function to display top 5 Letter Density Results
export const displayTop5LetterDensityResults = () => {
  const densityResult = getElement("id", "density-results");
  const displayLetterDensity = getElement("id", "display-letter-density");
  const textInput = getElement("id", "text-input");
  const seeLessText = getElement("id", "see-text-less");
  const seeMoreText = getElement("id", "see-text-more");

  const letterDensityStrings = computeLetterDensityResultsHTML();

  let results = "";
  for (let i = 0; i < 5; i++) {
    if (letterDensityStrings[i] !== undefined) {
      results += letterDensityStrings[i];
    }
  }

  if (textInput.value == "") {
    results = "";
    displayLetterDensity.textContent =
      "No characters found. Start typing to see letter density.";
    densityResult.innerHTML = "";
    seeLessText.style.display = "none";
    seeMoreText.style.display = "none";
  } else {
    displayLetterDensity.textContent = "";
    console.log(results);
    densityResult.innerHTML = results;
    displaySeeMore();
  }
  // show more button
};

// Function to display all Letter Density Results
export const displayAllLetterDensityResults = () => {
  const densityResult = getElement("id", "density-results");
  const displayLetterDensity = getElement("id", "display-letter-density");
  const textInput = getElement("id", "text-input");
  const seeLessText = getElement("id", "see-text-less");
  const seeMoreText = getElement("id", "see-text-more");

  const letterDensityStrings = computeLetterDensityResultsHTML();

  let results = "";
  for (let i = 0; i < letterDensityStrings.length; i++) {
    if (letterDensityStrings[i] !== undefined) {
      results += letterDensityStrings[i];
    }
  }

  if (textInput.value == "") {
    results = "";
    displayLetterDensity.textContent =
      "No characters found. Start typing to see letter density.";
    densityResult.innerHTML = "";
    seeLessText.style.display = "none";
    seeMoreText.style.display = "none";
  } else {
    displayLetterDensity.textContent = "";
    console.log(results);
    densityResult.innerHTML = results;
  }
  console.log(results);
  displaySeeLess();
};
