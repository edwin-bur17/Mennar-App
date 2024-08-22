const Badge = ({ title, isCompleted }) => {
    return (
        <span className={`flex items-center ${isCompleted ? 'text-success-700' : 'text-orange'}`}>
            <span className={`w-4 h-4 mt-1 rounded-full mr-2 ${isCompleted ? 'bg-success-700' : 'bg-orange'}`}></span>
            <span className="text-sm font-medium mt-1">{title}</span>
        </span>
    )
}

export default Badge