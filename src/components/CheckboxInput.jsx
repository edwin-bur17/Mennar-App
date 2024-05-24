const CheckboxInput = ({ checked, onCheckboxChange, selectAll = false, data, direccionamiento }) => {
    // onChange para seleccionar todos los direccionamientos activos <handleSelectAllAssets>
    const onChangeSelectAllAssets = () => { onCheckboxChange(data) } 

    // onChange para seleccionar uno a uno los acttivos <handleCheckboxChange>
    const onChangeSingle = () => { onCheckboxChange(direccionamiento) } 

    const handleOnChange = selectAll ? onChangeSelectAllAssets : onChangeSingle

    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={handleOnChange}
        />
    )
}

export default CheckboxInput