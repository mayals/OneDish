import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// https://deadsimplechat.com/blog/react-toastify-the-complete-guide/#setting-the-toast-notification-position
//to make notifactio to any componentet

const notify = (msg,type) => {
    if (type === "Default")
        toast(msg)
    
    if (type === "info")
        toast.info(msg)

    else if (type ==="success")
        toast.success(msg)

    if (type === "warning")
        toast.warning(msg)
       
    else if (type ==="error")
        toast.error(msg)

};
export default notify;