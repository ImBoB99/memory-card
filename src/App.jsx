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
    // Generate a new set of cards when clickedIds changes, the new array consists of 6 regular cards and 2 already clicked
    const filteredBrainrotData = brainrotData.filter(
      (item) => !clickedIds.includes(item.id)
    );
    
    const clickedBrainrotData = brainrotData.filter(
      (item) => clickedIds.includes(item.id)
    );

    shuffleArray(filteredBrainrotData)
    shuffleArray(clickedBrainrotData)

    const newCardsArray = filteredBrainrotData.slice(0,6).concat(clickedBrainrotData.slice(0,2))

    setCardsArray(newCardsArray)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedIds]);

  const handleClick = (id) => {
    console.log("Clicked ID:", id);
    if (clickedIds.includes(id)) {
      alert("You already clicked this card! Game over.");
      setClickedIds([]); // or reset the game however you like
    } else {
      setClickedIds([...clickedIds, id]); // add id to the list
    }
  };

  return (
    <>
      <GameTitle></GameTitle>
      <Scoreboard clickedIds={clickedIds}></Scoreboard>
      <CardGrid cardsArray={cardsArray} handleClick={handleClick}></CardGrid>
    </>
  );
}

export default App;
