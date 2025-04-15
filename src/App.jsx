import "./App.css";
import Scoreboard from "./components/Scoreboard";
import CardGrid from "./components/CardGrid";
import GameTitle from "./components/GameTitle";
import { useEffect, useState } from "react";

function App() {
  const [brainrotData, setBrainrotData] = useState([]);

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

    fetchBrainrotData();
  }, []);

  return (
    <>
      <GameTitle></GameTitle>
      <Scoreboard></Scoreboard>
      <CardGrid brainrotData={brainrotData}></CardGrid>
    </>
  );
}

export default App;
