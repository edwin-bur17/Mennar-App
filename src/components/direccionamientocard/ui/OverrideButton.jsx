import axios from "axios"
import { useState } from "react"
import showAlert from "@/services/alertSweet"
import Swal from "sweetalert2"
import { useSearchForm } from "@/context/searchFormContext"

const OverrideButton = ({ type, id, text }) => {
    const { updateData } = useSearchForm()
    const [loading, setLoading] = useState(false)

    // Anular un direccionamiento
    const override = async () => {
        // Mostrar alerta de confirmación
        const result = await Swal.fire({
            title: `Anular ${text}`,
            text: `¿Estás seguro de hacer esta anulación? ${id}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, anular",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            setLoading(true);
            try {
                const res = await axios.put("/api/direccionamiento/anular", { type, id });
                console.log(res)
                await new Promise(resolve => setTimeout(resolve, 1500))
                await updateData()
                showAlert(res.data.Mensaje, "success");
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    showAlert(error.response.data.details || error.response.data.message, "error")
                } else {
                    console.log("Error en la solicitud (reporte entrega de un direccionamiento):", error.response?.data || error.message);
                }
                console.log("Error al intentar anular un direccionamiento", error)
            } finally {
                setLoading(false);
            }
        }
    }
    return (
        <button
            onClick={override}
            disabled={loading}
            className="bg-danger-600 hover:bg-danger-400 text-white font-bold py-2 px-4 rounded"
        >
            {loading ? "Anulando ..." : "Anular"}
        </button>
    )
}

export default OverrideButton