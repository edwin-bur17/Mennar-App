import { TbReportSearch } from "react-icons/tb";
function SearchForm({ title, fields, onSubmit, onChange }) {
    // Manejar el cambio en los inputs
    const handleChange = (e) => {
        const { id, value } = e.target
        onChange(id, value)
    }
    return (
        <div>
            <h3 className="text-white font-semi-bold">{title}</h3>
            <form onSubmit={onSubmit} className="flex flex-row bg-slate p-3 mt-1 rounded-lg text-black-default">
                {fields.map((field, index) => (
                    <div key={index} className="pr-2">
                        <label htmlFor={field.id} className="block font-medium">{field.label}</label>
                        {field.type === "select" ? (
                            <select
                                className="w-full p-1.5 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
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
                                className="w-full p-1.5 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                type={field.type}
                                id={field.id}
                                placeholder={field.placeholder}
                                value={field.value}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                ))}
                <button type="submit" className="bg-sky-default hover:bg-sky-500 text-white px-1.5 h-9 mt-6 rounded-lg cursor-pointer transition-colors flex items-center justify-center">
                    <TbReportSearch size={25}/>
                </button>
            </form>
        </div>
    )
}

export default SearchForm