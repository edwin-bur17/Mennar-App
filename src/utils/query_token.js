import axios from "axios";

const NIT = "817005385";
const TOKEN = "F6BF055E-4200-43E4-89AA-198B0A66010D";
const API_URL = "https://wsmipres.sispro.gov.co/WSSUMMIPRESNOPBS/api";

async function getQueryToken() {
    try {
        const res = await axios(`${API_URL}/GenerarToken/${NIT}/${TOKEN}`)
        if (res.status !== 200) {
            throw new Error(`Fallo en la respuesta HTTP con estado ${res.status}`)
        } 
        const queryToken = res.data;
        return queryToken
    } catch (error) {
        console.log( "Error al intentar obtener el token de consulta", error)
        return null
    }
}

export default getQueryToken

