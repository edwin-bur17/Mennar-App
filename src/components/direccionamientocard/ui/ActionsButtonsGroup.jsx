import { useSearchForm } from "@/context/searchFormContext"
import { useModal } from "@/context/modalContext";
import ActionButton from "./ActionButton"
import OverrideButton from "./OverrideButton";
import { TbInfoCircle } from "react-icons/tb";
const ActionsButtonsGroup = ({ direccionamiento, completeData, isDireccionamiento }) => {
  const { deliveryStatus, invoiceStatus, deliveryReportStatus, deliveryNull, invoiceStatusNull, deliveryReportStatusNull } = useSearchForm()
  const { openModal } = useModal()
  return (
    <>
      {isDireccionamiento && completeData &&
        direccionamiento.EstDireccionamiento === 2 && !invoiceStatusNull[direccionamiento.ID] &&
        !deliveryReportStatus[direccionamiento.ID] && !invoiceStatus[direccionamiento.ID] && (
          <OverrideButton type="programacion" id={completeData.IdProgramacion} text="Anular programación" />
        )}
      {direccionamiento.EstProgramacion === 1 && !deliveryStatus[direccionamiento.ID] && ( // Hacer la entrega o anular la programación
        <div className="flex justify-between">
          <ActionButton
            onClick={() => openModal(direccionamiento, "delivery")}
            text="Entrega"
            style="bg-sky-default hover:bg-sky-500 text-white"
          />
          <OverrideButton type="programacion" id={direccionamiento.IDProgramacion} text="Anular programación" />
        </div>
      )}

      {completeData && completeData.EstEntrega === 1 && !invoiceStatus[direccionamiento.ID] &&
        deliveryNull[direccionamiento.ID]?.EstEntrega !== 0 && ( // Hacer la facturación o anular la entrega
          <div className="flex justify-between">
            <ActionButton
              onClick={() => openModal(completeData, "invoice")}
              text="Facturación"
              style="bg-success-default hover:bg-success-hover text-white"
            />
            <OverrideButton type="entrega" id={completeData.IdEntrega} text="Anular entrega" />
          </div>
        )}

      {completeData && // Hacer el reporte entrega o anular la facturación
        invoiceStatus[direccionamiento.ID] && !deliveryReportStatus[direccionamiento.ID] &&
        invoiceStatusNull[direccionamiento.ID]?.EstFacturacion !== 0 && (
          <div className="flex justify-between">
            <ActionButton
              onClick={() => openModal(completeData, "report")}
              text="Reporte Entrega"
              style="bg-warning-default hover:bg-warning-hover text-white"
            />
            <OverrideButton type="facturacion" id={completeData.IdFacturacion} text="Anular facturación" />
          </div>
        )}

      {/* Mostrar la alerta de finalización del ciclo y el de anular el reporte entrega */}
      <div className="flex justify-between ">
        {deliveryReportStatus[direccionamiento.ID] && (
          <span className="flex justify-between bg-success-700 rounded-lg text-white p-2">
            <TbInfoCircle className="me-2" size={26} />
            Ciclo del direccionamiento completado
          </span>
        )}
        {completeData && // Anular el reporte de entrega 
          deliveryReportStatus[direccionamiento.ID] && deliveryReportStatusNull[direccionamiento.ID]?.EstRepEntrega !== 0 && (
            <OverrideButton type="reporteEntrega" id={completeData.IdReporteEntrega} text="Anular reporte entrega" />
          )}
      </div>
    </>
  )
}

export default ActionsButtonsGroup