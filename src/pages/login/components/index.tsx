import { cn } from '@/lib/utils'
import { AuthWithPasswordForm } from './auth-with-password-form'
import { useState } from 'react'
import { AuthWithCodeForm } from './forms/auth-with-code/auth-with-code-form'

enum LoginTypeEnum {
	AUTH_WITH_PASSWORD = 'auth-with-password',
	ONE_TIME_PASSWORD = 'one-time-password',
}

export function LoginPage({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const [loginType, setLoginType] = useState(LoginTypeEnum.AUTH_WITH_PASSWORD)

	const handleChangeType = () => {
		setLoginType(prevState =>
			prevState === LoginTypeEnum.AUTH_WITH_PASSWORD
				? LoginTypeEnum.ONE_TIME_PASSWORD
				: LoginTypeEnum.AUTH_WITH_PASSWORD
		)
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			{loginType === LoginTypeEnum.AUTH_WITH_PASSWORD && (
				<AuthWithPasswordForm onChangeType={handleChangeType} />
			)}

			{loginType === LoginTypeEnum.ONE_TIME_PASSWORD && (
				<AuthWithCodeForm onChangeType={handleChangeType} />
			)}
		</div>
	)
}
