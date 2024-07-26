// Calcular el valor total faturado (invoiceform)
export function totalInvoiceValue(CantUnMinDis, ValorUnitFacturado, CuotaModer, Copago) {
    const cantUnMinDis = Number(CantUnMinDis) || 0
    const valorUnitFacturado = Number(ValorUnitFacturado) || 0
    const cuotaModer = Number(CuotaModer) || 0
    const copago = Number(Copago) || 0
    const subtotal = cantUnMinDis * valorUnitFacturado
    const deduction = cuotaModer > 0 ? cuotaModer : copago
    return Math.max(subtotal - deduction, 0).toFixed(0)
}

