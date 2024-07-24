import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal).mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});



const Success = (message) => {
  MySwal.fire({
    icon: 'success',
    title: message,
  })
}

const Error = (message) => {
  MySwal.fire({
    icon: 'error',
    title: message,
  })
}

const Toast = {
  Success,
  Error
}

export default Toast;