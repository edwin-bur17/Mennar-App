const PaginationButton = ({ onClick, disabled, children }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="px-4 py-2 ml-2 bg-sky-default text-white rounded disabled:bg-gray-300"
        >
            {children}
        </button>
    );
};

export default PaginationButton