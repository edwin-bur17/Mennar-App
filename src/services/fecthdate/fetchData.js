import { getEndPoint } from "@/utils/index.js"
import axios from "axios";

export async function fetchData(formattedDate, queryToken, documentType, documentNumber, apiModule, signal) {
    let url;
    if (documentType && documentNumber) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/${getEndPoint(apiModule, "porPacienteFecha")}/${process.env.NEXT_PUBLIC_NIT}/${formattedDate}/${queryToken}/${documentType}/${documentNumber}`;
    } else {
        url = `${process.env.NEXT_PUBLIC_API_URL}/${getEndPoint(apiModule, "porFecha")}/${process.env.NEXT_PUBLIC_NIT}/${queryToken}/${formattedDate}`;
    }

    try {
        const res = await axios.get(url, { signal });
        return res.status === 200 && res.data.length > 0 ? res.data : null
    } catch (error) {
        console.log(error)
        if (error.response.status === 400 && error.response.data.Message) {
            console.log(error.response.data.Message)
            return error.response.data.Message
        }else {
            console.error("Error al procesar la petición para la fecha: ", formattedDate)
        }
        return null;
    }
}