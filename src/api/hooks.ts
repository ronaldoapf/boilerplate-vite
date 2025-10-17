import { useMutation } from '@tanstack/react-query';
import { authWithPassword } from './auth';
import { sendResetLink, resetPassword } from './users';

export function useAuthWithPassword() {
  return useMutation({
    mutationFn: authWithPassword
  });
}

export function useSendResetLink() {
  return useMutation({
    mutationFn: sendResetLink
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword
  });
}
