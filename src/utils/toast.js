import { toast as showToast } from "react-toastify";

const toast = {
    info: (message) => {},
    success: (message) => {},
    warning: (message) => showToast(message, { type: 'warning' }),
    error: (message) => showToast(message, { type: 'error' }),
}


export default toast;
