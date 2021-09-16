import Parse from 'parse'
import axios, { AxiosError } from 'axios'

const parseAppId = process.env.VUE_APP_PARSE_APP_ID
const parseUrl = process.env.VUE_APP_PARSE_URL

if (parseAppId && parseUrl) {
    Parse.initialize(parseAppId)
    Parse.serverURL = parseUrl
}

type TEnsureJSON<T> = T extends Parse.Object
    ? ReturnType<T['toJSON']>
    : T extends (infer R)[]
        ? TEnsureJSON<R>[]
        : T extends Record<string, unknown>
            ? { [key in keyof T]: TEnsureJSON<T[key]> }
            : T

// cloud function call
const runCloudFunction = async <T extends (
    param: { [P in keyof Parameters<T>[0]]: Parameters<T>[0][P] }
) => unknown>(
    cloudFunc: string, 
    params?: Parameters<T>[0]
): Promise<TEnsureJSON<ReturnType<T>>> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }
    if (parseAppId) {
        headers['X-Parse-Application-Id'] = parseAppId
    }
    const sessionToken = Parse.User.current()?.getSessionToken()
    if (sessionToken) {
        headers['X-Parse-Session-Token'] = sessionToken
    }

    try {
        const request = await axios.post(
            `${parseUrl}/functions/${cloudFunc}`, 
            params,
            {
                headers,
            })
        return request.data.result
    } catch (e) {
        throw (e as AxiosError).response?.data.error
    }
}

export { Parse, runCloudFunction }
