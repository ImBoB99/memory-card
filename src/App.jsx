import "./App.css";
import Scoreboard from "./components/Scoreboard";
import CardGrid from "./components/CardGrid";
import GameTitle from "./components/GameTitle";
import { useEffect, useState } from "react";
import { shuffleArray, eightCards } from "./helpers";

function App() {
  const [brainrotData, setBrainrotData] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [cardsArray, setCardsArray] = useState([]);

  useEffect(() => {
    const fetchBrainrotData = async () => {
      try {
        const response = await fetch("/json/brainrotData.json");
        const fetchedData = await response.json();

        // Step 1: Shuffle the fetched data
        const shuffledData = shuffleArray(fetchedData);

        // Step 2: Add unique ids to the data
        const dataWithIds = shuffledData.map((item) => ({
          ...item,
          id: crypto.randomUUID(),
        }));

        // Step 3: Set the brainrotData state
        setBrainrotData(dataWithIds);

        // Step 4: Select the first 8 items and set them into cardsArray
        const firstEightCards = eightCards(dataWithIds);
        setCardsArray(firstEightCards);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchBrainrotData();
  }, []);

  useEffect(() => {
    const filteredBrainrotData = brainrotData.filter((item) => !clickedIds.includes(item.id));
    const clickedBrainrotData = brainrotData.filter((item) => clickedIds.includes(item.id));
  
    shuffleArray(filteredBrainrotData);
    shuffleArray(clickedBrainrotData);
  
    const maxClickedCards = 4;
    const totalCards = 8;
  
    // Pick up to 4 clicked cards
    const clickedCardsToShow = clickedBrainrotData.slice(0, maxClickedCards);
  
    // Fill the rest with regular (non-clicked) cards
    const remainingSlots = totalCards - clickedCardsToShow.length;
    const regularCardsToShow = filteredBrainrotData.slice(0, remainingSlots);
  
    const newCardsArray = shuffleArray([...regularCardsToShow, ...clickedCardsToShow]);
    setCardsArray(newCardsArray);    
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedIds]);
  

  const handleClick = (id) => {
    if (clickedIds.includes(id)) {
      alert("You already clicked this card! Game over.");
      setClickedIds([]); // or reset the game however you like
    } else {
      setClickedIds([...clickedIds, id]); // add id to the list
    }
  };

  return (
    <div className="app">
      <GameTitle></GameTitle>
      <Scoreboard clickedIds={clickedIds}></Scoreboard>
      <CardGrid cardsArray={cardsArray} handleClick={handleClick}></CardGrid>
    </div>
  );
}

export default App;
