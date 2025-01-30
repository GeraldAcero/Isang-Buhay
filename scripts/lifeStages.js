function handleLifeStages(character) {
  if (character.age === 6) {
    return "You started primary school.";
  } 
  else if (character.age === 13) {
    return "Teenage years begin. New freedoms unlocked!";
  } 
  else if (character.age === 18) {
    return "Adulthood! Consider college, jobs, or other paths.";
  } 
  else if (character.age === 30) {
    return "Midlife approaches. Watch your health and finances.";
  } 
  else if (character.age === 60) {
    return "Old age. Consider retirement or leaving a legacy.";
  }
  return null;
}

export { handleLifeStages };
