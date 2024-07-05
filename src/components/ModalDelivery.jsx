import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'

const ModalDelivery = ({ onClose, isOpen, direccionamiento }) => {
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
                <div className="fixed inset-0 bg-black bg-opacity-50 " />
            </TransitionChild>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 transition-all">
                            <DialogTitle as="h3" className="text-xl font-medium text-gray-900">
                                Entrega
                            </DialogTitle>
                            <p className="mt-2 text-gray-900">
                                Direccionamiento a entregar: {direccionamiento.ID}
                            </p>
                            <div className="flex justify-between mt-4">
                                <button
                                    className="rounded-md bg-gray-600 py-1.5 px-3 text-base font-semibold text-white hover:bg-gray-500"
                                    onClick={onClose}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="rounded-md bg-sky-600 py-1.5 px-3 text-base font-semibold text-white hover:bg-sky-500"
                                    onClick={onClose}
                                >
                                    Entrega
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </Transition>
    )
}

export default ModalDelivery