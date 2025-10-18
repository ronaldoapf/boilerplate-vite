import { Button } from '@/components/ui/button'
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from '@/components/ui/field'
import { InputForm } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { useAuthWithPassword } from '../services/auth-with-password'
import z from 'zod'
import { toast } from 'sonner'
import type { AxiosError } from 'axios'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

const loginFormSchema = z.object({
	email: z.email(),
	password: z
		.string()
		.min(6, { error: 'Password must be at least 6 characters long' }),
})

type LoginFormData = z.infer<typeof loginFormSchema>

interface AuthWithPasswordFormProps {
	onChangeType?: () => void
}

export function AuthWithPasswordForm({
	onChangeType,
}: AuthWithPasswordFormProps) {
	const {
		mutateAsync: authWithPassword,
		isPending: isPendingAuthWithPassword,
	} = useAuthWithPassword()

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: 'ronaldo.alves.1997@gmail.com',
			password: 'akuu3xtot347',
		},
	})

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = form

	const onSubmit = handleSubmit(async (data: LoginFormData) => {
		const { email, password } = data
		try {
			await authWithPassword({ email, password })
			toast.success('Login successful')
		} catch (error) {
			console.log(error)
			const errorMessage =
				(error as AxiosError<{ message?: string }>)?.response?.data?.message ||
				'An unexpected error occurred'
			toast.error(errorMessage)
		}
	})

	const isFormSubmitting = isPendingAuthWithPassword || isSubmitting

	return (
		<>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
					<CardDescription>
						Send code to your email to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<FieldGroup>
						<Field>
							<Button variant="outline" type="button" onClick={onChangeType}>
								Send code
							</Button>
						</Field>
						<FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
							Or continue with
						</FieldSeparator>

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
									<InputForm
										name="password"
										id="password"
										type="password"
										required
									/>
								</Field>
								<Field>
									<Button type="submit" isLoading={isFormSubmitting}>
										Login
									</Button>
									<FieldDescription className="text-center">
										Don&apos;t have an account? <a href="#">Sign up</a>
									</FieldDescription>
								</Field>
							</form>
						</FormProvider>
					</FieldGroup>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
				and <a href="#">Privacy Policy</a>.
			</FieldDescription>
		</>
	)
}
