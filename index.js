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

const domVariables = {
  textInput: getElement("id", "text-input"),
  excludeSpacesCheckbox: getElement("id", "exclude-spaces"),
  appearanceToggle: getElement("id", "appearance-toggle"),
  characterLimitCheckbox: getElement("id", "set-character-limit"),
  characterLimitInput: getElement("class", "character-limit-input")[0],
  seeMoreText: getElement("id", "see-text-more"),
  seeLessText: getElement("id", "see-text-less"),
};

domVariables.appearanceToggle.addEventListener("click", toggleTheme);

domVariables.textInput.addEventListener("input", updateReadingTime);
domVariables.textInput.addEventListener("input", updateTotalCharacterCount);
domVariables.excludeSpacesCheckbox.addEventListener(
  "change",
  updateTotalCharacterCount
);

domVariables.textInput.addEventListener("input", updateWordCount);

domVariables.textInput.addEventListener("input", updateSentenceCount);
domVariables.characterLimitCheckbox.addEventListener(
  "change",
  toggleCharacterLimitBox
);

domVariables.characterLimitInput.addEventListener("input", setCharacterLimit);

domVariables.textInput.addEventListener("input", displayLimitReachedMessage);
domVariables.characterLimitInput.addEventListener(
  "input",
  displayLimitReachedMessage
);

domVariables.textInput.addEventListener(
  "input",
  displayTop5LetterDensityResults
);

domVariables.seeMoreText.addEventListener(
  "click",
  displayAllLetterDensityResults
);

domVariables.seeLessText.addEventListener(
  "click",
  displayTop5LetterDensityResults
);
