import { axiosClient } from "@/api";

export async function sendResetLink(email: string) {
  const { data } = await axiosClient.post("users/password/forgot", { email });

  return data;
}