import PaginationButton from "./ui/PaginationButton"
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const buttons = [
        { text: "Primera", page: 1, disabled: currentPage === 1 },
        { text: "Anterior", page: currentPage - 1, disabled: currentPage === 1 },
        { text: "Siguiente", page: currentPage + 1, disabled: currentPage === totalPages },
        { text: "Última", page: totalPages, disabled: currentPage === totalPages }
    ];

    return (
        <div className="flex justify-center mt-4">
            {buttons.map((button, index) => (
                <PaginationButton
                    key={index}
                    onClick={() => onPageChange(button.page)}
                    disabled={button.disabled}
                >
                    {button.text}
                </PaginationButton>
            ))}
            <span className="px-4 py-2 text-white">
                Página {currentPage} de {totalPages}
            </span>
        </div>
    );
};

export default Pagination;