import { gameData } from "./dataLoader.js";

function getRandomEvent(character) {
  let pool = [];

  if (character.age <= 12) {
    pool = gameData.events.earlyLife;
  } else if (character.age <= 17) {
    pool = gameData.events.teenage;
  } else if (character.age <= 29) {
    pool = gameData.events.adulthood;
  } else if (character.age <= 59) {
    pool = gameData.events.midlife;
  } else {
    pool = gameData.events.oldAge;
  }

  if (pool.length === 0) return null;

  const idx = Math.floor(Math.random() * pool.length);
  const chosen = pool[idx];
  pool.splice(idx, 1); // remove to avoid repeat

  return chosen;
}

// A helper function to see if an event describes a fatal outcome
function isFatalEvent(eventText) {
  // If the text contains certain keywords, we consider it deadly
  // e.g. "You died", "fatally", "passed away", etc.
  const lower = eventText.toLowerCase();
  return (
    lower.includes("you died") ||
    lower.includes("fatally") ||
    lower.includes("passed away") ||
    lower.includes("shot") ||
    lower.includes("couldn't breathe")
  );
}

export { getRandomEvent, isFatalEvent };
