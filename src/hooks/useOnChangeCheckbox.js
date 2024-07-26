import { useState } from 'react'

export const useOnChangeCheckbox = () => {
    const [selected, setSelected] = useState([]) // Array para almacenar los direccionamientos (objetos) seleccionados 

    // MANEJO DE CAMBIO EN LOS CHECKBOXS PARA SELECCIONAR LOS DIRECCIONAMIENTOS

    // Actualizar el estado selected, dependiendo del cambio en los checbox de cada direccionamiento
    const handleCheckboxChange = (direccionamiento) => {
        // Crear el direccionamiento que será enviado en la petición
        const programmingDireccionamiento = {
            ID: direccionamiento.ID,
            FecMaxEnt: direccionamiento.FecMaxEnt,
            TipoIDSedeProv: direccionamiento.TipoIDProv,
            NoIDSedeProv: direccionamiento.NoIDProv,
            CodSedeProv: "PROV000762",
            CodSerTecAEntregar: direccionamiento.CodSerTecAEntregar,
            CantTotAEntregar: direccionamiento.CantTotAEntregar
        }

        // Verificar si el direccionamiento está anulado o previamente programado
        const isNull = direccionamiento.EstDireccionamiento === 0
        const isProgramming = direccionamiento.EstDireccionamiento === 2

        if (!isNull && !isProgramming) {
            // Si el direccionamiento ya se encuentra en el array selected, lo quita. (deseleccionar el checkbox)
            if (selected.some(item => item.ID === programmingDireccionamiento.ID)) {
                setSelected(selected.filter(item => item.ID !== programmingDireccionamiento.ID))
            } else {
                // Si no está en el array selected, lo agrega. (seleccionar el checkbox)
                setSelected([...selected, programmingDireccionamiento])
            }
        }
    }

    // Seleccionar o deseleccionar todos los direccionamientos que no estén anulados
    const handleSelectAllAssets = (direccionamientos) => {
        // Filtrar el array direccionamientos y crear otro solo con los que esten activos (sin los anulados y los ya programados)
        const direccionamientosAssets = direccionamientos.filter((direccionamiento) => direccionamiento.EstDireccionamiento !== 0 && direccionamiento.EstDireccionamiento !== 2)
        // Crear el objeto direccionamiento (con base en el array de los activos) el cual será enviado en la petición
        const programmingDireccionamientos = direccionamientosAssets.map(direccionamiento => ({
            ID: direccionamiento.ID,
            FecMaxEnt: direccionamiento.FecMaxEnt,
            TipoIDSedeProv: direccionamiento.TipoIDProv,
            NoIDSedeProv: direccionamiento.NoIDProv,
            CodSedeProv: "PROV000762",
            CodSerTecAEntregar: direccionamiento.CodSerTecAEntregar,
            CantTotAEntregar: direccionamiento.CantTotAEntregar
        }))
        if (selected.length === programmingDireccionamientos.length) { // Si todos están seleccionados, los deselecciona.
            setSelected([])
        } else { // si no los selecciona.
            setSelected(programmingDireccionamientos)
        }
    }

    return {
        selected,
        setSelected,
        handleCheckboxChange,
        handleSelectAllAssets
    }
}
