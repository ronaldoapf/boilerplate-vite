import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient()

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
}) 