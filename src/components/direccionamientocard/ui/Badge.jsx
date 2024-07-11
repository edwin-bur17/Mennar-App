const Badge = ({ title, isCompleted }) => {
    return (
        <span className={`flex items-center ${isCompleted ? 'text-green-700' : 'text-orange-600'}`}>
            <span className={`w-4 h-4 mt-1 rounded-full mr-2 ${isCompleted ? 'bg-green-700' : 'bg-orange-600'}`}></span>
            <span className="text-sm font-medium mt-1">{title}</span>
        </span>
    )
}

export default Badge