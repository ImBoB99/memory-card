import Card from "./Card";

function CardGrid({ cardsArray, handleClick }) {
  
  // Need to generate only a specific number of cards, and on each click regenerate a new set
  return (
    <div className="card-grid">
      {cardsArray.map((item) => (
        <Card onClick={() => handleClick(item.id)} key={item.id} name={item.name} imageUrl={item.image} />
      ))}
    </div>
  );
}

export default CardGrid;
