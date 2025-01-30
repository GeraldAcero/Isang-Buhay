import { gameData } from "./dataLoader.js";

function createNewCharacter() {
  const gender = Math.random() < 0.5 ? "Male" : "Female";
  const firstNameArr = gameData.names[gender.toLowerCase()];
  const firstName = firstNameArr[Math.floor(Math.random() * firstNameArr.length)];
  const lastNameArr = gameData.names.lastNames;
  const lastName = lastNameArr[Math.floor(Math.random() * lastNameArr.length)];
  const fullName = `${firstName} ${lastName}`;

  const locArr = gameData.locations.cities;
  const location = locArr[Math.floor(Math.random() * locArr.length)];

  return {
    name: fullName,
    gender: gender,
    location: location,
    age: 0,
    happiness: Math.floor(Math.random() * 101),
    health: Math.floor(Math.random() * 101),
    smarts: Math.floor(Math.random() * 101),
    looks: Math.floor(Math.random() * 101),
    /**
     * STARTING MONEY = 0 (instead of random).
     */
    money: 0,
    isAlive: true,
  };
}

export { createNewCharacter };
