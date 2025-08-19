import { toast } from 'react-toastify';

export function useError() {
  function showError(message) {
    toast.error(message);
  }
  function showSuccess(message) {
    toast.success(message);
  }
  return { showError, showSuccess };
} 