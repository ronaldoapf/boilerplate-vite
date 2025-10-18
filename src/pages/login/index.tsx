import { GalleryVerticalEnd } from 'lucide-react'
import { useState } from 'react'
import { AuthWithPasswordForm } from './components/auth-with-password-form'
import { AuthWithCodeForm } from './components/forms/auth-with-code/auth-with-code-form'

enum LoginTypeEnum {
	AUTH_WITH_PASSWORD = 'auth-with-password',
	ONE_TIME_PASSWORD = 'one-time-password',
}

export default function LoginPage() {
	const [loginType, setLoginType] = useState(LoginTypeEnum.AUTH_WITH_PASSWORD)

	const handleChangeType = () => {
		setLoginType(prevState =>
			prevState === LoginTypeEnum.AUTH_WITH_PASSWORD
				? LoginTypeEnum.ONE_TIME_PASSWORD
				: LoginTypeEnum.AUTH_WITH_PASSWORD
		)
	}

	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<a href="#" className="flex items-center gap-2 self-center font-medium">
					<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
						<GalleryVerticalEnd className="size-4" />
					</div>
					Acme Inc.
				</a>
				<div className='flex flex-col gap-6'>
					{loginType === LoginTypeEnum.AUTH_WITH_PASSWORD && (
						<AuthWithPasswordForm onChangeType={handleChangeType} />
					)}
		
					{loginType === LoginTypeEnum.ONE_TIME_PASSWORD && (
						<AuthWithCodeForm onChangeType={handleChangeType} />
					)}
				</div>
			</div>
		</div>
	)
}
