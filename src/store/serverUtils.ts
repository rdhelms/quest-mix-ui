import axios, { AxiosError } from 'axios'

export const runServerFunction = async <T extends (
    param: { [P in keyof Parameters<T>[0]]: Parameters<T>[0][P] }
) => unknown>(
    serverFunc: string, 
    params?: Parameters<T>[0]
): Promise<ReturnType<T>> => {
    const serverUrl = process.env.VUE_APP_SERVER_URL
    if (!serverUrl) {
        throw new Error('No server url')
    }

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }

    try {
        const request = await axios.post<ReturnType<T>>(
            `${process.env.VUE_APP_SERVER_URL}/${serverFunc}`, 
            params,
            {
                headers,
            })
        return request.data
    } catch (e) {
        const errorData = (e as AxiosError).response?.data as { error: string } | undefined
        if (typeof errorData === 'object' && errorData && 'error' in errorData && typeof errorData.error === 'string') {
            throw new Error(errorData.error)
        } else {
            throw e
        }
    }
}
