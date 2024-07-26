export function technologyType(type) {
    switch (type) {
        case "D":
            return "Dispositivo médico"  
        case "M":
            return "Medicamento"
        case "N":
            return "Producto Nutricional"    
        case "P":
            return "Procedimiento" 
        case "S":
            return "Servicio complementario" 
        default:
            return "Desconocido" 
    }
}