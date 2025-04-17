export function shuffleArray(array) {
  const shuffled = [...array]; // Create a shallow copy to avoid mutating the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
}

export function eightCards(array) {
  return array.slice(0, 8);
}