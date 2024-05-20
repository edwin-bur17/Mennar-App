export default function estadoDireccionamiento(estado) {
    switch (estado) {
        case 0:
            return "Anulado"
        case 1:
            return "Activo"
        case 2:
            return "Programado"
        default:
            return "Desconocido"
    }
}