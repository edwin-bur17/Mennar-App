const Input = ({
    label,
    id,
    type,
    value,
    onChange,
    readOnly,
    options,
    maxLength,
    colSpan,
    className,
    placeholder }) => (
    <div className={`mb-4 ${colSpan}`}>
        <label htmlFor={id} className="block mb-1 text-base font-medium text-black-default">
            {label}
        </label>
        {type === "select" ? (
            <select
                id={id}
                className={className}
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
                className={className}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                maxLength={maxLength}
                placeholder={placeholder}
            />
        )}
    </div>
)

export default Input