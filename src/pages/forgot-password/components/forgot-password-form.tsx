import { Button } from "@/components/ui/button"
import { InputForm } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { sendResetLink } from "../services/send-reset-link"

const forgotPasswordSchema = z.object({
  email: z.email()
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm() { 
  const form = useForm({
    defaultValues: {
      email: "ronaldo.alves.1997@gmail.com",
    },
    resolver: zodResolver(forgotPasswordSchema)
  })

  const { handleSubmit, formState: { isSubmitting }} = form

  const onSubmit = handleSubmit(async (data: ForgotPasswordFormData) => {
    console.log(data)

    try {
      const result = await sendResetLink(data.email)
      console.log(result)
    } catch (error) { 
      console.log(error)
    }
  })

  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={onSubmit}>
        <div className='space-y-1'>
          <Label className='leading-5' htmlFor='userEmail'>
            Email address*
          </Label>
          <InputForm name="email" type='email' id='userEmail' placeholder='Enter your email address' />
        </div>

        <Button className='w-full' type='submit' isLoading={isSubmitting}>
          Send Reset Link
        </Button>
      </form>
    </FormProvider>
  )
}
