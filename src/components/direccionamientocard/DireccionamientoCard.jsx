import { useState, useEffect } from "react";
import { useModule } from "@/context/moduleContext";
import { formatDate, technologyType, getNameProduct } from "@/utils";
import CheckboxInput from "../CheckboxInput";
import { CardField, Progress, MoreDetailsContent, ActionButton, ActionsButtonsGroup } from "./ui/ui";

const DireccionamientoCard = ({ direccionamiento, completeData, fetchCompleteData, selected, handleCheckboxChange }) => {
  const { currentModule } = useModule()
  const isDireccionamiento = currentModule === "direccionamientos";
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isExpanded && !completeData && !loading) {
      setLoading(true);
      fetchCompleteData().finally(() => setLoading(false));
    }
  }, [isExpanded, completeData, fetchCompleteData, loading]);

  const cardFields = [ // Campos a renderizar en la card
    { title: "ID", content: direccionamiento.ID },
    { title: "Número de prescripción", content: direccionamiento.NoPrescripcion, },
    { title: "Número de entrega", content: direccionamiento.NoEntrega },
    {
      title: "Identificación Paciente",
      content: `${direccionamiento.TipoIDPaciente} - ${direccionamiento.NoIDPaciente}`,
    },
    ...(direccionamiento.EstProgramacion === 1
      ? [
        { title: "Fecha máxima de entrega", content: formatDate(direccionamiento.FecMaxEnt), },
        { title: "Cantidad total a entregar", content: direccionamiento.CantTotAEntregar, },
      ]
      : []),
    { title: "Servicio o tecnología", content: technologyType(direccionamiento.TipoTec), },
    {
      title: "Servicio a entregar",
      content: `${direccionamiento.CodSerTecAEntregar} - ${getNameProduct(
        direccionamiento.CodSerTecAEntregar
      )}`,
    },
    {
      title: isDireccionamiento
        ? "Fecha del direccionamiento"
        : "Fecha de programación",
      content: isDireccionamiento
        ? formatDate(direccionamiento.FecDireccionamiento)
        : formatDate(direccionamiento.FecProgramacion),
    },
  ];

  return (
    <div className={"bg-card-default p-5 rounded-lg"}>
      <Progress direccionamiento={direccionamiento} />
      <div className="grid grid-cols-6 gap-1">
        {cardFields.map((field, index) => (
          <CardField key={index} {...field} />
        ))}
        {direccionamiento.EstProgramacion === 1 || (isDireccionamiento && direccionamiento.EstDireccionamiento === 2) ? "" : (
          <ActionButton
            onClick={() => { setIsExpanded(!isExpanded); }}
            text={isExpanded ? "Ocultar detalles" : "Mostrar detalles"}
            style="text-sky-default hover:underline text-sky-default"
          />
        )}
      </div>
      {isExpanded && (
        <MoreDetailsContent direccionamiento={direccionamiento} loading={loading} completeData={completeData} />
      )}
      {direccionamiento.EstDireccionamiento === 1 && (
        <CheckboxInput
          checked={selected}
          onCheckboxChange={handleCheckboxChange}
          direccionamiento={direccionamiento}
        />
      )}
      <ActionsButtonsGroup direccionamiento={direccionamiento} completeData={completeData} isDireccionamiento={isDireccionamiento} />
    </div>
  );
}

export default DireccionamientoCard;