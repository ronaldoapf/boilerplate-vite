import { axiosClient } from "@/api";

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
