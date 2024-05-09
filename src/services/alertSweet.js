import Swal from "sweetalert2";

const showAlert = (message) => {
    Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
    }).fire({
        icon: "error",
        title: message,
    })
}

export default showAlert