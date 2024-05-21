import showAlert from "@/services/alertSweet"
import axios from "axios"

const DireccionamientosProgrammingAlert = ({ selected }) => {
    const programming = async () => {
        console.log("Direccionamientos para programación: ")
        console.log(selected)
        try {
            const res = await axios.put("/api/programar/direccionamientos", { direccionamientos: selected })
            if (res.status === 200) {
                console.log(res.data.message)
                showAlert(res.data.message, "success")
            } else {
                console.log(res.data)
            }
        } catch (error) {
            console.log("Error al enviar los direccionamientos desde el frontend: ", error)
            showAlert(error.response.data.error, "error")
        }

    }
    return (
        <div className="flex justify-between items-center bg-slate-100 text-gray-950 p-3 mt-8 rounded-md transition-all">
            <p>{selected.length} {selected.length === 1 ? "Direccionamiento seleccionado" : "Direccionamientos seleccionados"}</p>
            <button
                className="bg-green-500 hover:bg-green-600 text-white transition-colors rounded-md px-3 py-2"
                onClick={programming}
            >Programación</button>
        </div>
    )
}

export default DireccionamientosProgrammingAlert