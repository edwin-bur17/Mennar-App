const Spinner = ({ text }) => {
    return (
        <div className="flex items-center justify-center">
            <span className="animate-spin rounded-full h-5 w-5 border-4 border-white border-t-gray-300 mr-2"></span>
            { text }
        </div>
    )
}

export default Spinner