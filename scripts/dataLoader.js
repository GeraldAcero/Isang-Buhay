const gameData = {};

async function loadJSON(file) {
  const response = await fetch(`data/${file}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${file}: ${response.status}`);
  }
  return await response.json();
}

async function loadAllData() {
  // Add or remove based on what JSON files you actually have
  gameData.names = await loadJSON("names.json");
  gameData.locations = await loadJSON("locations.json");
  gameData.events = await loadJSON("events.json");
  // Example for future expansions:
  // gameData.careers = await loadJSON("careers.json");
  // gameData.relationships = await loadJSON("relationships.json");
}

export { gameData, loadAllData };
