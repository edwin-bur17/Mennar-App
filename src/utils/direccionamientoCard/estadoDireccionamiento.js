import { useModule } from "@/context/moduleContext"
export function estadoDireccionamiento(estado) {
    const {currentModule} = useModule()

    switch (estado) {
        case 0:
            return "Anulado"
        case 1:
            return "Activo"
        case 2:
            if (currentModule === "direccionamientos") {
                return "Programado"
            }else{
                return "Procesado"
            }  
        default:
            return "Desconocido"
    }
}