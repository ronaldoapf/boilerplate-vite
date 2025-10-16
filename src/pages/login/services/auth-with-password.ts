import { axiosClient } from "@/api";
import { useMutation } from "@tanstack/react-query";

interface AuthWithPasswordProps {
  email: string;
  password: string;
}

export function authWithPassword({
  email, password
}: AuthWithPasswordProps) {
  const data = axiosClient.post("auth/password", { email, password });
  return data
}

export function useAuthWithPassword() {
  return useMutation({
    mutationFn: authWithPassword
  })
}