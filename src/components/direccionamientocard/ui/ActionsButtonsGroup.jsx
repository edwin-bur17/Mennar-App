import React from 'react';
import { useSearchForm } from "@/context/searchFormContext"
import { useModal } from "@/context/modalContext";
import ActionButton from "./ActionButton"
import OverrideButton from "./OverrideButton";
import { TbInfoCircle } from "react-icons/tb";

const ActionsButtonsGroup = ({ direccionamiento, completeData, isDireccionamiento }) => {
  const { deliveryStatus, invoiceStatus, deliveryReportStatus } = useSearchForm()
  const { openModal } = useModal()

  const renderButtons = () => {
    const delivery = deliveryStatus[direccionamiento.ID];
    const invoice = invoiceStatus[direccionamiento.ID];
    const deliveryReport = deliveryReportStatus[direccionamiento.ID];

    if (isDireccionamiento && completeData && direccionamiento.EstDireccionamiento === 2) { // Botones: Anular programación
      return (
        <OverrideButton type="programacion" id={completeData.IdProgramacion} text="Anular programación" />
      );
    }

    if (completeData && direccionamiento.EstProgramacion === 1) { // Botones: Entrega y Anular programación
      return (
        <div className="flex justify-between">
          <ActionButton
            onClick={() => openModal(direccionamiento, "delivery")}
            text="Entrega"
            style="bg-sky-default hover:bg-sky-500 text-white"
          />
          <OverrideButton type="programacion" id={direccionamiento.IDProgramacion} text="Anular programación" />
        </div>
      );
    }

    if (completeData && delivery === 1 && (invoice === null || invoice === 0)) { // Botones: facturación y anular la entrega
      return (
        <div className="flex justify-between">
          <ActionButton
            onClick={() => openModal(completeData, "invoice")}
            text="Facturación"
            style="bg-success-default hover:bg-success-hover text-white"
          />
          <OverrideButton type="entrega" id={completeData.IdEntrega} text="Anular entrega" />
        </div>
      );
    }

    if (completeData && invoice === 1 && (deliveryReport === null || deliveryReport === 0)) {// Botones: Reporte entrega y anular facturación
      return (
        <div className="flex justify-between">
          <ActionButton
            onClick={() => openModal(completeData, "report")}
            text="Reporte Entrega"
            style="bg-warning-default hover:bg-warning-hover text-white"
          />
          <OverrideButton type="facturacion" id={completeData.IdFacturacion} text="Anular facturación" />
        </div>
      );
    }

    if (completeData && deliveryReport === 1) { // Botones: Anular el reporte 
      return (
        <OverrideButton type="reporteEntrega" id={completeData.IdReporteEntrega} text="Anular reporte entrega" />
      );
    }
    return null;
  };

  return (
    <>
      {renderButtons()}
      <div className="flex justify-between">
        {deliveryReportStatus[direccionamiento.ID] === 2 && (
          <span className="flex justify-between bg-success-700 rounded-lg text-white p-2">
            <TbInfoCircle className="me-2" size={26} />
            Ciclo del direccionamiento completado
          </span>
        )}
      </div>
    </>
  );
};

export default ActionsButtonsGroup;