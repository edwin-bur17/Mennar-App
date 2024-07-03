const CardField = ({ title, content }) => {
  return (
    <div className="mb-1">
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-base">{content}</p>
    </div>
  )
}

export default CardField