import { useSearchForm } from "@/context/searchFormContext"
import { useModal } from "@/context/modalContext";
import ActionButton from "./ActionButton"
import OverrideButton from "./OverrideButton";
const ActionsButtonsGroup = ({ direccionamiento, completeData }) => {
  const { invoiceStatus, deliveryReportStatus } = useSearchForm()
  const { openModal } = useModal()
  return (
    <>
      {completeData && direccionamiento.EstDireccionamiento === 2 && (
        <OverrideButton type="programacion" id={completeData.IdProgramacion} text="Anular programación" />
      )}
      {direccionamiento.EstProgramacion === 1 && !invoiceStatus[direccionamiento.ID] && (
        <div className="flex justify-between">
          <ActionButton
            onClick={() => openModal(direccionamiento, "delivery")}
            text="Entrega"
            style="bg-sky-default hover:bg-sky-500 text-white"
          />
          <OverrideButton type="programacion" id={direccionamiento.IDProgramacion} text="Anular programación" />
        </div>
      )}
      {completeData && completeData.EstEntrega === 1 && !invoiceStatus[direccionamiento.ID] && (
        <div className="flex justify-between">
          <ActionButton
            onClick={() => openModal(completeData, "invoice")}
            text="Facturación"
            style="bg-success-default hover:bg-success-hover text-white"
          />
          <OverrideButton type="entrega" id={completeData.IdEntrega} text="Anular entrega" />
        </div>
      )}
      {completeData &&
        invoiceStatus[direccionamiento.ID] && !deliveryReportStatus[direccionamiento.ID] && (
          <div className="flex justify-between">
            <ActionButton
              onClick={() => openModal({ ...completeData, ...invoiceStatus[direccionamiento.ID] }, "report")}
              text="Reporte Entrega"
              style="bg-warning-default hover:bg-warning-hover text-white"
            />
            <OverrideButton type="facturacion" id={completeData.IdFacturacion} text="Anular facturación" />
          </div>

        )}
      <div className="flex justify-between">
        {deliveryReportStatus[direccionamiento.ID] && (
          <span className="bg-success-700 rounded-lg text-white p-2">
            Ciclo del direccionamiento completado
          </span>
        )}
        {completeData && deliveryReportStatus[direccionamiento.ID] && (
          <OverrideButton type="reporteEntrega" id={completeData.IdReporteEntrega} text="Anular reporte entrega" />
        )}
      </div>
    </>
  )
}

export default ActionsButtonsGroup