import { axiosClient } from '@/api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface SendAuthCodeProps {
	email: string
}

interface AuthWithCodeProps {
	code: string
	email: string
}

export async function sendAuthCode({
	email,
}: SendAuthCodeProps) {
	await axiosClient.post('auth/code/send', { email })
}

export function useSendAuthCode() {
	return useMutation<void, AxiosError, SendAuthCodeProps, unknown>({
		mutationFn: sendAuthCode,
	})
}

export async function authWithCode({
	code,
	email,
}: AuthWithCodeProps): Promise<void> {
	await axiosClient.post('auth/code', { email, code })
}

export function useAuthWithCode() {
	return useMutation<void, AxiosError, AuthWithCodeProps, unknown>({
		mutationFn: authWithCode,
	})
}