function Card({name, imageUrl, onClick}) {
  return (
    <div className="card" onClick={onClick}>
      <img src={`/images/${imageUrl}`} alt={name} />
      <h2>{name}</h2>
    </div>
  )
}

export default Card