import productsCodes from "@/data/productsCodes.json"
import epsCodes from "@/data/epsCodes.json"

function getNameProduct(code) {
    return productsCodes[code] || "Nombre del servicio no encontrado"
}
function getNameEps(code) {
    return epsCodes[code] || "Eps no encontrada"
}

export { getNameProduct, getNameEps }