import { TbInfoCircle } from "react-icons/tb"

const CycleCompletedAlert = () => {
    return (
        <div className="inline-block">
            <span className="flex justify-between bg-success-700 rounded-lg text-white p-2">
                <TbInfoCircle className="me-2" size={26} />
                Ciclo del direccionamiento completado :)
            </span>
        </div>

    )
}

export default CycleCompletedAlert