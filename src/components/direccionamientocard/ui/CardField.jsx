const CardField = ({ title, content }) => {
  return (
    <div className="mb-1">
        <p className="font-medium text-lg">{title}</p>
        <p className="text-base">{content}</p>
    </div>
  )
}

export default CardField