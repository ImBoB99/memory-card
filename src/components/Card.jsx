function Card({name, imageUrl}) {
  return (
    <div>
      <h2>{name}</h2>
      <img src={`/images/${imageUrl}`} alt={name} />
    </div>
  )
}

export default Card