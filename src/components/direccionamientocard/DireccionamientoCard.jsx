import { useState, useEffect } from "react";
import { useModule } from "@/context/moduleContext";
import { useSearchForm } from "@/context/searchFormContext";
import { useModal } from "@/context/modalContext";
import {
  estadoDireccionamiento,
  formatDate,
  technologyType,
  getNameProduct,
  getNameEps,
} from "@/utils";
import CheckboxInput from "../CheckboxInput";
import {
  CardField,
  Progress,
  MoreDetailsContent,
  ActionsButtons,
  ActionButton,
} from "./ui/ui";

function DireccionamientoCard({
  direccionamiento,
  completeData,
  fetchCompleteData,
  selected,
  handleCheckboxChange,
}) {
  const { invoiceStatus, deliveryReportStatus } = useSearchForm();
  const { openModal } = useModal();
  const { currentModule } = useModule();
  const isDireccionamiento = currentModule === "direccionamientos";
  const bg = direccionamiento.EstDireccionamiento === 0 || direccionamiento.EstProgramacion === 0 ? "bg-card-null" : "bg-card-default";

  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isExpanded && !completeData && !loading) {
      setLoading(true);
      fetchCompleteData().finally(() => setLoading(false));
    }
  }, [isExpanded, completeData, fetchCompleteData, loading]);

  const cardFields = [
    { title: "ID", content: direccionamiento.ID },
    {
      title: isDireccionamiento ? "ID direccionamiento" : "ID Programación:",
      content: isDireccionamiento
        ? direccionamiento.IDDireccionamiento
        : direccionamiento.IDProgramacion,
    },
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
    {
      title: "Estado actual",
      content: isDireccionamiento
        ? estadoDireccionamiento(direccionamiento.EstDireccionamiento)
        : estadoDireccionamiento(direccionamiento.EstProgramacion),
    },
  ];

  return (
    <div className={` ${bg} p-5 rounded-lg text-black-default`}>
      <Progress
        direccionamiento={direccionamiento}
        invoiceStatus={invoiceStatus}
        deliveryReportStatus={deliveryReportStatus}
      />
      <div className="grid grid-cols-6 gap-1">
        {cardFields.map((field, index) => (
          <CardField key={index} {...field} />
        ))}
        <ActionButton
          onClick={() => { setIsExpanded(!isExpanded); }}
          text={isExpanded ? "Ocultar detalles" : "Mostrar detalles"}
          style="text-sky-default hover:underline text-sky-default"
        />
      </div>
      {isExpanded && (
        <MoreDetailsContent loading={loading} completeData={completeData} />
      )}
      {direccionamiento.EstDireccionamiento === 1 && (
        <CheckboxInput
          checked={selected}
          onCheckboxChange={handleCheckboxChange}
          direccionamiento={direccionamiento}
        />
      )}
      {direccionamiento.EstProgramacion === 1 && !invoiceStatus[direccionamiento.ID] && (
          <ActionButton
            onClick={() => openModal(direccionamiento, "delivery")}
            text="Entrega"
            style="bg-sky-default hover:bg-sky-500 text-white"
          />
        )}
      {completeData && completeData.EstEntrega === 1 && !invoiceStatus[direccionamiento.ID] && (
          <ActionButton
            onClick={() => openModal(completeData, "invoice")}
            text="Facturación"
            style="bg-success-default hover:bg-success-hover text-white"
          />
        )}
      {completeData &&
        invoiceStatus[direccionamiento.ID] && !deliveryReportStatus[direccionamiento.ID] && (
          <ActionButton
            onClick={() => openModal( { ...completeData, ...invoiceStatus[direccionamiento.ID] }, "report" )}
            text="Reporte Entrega"
            style="bg-warning-default hover:bg-warning-hover text-white"
          />
        )}
      {deliveryReportStatus[direccionamiento.ID] && (
        <span className="bg-success-700 rounded-lg text-white p-2">
          Ciclo del direccionamiento completado
        </span>
      )}
    </div>
  );
}

export default DireccionamientoCard;