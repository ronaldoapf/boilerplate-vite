import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { InputForm } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useAuthWithPassword } from "../services/auth-with-password";
import z from "zod";
import { toast } from "sonner";

const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function AuthWithPasswordForm() {

  const { 
    mutateAsync: authWithPassword, 
    isPending: isPendingAuthWithPassword 
  } = useAuthWithPassword()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "ronaldo.alves.1997@gmail.com",
      password: "akuu3xtot347",
    },
  })

  const { handleSubmit,formState: { isSubmitting } } = form

  const onSubmit = handleSubmit(async (data: LoginFormData) => {
    const { email, password } = data
    try {
      await authWithPassword({ email, password })
      toast.success("Login successful")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  })

  const isFormSubmitting = isPendingAuthWithPassword || isSubmitting

  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <InputForm
            required
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <NavLink
              to="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </NavLink>
          </div>
          <InputForm name="password" id="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit" isLoading={isFormSubmitting}>Login</Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account? <a href="#">Sign up</a>
          </FieldDescription>
        </Field>
      </form>
    </FormProvider>
  )
}