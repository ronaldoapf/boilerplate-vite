import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { InputForm } from '@/components/ui/input'
import {
	useSendAuthCode,
} from '@/pages/login/services/auth-with-code'
import { zodResolver } from '@hookform/resolvers/zod'
import type { AxiosError } from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const loginFormSchema = z.object({
	email: z.email(),
})

type LoginFormData = z.infer<typeof loginFormSchema>

interface EmailStepsProps {
	onHandleNextStep: (email: string) => void
}

export function EmailSteps({ onHandleNextStep }: EmailStepsProps) {
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: 'ronaldo.alves.1997@gmail.com',
		},
	})

	const { mutateAsync: sendAuthCode, isPending: isPendingSendAuthCode } =
		useSendAuthCode()

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = form

	const onSubmit = handleSubmit(async (data: LoginFormData) => {
		const { email } = data
		try {
			await sendAuthCode({ email })
			toast.success('Code sent to your e-mail')
			onHandleNextStep(email)
		} catch (error) {
			console.log(error)
			const errorMessage =
				(error as AxiosError<{ message?: string }>)?.response?.data?.message ||
				'An unexpected error occurred'
			toast.error(errorMessage)
		}
	})

	const isFormSubmitting = isSubmitting || isPendingSendAuthCode

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
