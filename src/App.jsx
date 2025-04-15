import "./App.css";
import Scoreboard from "./components/Scoreboard";
import CardGrid from "./components/CardGrid";
import GameTitle from "./components/GameTitle";
import { useEffect, useState } from "react";

function App() {
  const [brainrotData, setBrainrotData] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);


  useEffect(() => {
    const fetchBrainrotData = async () => {
      const response = await fetch("/json/brainrotData.json");
      const fetchedData = await response.json();

      const dataWithIds = fetchedData.map((item) => ({
        ...item,
        id: crypto.randomUUID(),
      }));

      setBrainrotData(dataWithIds);
    };

    // Need to add error handling

    fetchBrainrotData();
  }, []);

  const handleClick = (id) => {
    console.log("Clicked ID:", id)
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
      <CardGrid brainrotData={brainrotData} handleClick={handleClick}></CardGrid>
    </>
  );
}

export default App;
