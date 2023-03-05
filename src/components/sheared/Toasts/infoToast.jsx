import { toast } from 'react-toastify';

const infoToast = (text, options) => {
  return toast.info(text, { ...options });
};

export default infoToast;
