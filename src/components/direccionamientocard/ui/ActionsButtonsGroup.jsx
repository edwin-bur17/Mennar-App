import { useSearchForm } from "@/context/searchFormContext"
import { useModal } from "@/context/modalContext"
import ActionButton from "./ActionButton"
import CycleCompletedAlert from './CycleCompletedAlert'
import OverrideButton from "./OverrideButton"

const ActionsButtonsGroup = ({ direccionamiento, completeData, isDireccionamiento }) => {
  const { deliveryStatus, invoiceStatus, deliveryReportStatus } = useSearchForm()
  const { openModal } = useModal()

  // Renderizar los botones apropiados para el estado del direccionamiento
  const renderButtons = () => {
    let delivery = deliveryStatus[direccionamiento.ID]
    let invoice = invoiceStatus[direccionamiento.ID]
    let deliveryReport = deliveryReportStatus[direccionamiento.ID]

    switch (true) {
      // case isDireccionamiento && completeData && direccionamiento.EstDireccionamiento === 2 &&
      //   (delivery === null || delivery === 0) && (invoice === null || invoice === 0) &&
      //   (deliveryReport === null || deliveryReport === 0): // Botón : Anular programación desde el módulo direccionamentos
      //   return <OverrideButton type="programacion" id={completeData.IdProgramacion} text="Programación" />

      case !isDireccionamiento && direccionamiento.EstProgramacion === 1: // Botones: Entrega y Anular programación
        return (
          <>
            <ActionButton
              onClick={() => openModal(direccionamiento, "delivery")}
              text="Entrega"
              style="bg-sky-default hover:bg-sky-500 text-white"
            />
            <OverrideButton type="programacion" id={direccionamiento.IDProgramacion} text="Programación" />
          </>
        )

      case !isDireccionamiento && completeData && delivery === 1 && (invoice === null || invoice === 0): // Botones: facturación y anular la entrega
        return (
          <>
            <ActionButton
              onClick={() => openModal(completeData, "invoice")}
              text="Facturación"
              style="bg-success-default hover:bg-success-hover text-white"
            />
            <OverrideButton type="entrega" id={completeData.IdEntrega} text="Entrega" />
          </>
        )

      case !isDireccionamiento && completeData &&
        invoice === 1 && (deliveryReport === null || deliveryReport === 0): // Botones: Reporte entrega y anular facturación
        return (
          <>
            <ActionButton
              onClick={() => openModal(completeData, "report")}
              text="Reporte Entrega"
              style="bg-warning-default hover:bg-warning-hover text-white"
            />
            <OverrideButton type="facturacion" id={completeData.IdFacturacion} text="Facturación" />
          </>
        )

      case completeData && deliveryReport === 1: // Botones: Anular el reporte 
        return (<OverrideButton type="reporteEntrega" id={completeData.IdReporteEntrega} text="Reporte Entrega" />)

      default:
        break
    }
  }

  return (
    <>
      <div className="flex justify-between">
        {renderButtons()}
      </div>
      {deliveryReportStatus[direccionamiento.ID] === 2 && (
        <CycleCompletedAlert />
      )}
    </>
  )
}

export default ActionsButtonsGroup