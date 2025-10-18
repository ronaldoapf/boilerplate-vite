import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { useAuthWithCode } from '@/pages/login/services/auth-with-code'
import { zodResolver } from '@hookform/resolvers/zod'
import type { AxiosError } from 'axios'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const loginFormSchema = z.object({
	code: z.string().min(6, 'Code must be at least 6 characters long').max(6, 'Code must be at most 6 characters long'),
})

type LoginFormData = z.infer<typeof loginFormSchema>

interface VerifyCodeStepsProps {
	email: string;
}

export function VerifyCodeSteps({ email }: VerifyCodeStepsProps) {
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			code: '',
		},
	})

	const { mutateAsync: authWithCode, isPending: isPendingAuthWithCode } =
		useAuthWithCode()

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = form

	const onSubmit = handleSubmit(async (data: LoginFormData) => {
		const { code } = data
		try {
			await authWithCode({ code, email })
			toast.success('Send code to your e-mail')
		} catch (error) {
			console.log(error)
			const errorMessage =
				(error as AxiosError<{ message?: string }>)?.response?.data?.message ||
				'An unexpected error occurred'
			toast.error(errorMessage)
		}
	})

	const isFormSubmitting = isSubmitting || isPendingAuthWithCode

	return (
		<FormProvider {...form}>
			<form className="space-y-4" onSubmit={onSubmit}>
				<Field className='flex items-center justify-center w-full'>
					<FieldLabel htmlFor="email">Code</FieldLabel>
					<Controller 
						name='code'
						control={control}
						render={({ field }) => (
							<InputOTP maxLength={6} {...field}>
								<InputOTPGroup>
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
									<InputOTPSlot index={2} />
									<InputOTPSlot index={3} />
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
								</InputOTPGroup>
							</InputOTP>
						)}
					/>
					 
				</Field>
				<Field>
					<Button type="submit" isLoading={isFormSubmitting}>
						Send code
					</Button>
					<FieldDescription className="text-center">
						Don&apos;t have an account? <a href="#">Sign up</a>
					</FieldDescription>
				</Field>
			</form>
		</FormProvider>
	)
}
