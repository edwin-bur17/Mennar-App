function SearchForm({ title, fields, onSubmit }) {
    return (
        <div>
            <h3 className="text-white">{title}</h3>
            <form onSubmit={onSubmit} className="bg-slate-300 p-3 mt-5 rounded-xl text-gray-950">
                {fields.map((field, index) => (
                    <div key={index}>
                        <label htmlFor={field.id}>{field.label}</label>
                        <input
                            type={field.type}
                            id={field.id}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    </div>
                ))}
                <button type='submit'>Consultar</button>
            </form>
        </div>
    )
}

export default SearchForm