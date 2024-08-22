const ActionButton = ({ onClick, text, style }) => {
  return (
    <button onClick={onClick} className={`${style} rounded-md mt-2 py-2 px-3`}>
        {text}
    </button>
  )
}

export default ActionButton