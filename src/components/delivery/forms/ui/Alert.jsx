const Alert = ({ message }) => {
    return (
        <div className="w-full p-3 mb-2 bg-danger-600 items-center text-white leading-none rounded-full flex lg:inline-flex" role="alert">
            <span className="flex rounded-full bg-danger-400 uppercase px-2 py-1 text-xs font-bold mr-3">Alerta</span>
            <span className="font-semibold mr-2 text-left flex-auto">{message}</span>
        </div>
    )
}

export default Alert

