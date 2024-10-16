const Input = ({ type, value, onChange, placeholder }) => {
    const inputClass = "w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"

    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClass}
            required
        />
    )
}

export default Input