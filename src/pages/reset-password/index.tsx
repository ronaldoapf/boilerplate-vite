'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { InputForm } from '@/components/ui/input'

import { Field, FieldLabel } from '@/components/ui/field'
import { useResetPassword } from './services/reset-password'
import { useNavigate, useSearchParams } from 'react-router-dom'

const resetPasswordSchema = z.object({
  email: z.email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters long'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
})

type ResetPasswordData = z.infer<typeof resetPasswordSchema>

export function ResetPasswordPage() {
  
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: 'ronaldo.alves.1997@gmail.com',
      password: '123456',
      confirmPassword: '123456',
    },
  })

  const { handleSubmit, formState: { isSubmitting }} = form

  const { mutateAsync: resetPassword, isPending: isPendingResetPassword } = useResetPassword()

  const onSubmit = handleSubmit(async (data: ResetPasswordData) => {
    const token = searchParams.get('token') as string

    try {
      await resetPassword({
        token: token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })

      toast.success(
        'Password reset successful. You can now log in with your new password.',
      )
      navigate("/")
    } catch (error) {
      console.error('Error resetting password', error)
      toast.error('Failed to reset the password. Please try again.')
    }
  })

  const isFormSubmitting = isSubmitting || isPendingResetPassword

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="mx-auto w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={onSubmit} className="space-y-8">
              <div className="grid gap-4">
                
                <Field>
                  <FieldLabel htmlFor="password">New password</FieldLabel>
                  <InputForm
                    required
                    id="password"
                    type="password"
                    name="password"
                    placeholder="******"
                    disabled={isFormSubmitting}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
                  <InputForm
                    required
                    type="password"
                    id="confirmPassword"
                    placeholder="******"
                    name="confirmPassword"
                    disabled={isFormSubmitting}
                  />
                </Field>

                <Button type="submit" className="w-full" isLoading={isFormSubmitting}>
                  Reset Password
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}
