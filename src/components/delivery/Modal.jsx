import { Dialog, DialogPanel, DialogBackdrop, Transition, TransitionChild, DialogTitle } from '@headlessui/react'
import { Fragment } from 'react'
import DeliveryForm from './forms/DeliveryForm'
import InvoiceForm from './forms/InvoiceForm';
import { IoClose } from "react-icons/io5";
import { useSearchForm } from '@/context/searchFormContext'

const ModalDelivery = () => {
    const { closeModal, isModalOpen, currentDireccionamiento } = useSearchForm()
    return (
        <Transition show={isModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                            <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-5 transition-all">
                                <div className="flex justify-between align-middle mb-2">
                                    <h3 className="text-2xl font-medium">
                                        {currentDireccionamiento.IDEntrega ? "Facturación" : "Entrega"}
                                    </h3>
                                    <button
                                        onClick={closeModal}
                                        className="cursor-pointer text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-colors">
                                        <IoClose size={32} />
                                    </button>
                                </div>
                                {currentDireccionamiento.IDEntrega ? <InvoiceForm /> : <DeliveryForm />}                                 {/* <InvoiceForm /> */}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ModalDelivery