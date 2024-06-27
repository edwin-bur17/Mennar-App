function SearchForm({ title, fields, onSubmit, onChange, rangeStart, rangeEnd }) {
    // Manejar el cambio en los inputs
    const handleChange = (e) => {
        const { id, value } = e.target
        onChange(id, value)
    }
    return (
        <div>
            <h3 className="text-white text-center font-bold">{title}</h3>
            <form onSubmit={onSubmit} className="bg-slate-300 p-3 mt-2 rounded-xl text-gray-950">
                {rangeStart && rangeEnd && <p className="bg-green-400 text-base p-2 mb-2 rounded-lg">Rango de búsqueda: desde {rangeStart} - hasta {rangeEnd}</p>}
                {fields.map((field, index) => (
                    <div key={index} className="flex justify-between">
                        <label htmlFor={field.id} className="font-medium me-3">{field.label}</label>
                        {field.type === "select" ? (
                            <select
                                className="bg-slate-100 px-4 py-2 mb-2 rounded-lg w-64"
                                id={field.id}
                                value={field.value}
                                onChange={handleChange}
                            >
                                <option value="">Selecione una opción</option>
                                {field.options.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                className="bg-slate-100 px-4 py-2 mb-2 rounded-lg"
                                type={field.type}
                                id={field.id}
                                value={field.value}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                ))}
                <button type="submit" className="bg-sky-600 hover:bg-sky-500 text-white px-3 py-2 mt-3 rounded-lg cursor-pointer transition-colors flex items-center justify-center">
                    <span>Consultar</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </form>
        </div>
    )
}

export default SearchForm