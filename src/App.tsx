import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import { ForgotPasswordPage } from "./pages/forgot-password";
import { Toaster } from "./components/ui/sonner";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors closeButton position="top-right" />
    </QueryClientProvider>
  )
}
