import { axiosClient } from "@/api";

interface ResetPasswordProps {
  token: string;
  password: string;
  confirmPassword: string;
}

export async function resetPassword({ confirmPassword, token, password }: ResetPasswordProps) {
  const data = await axiosClient.post("/users/password/reset", { 
    token,
    newPassword: password, 
    confirmPassword 
  });

  return data;
}
