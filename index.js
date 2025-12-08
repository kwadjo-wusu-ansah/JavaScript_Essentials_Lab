// Function to get DOM elements based on selector type  (1) - /*utility*/
const getElement = (selectorType, name) => {
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

// Function to toggle between light and dark themes (fxn)
const toggleTheme = () => {
  const root = document.documentElement;
  const isLight = root.dataset.theme === "light";
  if (isLight) {
    root.dataset.theme = "dark";
  } else {
    root.dataset.theme = "light";
  }
};

// Function to convert text to an array of words without punctuations and extra spaces (1) - /*utility*/
const TextToWords = (text) => {
  text = text.replace(/[^\w\s]|_/g, ""); // remove punctuation
  return text.trim().split(/\s+/); // split by whitespace
};

// Function to convert text to an array of characters including spaces and punctuation (1) - /*utility*/
const TextToCharacterWithSpaces = (text) => {
  return text.split("");
};

// Function to convert text to an array of characters excluding spaces (1) - /*utility*/
const TextToCharacterWithoutSpaces = (text) => {
  return text.split("").filter((char) => char !== " ");
};

// Function to convert text to an array of characters excluding spaces and punctuations (1) - /*utility*/
const TextToCharacterWithoutSpacesAndPunctuation = (text) => {
  text = text.replace(/[^\w\s]|_/g, "");
  return text.split("").filter((char) => char !== " ");
};

// Function to convert text to an array of sentences  (1) - /*utility*/
const TextToSentences = (text) => {
  return text.split(/[.!?]+/).filter((sentence) => sentence.trim() !== "");
};

// Function to format statistic counts to always have at least two digits  /*formating*/
const handleStatisticFormat = (Count) => {
  if (Count > 9) {
    return Count.toString();
  } else {
    return "0" + Count.toString();
  }
};

// Function to compute reading time in minutes based on average reading speed (2) - /*utility*/
const computeReadingTime = (text) => {
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

// Function to format reading time display /*formating*/
const handleReadingTimeFormat = (readingTime) => {
  if (readingTime == 0) {
    return "0";
  } else if (readingTime > 0 && readingTime < 1) {
    return "< 1";
  } else {
    return readingTime.toFixed(0);
  }
};

// Function to Update reading time display in the DOM (fxn)
const updateReadingTime = () => {
  const textArea = getElement("id", "text-input");
  const readingTimeDisplay = getElement("id", "reading-time");

  const text = textArea.value;
  const readingTime = computeReadingTime(text);
  const formattedTime = handleReadingTimeFormat(readingTime);

  readingTimeDisplay.textContent = formattedTime;
};

// Function to compute character count excluding spaces  (2) - /*utility*/
const computeTotalCharacterCountWithoutSpaces = (text) => {
  const characters = TextToCharacterWithoutSpaces(text);
  return characters.length;
};

// Function to Update character count excluding spaces in the DOM (fxn)
const updateTotalCharacterCountWithoutSpaces = () => {
  const textArea = getElement("id", "text-input");
  const charCountDisplay = getElement("id", "total-characters");

  const text = textArea.value;
  const charCount = computeTotalCharacterCountWithoutSpaces(text);
  const formattedCount = handleStatisticFormat(charCount);

  charCountDisplay.textContent = formattedCount;
};

// Function to compute character count including spaces  (2) - /*utility*/
const computeTotalCharacterCountWithSpaces = (text) => {
  const characters = TextToCharacterWithSpaces(text);
  return characters.length;
};

// Function to Update character count including spaces in the DOM (fxn)
const updateTotalCharacterCountWithSpaces = () => {
  const textArea = getElement("id", "text-input");
  const charCountDisplay = getElement("id", "total-characters");

  const text = textArea.value;
  const charCount = computeTotalCharacterCountWithSpaces(text);
  const formattedCount = handleStatisticFormat(charCount);

  charCountDisplay.textContent = formattedCount;
};

// Function to update character count based on checkbox state (fxn)
const updateTotalCharacterCount = () => {
  const excludeSpacesCheckbox = getElement("id", "exclude-spaces");
  const isChecked = excludeSpacesCheckbox.checked;

  if (isChecked) {
    updateTotalCharacterCountWithoutSpaces();
  } else {
    updateTotalCharacterCountWithSpaces();
  }
};

// Function to compute word count (2) - /*utility*/
const computeWordCount = (text) => {
  const words = TextToWords(text);
  if (words.length === 1 && words[0] === "") {
    // handle empty string case
    return 0;
  }
  return words.length;
};

// Function to Update word count in the DOM (fxn)
const updateWordCount = () => {
  const textArea = getElement("id", "text-input");
  const wordCountDisplay = getElement("id", "word-count");

  const text = textArea.value;
  const wordCount = computeWordCount(text);
  const formattedCount = handleStatisticFormat(wordCount);

  wordCountDisplay.textContent = formattedCount;
};

//Function to compute the sentence count (2) - /*utility*/
const computeSentenceCount = (text) => {
  const sentences = TextToSentences(text);
  return sentences.length;
};

// Function to Update sentence count in the DOM (fxn)
const updateSentenceCount = () => {
  const textArea = getElement("id", "text-input");
  const sentenceCountDisplay = getElement("id", "sentence-count");

  const text = textArea.value;
  const sentenceCount = computeSentenceCount(text);
  const formattedCount = handleStatisticFormat(sentenceCount);

  sentenceCountDisplay.textContent = formattedCount;
};

// displays CharateLimit Box (fxn)
const toggleCharacterLimitBox = () => {
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

// set Character limit (fxn)
const setCharacterLimit = () => {
  const characterLimitInput = getElement("class", "character-limit-input")[0];
  const textInput = getElement("id", "text-input");
  textInput.maxLength = characterLimitInput.value;
};

// display Limit Reached Message (fxn)
const displayLimitReachedMessage = () => {
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

// Function to compute Letter Density Results (2) - /*utility*/
const computeLetterDensityResultsHTML = () => {
  const letterDensity = new Map();
  const textInput = getElement("id", "text-input");
  let characters = TextToCharacterWithoutSpacesAndPunctuation(textInput.value);
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

// Function to display top 5 Letter Density Results (fxn)
const displayTop5LetterDensityResults = () => {
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

// Function to display all Letter Density Results (fxn)
const displayAllLetterDensityResults = () => {
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

// Function to display See more (fxn)
const displaySeeMore = () => {
  const seeMoreText = getElement("id", "see-text-more");
  const seeLessText = getElement("id", "see-text-less");

  seeMoreText.style.display = "block";
  seeLessText.style.display = "none";
};

// Function to display See less (fxn)
const displaySeeLess = () => {
  const seeMoreText = getElement("id", "see-text-more");
  const seeLessText = getElement("id", "see-text-less");
  seeLessText.style.display = "block";
  seeMoreText.style.display = "none";
};

const textInput = getElement("id", "text-input");

const excludeSpacesCheckbox = getElement("id", "exclude-spaces");
const appearanceToggle = getElement("id", "appearance-toggle");
const characterLimitCheckbox = getElement("id", "set-character-limit");
const characterLimitInput = getElement("class", "character-limit-input")[0];

const seeMoreText = getElement("id", "see-text-more");
const seeLessText = getElement("id", "see-text-less");

appearanceToggle.addEventListener("click", toggleTheme);

textInput.addEventListener("input", updateReadingTime);

textInput.addEventListener("input", updateTotalCharacterCount);
excludeSpacesCheckbox.addEventListener("change", updateTotalCharacterCount);

textInput.addEventListener("input", updateWordCount);

textInput.addEventListener("input", updateSentenceCount);

characterLimitCheckbox.addEventListener("change", toggleCharacterLimitBox);

characterLimitInput.addEventListener("input", setCharacterLimit);

textInput.addEventListener("input", displayLimitReachedMessage);
characterLimitInput.addEventListener("input", displayLimitReachedMessage);

textInput.addEventListener("input", displayTop5LetterDensityResults);

seeMoreText.addEventListener("click", displayAllLetterDensityResults);

seeLessText.addEventListener("click", displayTop5LetterDensityResults);
