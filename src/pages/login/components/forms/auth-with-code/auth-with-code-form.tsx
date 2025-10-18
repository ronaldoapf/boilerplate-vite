import { Button } from '@/components/ui/button'
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldSeparator,
} from '@/components/ui/field'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { EmailSteps } from './e-mail-steps'
import { useState } from 'react'
import { VerifyCodeSteps } from './verify-code-steps'

interface AuthWithCodeFormProps {
	onChangeType?: () => void
}

enum StepEnum {
	SEND_EMAIL_WITH_CODE = 'send-email-with-code',
	VERIFY_CODE = 'verify-code',
}

export function AuthWithCodeForm({ onChangeType }: AuthWithCodeFormProps) {
	const [step, setStep] = useState({
		step: StepEnum.SEND_EMAIL_WITH_CODE,
		email: ''
	})

	const handleNextStep = (email: string) => {
		setStep({
			step: StepEnum.VERIFY_CODE,
			email
		})
	}

	return (
		<>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
					<CardDescription>Enter using your email and password</CardDescription>
				</CardHeader>
				<CardContent>
					<FieldGroup>
						<Field>
							<Button variant="outline" type="button" onClick={onChangeType}>
								Use e-mail and password
							</Button>
						</Field>
						<FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
							Or continue with
						</FieldSeparator>

						{step.step === StepEnum.SEND_EMAIL_WITH_CODE && (
							<EmailSteps onHandleNextStep={handleNextStep} />
						)}

						{step.step === StepEnum.VERIFY_CODE && (
							<VerifyCodeSteps email={step.email} />
						)}
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
