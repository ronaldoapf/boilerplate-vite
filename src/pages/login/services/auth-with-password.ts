import { axiosClient } from '@/api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface AuthWithPasswordProps {
	email: string
	password: string
}

export async function authWithPassword({
	email,
	password,
}: AuthWithPasswordProps): Promise<void> {
	await axiosClient.post('auth/password', { email, password })
}

export function useAuthWithPassword() {
	return useMutation<void, AxiosError, AuthWithPasswordProps, unknown>({
		mutationFn: authWithPassword,
	})
}
