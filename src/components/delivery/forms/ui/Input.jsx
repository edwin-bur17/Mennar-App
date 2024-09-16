const Input = ({
    label,
    id,
    type,
    value,
    onChange,
    readOnly,
    options,
    colSpan,
    placeholder,
    error
}) => {
    const baseInputClass = "w-full py-2 px-3 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200"
    const normalInputClass = "border-gray-300 focus:ring-sky-500 focus:border-transparent"
    const errorInputClass = "border-danger-default focus:ring-danger-default focus:border-transparent"
    let inputClass = `${baseInputClass} ${error ? errorInputClass : normalInputClass}`

    return (
        <div className={`${colSpan}`}>
            <label htmlFor={id} className="block mb-1 text-base font-medium text-black-default">
                {label}
            </label>
            {type === "select" ? (
                <select
                    id={id}
                    className={inputClass}
                    value={value}
                    onChange={onChange}
                >
                    <option value="">Selecciona una opción</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    id={id}
                    className={inputClass}
                    value={value}
                    onChange={onChange}
                    readOnly={readOnly}
                    placeholder={placeholder}
                />
            )}
            {error && <p className="mt-1 text-sm font-medium text-danger-600">{error}</p>}
        </div>
    )
}
export default Input