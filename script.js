/********************************************************************
  script.js (Main Entry) - Trigger Death in Main Code
  - Loads data
  - Creates a character
  - Handles splash logic
  - Includes an ageUp() function that checks for fatal events
********************************************************************/

import { loadAllData, gameData } from "./scripts/dataLoader.js";
import { createNewCharacter } from "./scripts/character.js";
import { getRandomEvent, isFatalEvent } from "./scripts/randomEvents.js";

let character = null;

// References for splash and main container
const splash1 = document.getElementById("splash1");
const splash2 = document.getElementById("splash2");
const mainContainer = document.getElementById("mainContainer");

/********************
 *  INIT & SPLASH
 ********************/
async function initGame() {
  // Load all JSON data first
  await loadAllData();

  // Show splash screens in sequence
  showSplashScreens();
}

function showSplashScreens() {
  // SPLASH 1 is active by default. We'll hide it after 3s -> show SPLASH2 -> hide after 3s -> show main
  setTimeout(() => {
    splash1.style.opacity = "0";
    splash1.style.pointerEvents = "none";
    setTimeout(() => {
      splash1.classList.remove("splash1-active");
      splash2.classList.remove("splash2-hidden");
      splash2.style.opacity = "1";
    }, 500);
  }, 3000);

  setTimeout(() => {
    splash2.style.opacity = "0";
    splash2.style.pointerEvents = "none";
    setTimeout(() => {
      splash2.classList.add("splash2-hidden");
      mainContainer.classList.remove("hidden");
      // Start a new game
      newGame();
    }, 500);
  }, 6000);
}

/********************
 *  START/RESET
 ********************/
function newGame() {
  // Create a new character from character.js
  character = createNewCharacter();

  // Clear the ageEntries log
  document.getElementById("ageEntries").innerHTML = "";

  // Update UI to reflect new character
  updateUI();

  // Show initial messages
  createUpdateBlock([
    `You were born in ${character.location} as ${character.name}.`,
    `Starting stats - Happiness: ${character.happiness}, Health: ${character.health}, Smarts: ${character.smarts}, Looks: ${character.looks}.`
  ]);
}

/********************
 *   AGE UP
 ********************/
function ageUp() {
  if (!character || !character.isAlive) return;

  // Remove .latest from old blocks so new block is styled as "latest"
  const oldBlocks = document.querySelectorAll(".update-block.latest");
  oldBlocks.forEach(block => block.classList.remove("latest"));

  // Increase age
  character.age = (character.age || 0) + 1;

  // Prepare lines for this update
  const lines = [`Age: ${character.age} years`];

  // Get random event
  const randEvent = getRandomEvent(character);
  if (randEvent) {
    lines.push(randEvent);
    // Check if this event is fatal
    if (isFatalEvent(randEvent)) {
      // Mark character as dead
      character.health = 0;
      character.isAlive = false;
      lines.push("You have died from this tragic event!");
    }
  }

  // Do small random stat changes if not already dead
  if (character.isAlive) {
    character.happiness = clamp(character.happiness + (Math.random() * 4 - 2));
    character.health    = clamp(character.health + (Math.random() * 4 - 2));
    character.smarts    = clamp(character.smarts + (Math.random() * 4 - 2));
    character.looks     = clamp(character.looks + (Math.random() * 4 - 2));
  }

  // If health <= 0 or isAlive is false, end game
  if (character.health <= 0 || !character.isAlive) {
    lines.push("Your life has come to an end.");
    createUpdateBlock(lines);
    updateUI();
    endGame();
    return;
  }

  // Otherwise, show the new lines
  createUpdateBlock(lines);
  updateUI();
}

function clamp(value) {
  return Math.round(Math.max(0, Math.min(100, value)));
}

/********************
 *  END GAME
 ********************/
function endGame() {
  // Show an obituary or final message
  createUpdateBlock(["Game Over. Restarting in 3 seconds..."]);
  updateUI();

  // Reset after 3s
  setTimeout(() => {
    newGame();
  }, 3000);
}

/********************
 *  HELPER - CREATE UPDATE BLOCK
 ********************/
function createUpdateBlock(lines) {
  const blockDiv = document.createElement("div");
  blockDiv.classList.add("update-block", "latest");

  lines.forEach(line => {
    const p = document.createElement("p");
    p.textContent = line;
    blockDiv.appendChild(p);
  });

  const ageEntries = document.getElementById("ageEntries");
  ageEntries.prepend(blockDiv);
  ageEntries.scrollTop = 0;
}

/********************
 *  UPDATE UI
 ********************/
function updateUI() {
  if (!character) return;

  // Basic info
  document.getElementById("playerName").textContent = character.name;
  document.getElementById("playerLocation").textContent = character.location;
  document.getElementById("money").textContent = `₱${(character.money || 0).toLocaleString("en-PH")}`;

  // Stats bars
  document.getElementById("happinessBar").style.width = character.happiness + "%";
  document.getElementById("healthBar").style.width    = character.health + "%";
  document.getElementById("smartsBar").style.width    = character.smarts + "%";
  document.getElementById("looksBar").style.width     = character.looks + "%";

  // Stats labels
  document.getElementById("happinessLabel").textContent = character.happiness;
  document.getElementById("healthLabel").textContent    = character.health;
  document.getElementById("smartsLabel").textContent    = character.smarts;
  document.getElementById("looksLabel").textContent     = character.looks;
}

/********************
 *  NAV & POPUP LOGIC
 ********************/
document.getElementById("closePopupBtn").addEventListener("click", () => {
  document.getElementById("popupOverlay").classList.add("hidden");
});
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const modalType = btn.getAttribute("data-modal");
    let text = `Placeholder for ${modalType} logic.`;
    openPopup(text);
  });
});

function openPopup(msg) {
  document.getElementById("popupContent").textContent = msg;
  document.getElementById("popupOverlay").classList.remove("hidden");
}

/********************
 *  BUTTON LISTENERS
 ********************/
document.getElementById("ageBtn").addEventListener("click", ageUp);
document.getElementById("resetBtn").addEventListener("click", newGame);

/********************
 *  START IT ALL
 ********************/
initGame();
