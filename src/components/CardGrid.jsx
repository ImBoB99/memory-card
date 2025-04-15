import Card from "./Card";

function CardGrid({ brainrotData, handleClick }) {
  console.log(brainrotData);
  

  return (
    <>
      <h2>Card Grid</h2>
      {brainrotData.map((item) => (
        <Card onClick={() => handleClick(item.id)} key={item.id} name={item.name} imageUrl={item.image} />
      ))}
    </>
  );
}

export default CardGrid;
