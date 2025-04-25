import React, { useState } from "react";

// Simple mini-game: Guess the Character by Power
const characters = [
  { name: "Iron Man", powers: ["Powered Armor", "Genius-level intellect"] },
  { name: "Thor", powers: ["God of Thunder", "Weather manipulation"] },
  { name: "Thanos", powers: ["Expert marksmanship", "Advanced technology"] },
  { name: "Spider-Man", powers: ["Wall-crawling", "Spider-sense"] },
  { name: "Hulk", powers: ["Superhuman strength", "Regeneration"] },
  { name: "Black Widow", powers: ["Martial arts", "Espionage"] },
  { name: "Doctor Strange", powers: ["Magic", "Time manipulation"] }
];

function getRandomCharacter() {
  return characters[Math.floor(Math.random() * characters.length)];
}

const MiniGame = () => {
  const [current, setCurrent] = useState(getRandomCharacter());
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  const handleGuess = () => {
    if (guess.trim().toLowerCase() === current.name.toLowerCase()) {
      setResult("Correct!");
      setScore(score + 1);
    } else {
      setResult(`Wrong! The answer was ${current.name}`);
    }
    setTimeout(() => {
      setCurrent(getRandomCharacter());
      setGuess("");
      setResult(null);
      setRound(round + 1);
    }, 1500);
  };

  return (
    <div className="bg-yellow-100 p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Mini-Game: Guess the Character by Power</h2>
      <p className="mb-2">Round: {round} | Score: {score}</p>
      <p className="mb-4">Powers: <span className="font-semibold">{current.powers.join(", ")}</span></p>
      <input
        type="text"
        placeholder="Enter character name..."
        className="p-2 border border-gray-300 rounded mr-2"
        value={guess}
        onChange={e => setGuess(e.target.value)}
        disabled={!!result}
      />
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        onClick={handleGuess}
        disabled={!!result || !guess.trim()}
      >
        Guess
      </button>
      {result && <div className="mt-4 text-lg font-bold">{result}</div>}
    </div>
  );
};

export default MiniGame;