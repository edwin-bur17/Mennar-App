import { formatDate, getNameEps, getNameProduct } from "@/utils"
import { TbNumber, TbCalendarTime, TbClock, TbBuildingHospital, TbReportMedical } from "react-icons/tb"
import { HiOutlineIdentification } from "react-icons/hi2"

const DireccionamientoItem = ({ direccionamiento, status, style, remainingDays }) => {

  const fields = [  // Campos a iterar
    { icon: TbNumber, label: "Prescripción", value: direccionamiento.NoPrescripcion },
    { icon: HiOutlineIdentification, label: "Paciente", value: `${direccionamiento.TipoIDPaciente} - ${direccionamiento.NoIDPaciente}` },
    { icon: TbCalendarTime, label: "Fecha máxima", value: formatDate(direccionamiento.FecMaxEnt) },
    { icon: TbBuildingHospital, label: "Eps", value: getNameEps(direccionamiento.CodEPS) },
    { icon: TbReportMedical, label: "Servicio", value: `${direccionamiento.CodSerTecAEntregar} - ${getNameProduct(direccionamiento.CodSerTecAEntregar)}` },
  ]

  // clases - styles
  const classFlex = "flex items-center"
  const classIcon = "w-5 h-5 mr-2"

  return (
    <li className="bg-slate w-full text-primary p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{direccionamiento.ID}</h2>
        <span className={`${style} text-white py-1 px-3 rounded-full`}>{status}</span>
      </div>
      <div className="space-y-2 my-2">
        {fields.map((field, index) => (
          <div key={index} className={classFlex}>
            <field.icon className={classIcon} />
            <span>{field.label}: {field.value}</span>
          </div>
        ))}
      </div>
      <div className={classFlex}>
        <TbClock className={classIcon} />
        <span>{remainingDays}</span>
      </div>
    </li>
  )
}

export default DireccionamientoItem