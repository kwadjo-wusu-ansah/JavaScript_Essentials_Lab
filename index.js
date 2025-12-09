import {
  toggleTheme,
  updateReadingTime,
  updateTotalCharacterCount,
  updateWordCount,
  updateSentenceCount,
  toggleCharacterLimitBox,
  setCharacterLimit,
  displayLimitReachedMessage,
  displayTop5LetterDensityResults,
  displayAllLetterDensityResults,
} from "./dom.js";

import { getElement } from "./utils.js";

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
