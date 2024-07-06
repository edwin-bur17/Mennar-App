import { Dialog, DialogPanel, DialogTitle, DialogBackdrop, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import { documentTypeOptions } from '@/utils/documentTypeOptions'

const ModalDelivery = ({ onClose, isOpen, direccionamiento }) => {
    const {CodSerTecAEntregar, CantTotAEntregar} = direccionamiento
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <DialogBackdrop className="fixed inset-0 bg-black/50" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-xl bg-white p-6 transition-all">
                                <DialogTitle as="h3" className="text-xl font-medium text-gray-900 text-center mb-4">
                                    Direccionamiento: {direccionamiento.ID}
                                </DialogTitle>
                                <form>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="codServicio"
                                            className="block mb-2 text-sm font-medium text-gray-700"
                                        >
                                            Código servicio a entregar:
                                        </label>
                                        <input
                                            type="text"
                                            id="codServicio"
                                            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                            value={CodSerTecAEntregar}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="cantTotAEntregar"
                                            className="block mb-2 text-sm font-medium text-gray-700"
                                        >
                                            Cantidad Total a entregar:
                                        </label>
                                        <input
                                            type="text"
                                            id="cantTotAEntregar"
                                            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                            value={CantTotAEntregar}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="cantidadEntregada"
                                            className="block mb-2 text-sm font-medium text-gray-700"
                                        >
                                            Cantidad entregada:
                                        </label>
                                        <input
                                            type="number"
                                            id="cantidadEntregada"
                                            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="fecEntrega"
                                            className="block mb-2 text-sm font-medium text-gray-700"
                                        >
                                            Fecha de Entrega:
                                        </label>
                                        <input
                                            type="date"
                                            id="fecEntrega"
                                            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="noLote"
                                            className="block mb-2 text-sm font-medium text-gray-700"
                                        >
                                            Número de lote:
                                        </label>
                                        <input
                                            type="number"
                                            id="noLote"
                                            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            htmlFor="tipoIdentificacion"
                                            className="block mb-2 text-sm font-medium text-gray-700"
                                        >
                                            Número de Identificación:
                                        </label>
                                        <select id="tipoIdentificacion" className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" >
                                            <option value="">Selecciona una opción</option>
                                            {documentTypeOptions.map((option, index) => (
                                                <option key={index} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            htmlFor="noIdentificación"
                                            className="block mb-2 text-sm font-medium text-gray-700"
                                        >
                                            Número de Identificación:
                                        </label>
                                        <input
                                            type="number"
                                            id="noIdentificación"
                                            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <button
                                            className="rounded-md bg-gray-600 py-1.5 px-3 text-base font-semibold text-white hover:bg-gray-500"
                                            onClick={onClose}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="onsubmit"
                                            className="rounded-md bg-sky-600 py-1.5 px-3 text-base font-semibold text-white hover:bg-sky-500"
                                        >
                                            Entrega
                                        </button>
                                    </div>
                                </form>

                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ModalDelivery