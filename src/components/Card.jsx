function Card({name, imageUrl, onClick}) {
  return (
    <div onClick={onClick}>
      <h2>{name}</h2>
      <img src={`/images/${imageUrl}`} alt={name} />
    </div>
  )
}

export default Card