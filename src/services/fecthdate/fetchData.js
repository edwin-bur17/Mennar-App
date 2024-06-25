import { getEndpoint } from "@/utils/getEndPoint";
import axios from "axios";

export async function fetchData(formattedDate, queryToken, documentType, documentNumber, currentModule, signal) {
    let url;
    if (documentType && documentNumber) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/${getEndpoint(currentModule, "porPacienteFecha")}/${process.env.NEXT_PUBLIC_NIT}/${formattedDate}/${queryToken}/${documentType}/${documentNumber}`;
    } else {
        url = `${process.env.NEXT_PUBLIC_API_URL}/${getEndpoint(currentModule, "porFecha")}/${process.env.NEXT_PUBLIC_NIT}/${queryToken}/${formattedDate}`;
    }

    try {
        const res = await axios.get(url, { signal });
        return res.status === 200 && res.data.length > 0 ? res.data : null
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log("Petición cancelada", formattedDate);
        } else {
            console.error("Error al procesar la petición para la fecha:", formattedDate, error);
        }
        return null;
    }
}