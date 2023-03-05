import { toast } from 'react-toastify';

const warningToast = (text, options) => {
  return toast.warning(text, { ...options });
};

export default warningToast;
