function SearchForm({ title, fields, onSubmit, rangeStart, rangeEnd }) {
    return (
        <div>
            <h3 className="text-white">{title}</h3>
            <form onSubmit={onSubmit} className="bg-slate-300 p-3 mt-5 rounded-xl text-gray-950">
                {rangeStart && rangeEnd && <p className="bg-green-400 text-base p-2 mb-2 rounded-lg">Rango de búsqueda: desde {rangeStart} - hasta {rangeEnd}</p>}
                {fields.map((field, index) => (
                    <div key={index} className="flex justify-between">
                        <label htmlFor={field.id} className="font-medium me-3">{field.label}</label>
                        {field.type === "select" ? (
                            <select
                                className="bg-slate-100 px-4 py-2 mb-2 rounded-lg"
                                id={field.id}
                                value={field.value}
                                onChange={field.onChange}
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
                                onChange={field.onChange}
                            />
                        )}
                    </div>
                ))}
                <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 mt-3 rounded-lg cursor-pointer transition-colors">Consultar</button>
            </form>
        </div>
    )
}

export default SearchForm