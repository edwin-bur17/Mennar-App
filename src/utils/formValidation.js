export const validateFields = (formData, currentData = null) => {
    let errors = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => { // Verificar si el campo está vacío
        if (value === "" || value === null || value === undefined) {
            errors[key] = "Este campo es obligatorio";
            isValid = false;
        }
    })

    if (currentData) {
        if (Number(formData.CantTotEntregada) > Number(currentData.CantTotAEntregar)) {
            errors.CantTotEntregada = `La cantidad entregada no puede ser mayor a ${currentData.CantTotAEntregar}`
            isValid = false
        }
        if (formData.NoIDRecibe.length > 15) {
            errors.NoIDRecibe = "El número de identificación no puede tener más de 15 dígitos desde"
            isValid = false
        }
    }
    return { isValid, errors };
};