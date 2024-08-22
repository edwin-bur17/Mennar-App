import { Dialog, DialogPanel, DialogBackdrop, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import DeliveryForm from './forms/DeliveryForm'
import InvoiceForm from './forms/InvoiceForm';
import DeliveryReportForm from './forms/DeliveryReportForm';
import { IoClose } from "react-icons/io5";
import { useModal } from "@/context/modalContext";
const ModalDelivery = () => {
    const { closeModal, isOpen, step } = useModal()

    const renderForm = () => {
        switch (step) {
            case "delivery":
                return <DeliveryForm />
            case "invoice":
                return <InvoiceForm />
            case "report":
                return <DeliveryReportForm />
            default:
                return null;
        }
    }

    const getModalTitle = () => {
        switch (step) {
            case "delivery":
                return "Entrega"
            case "invoice":
                return "Facturación"
            case "report":
                return "Reporte de Entrega"
            default:
                return null
        }
    }
    return (
        <Transition show={isOpen} as={Fragment}>
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
                    <DialogBackdrop className="fixed inset-0 bg-black-50" />
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
                                <div className="relative flex items-center mb-2">
                                    <h3 className="text-2xl font-medium w-full text-center">
                                        {getModalTitle()}
                                    </h3>
                                    <button
                                        onClick={closeModal}
                                        className="absolute right-0 cursor-pointer text-danger-default hover:bg-danger-default hover:text-white rounded-full transition-colors"
                                    >
                                        <IoClose size={32} />
                                    </button>
                                </div>
                                {renderForm()}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ModalDelivery