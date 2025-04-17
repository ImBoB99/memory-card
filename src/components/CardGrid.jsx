import Card from "./Card";

function CardGrid({ cardsArray, handleClick }) {
  console.log(cardsArray);
  
  // Need to generate only a specific number of cards, and on each click regenerate a new set
  return (
    <>
      <h2>Card Grid</h2>
      {cardsArray.map((item) => (
        <Card onClick={() => handleClick(item.id)} key={item.id} name={item.name} imageUrl={item.image} />
      ))}
    </>
  );
}

export default CardGrid;
