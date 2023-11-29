import { Toaster as Toast, ToastOptions } from 'react-hot-toast';

const Toaster = () => {
  const defaultToasterOption: ToastOptions = {
    duration: 2000,
    style: {
      backgroundColor: '#ffffff',
      color: '#2a363b',
      boxShadow: 'rgba(0, 0, 0, 0.25)',
    },
  };
  return <Toast toastOptions={defaultToasterOption} />;
};

export default Toaster;
