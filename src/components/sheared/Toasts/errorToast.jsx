import { toast } from 'react-toastify';

const errorToast = text => {
  return toast.error(text);
};

export default errorToast;
