import { Parse } from '@/store/parseUtils'

export interface IUserState {
    user: ReturnType<Parse.User['toJSON']> | null
}

export const getInitialUserState = (): IUserState => {
    const parseUserFromLocalStorage = Parse.User.current()
    return {
        user: parseUserFromLocalStorage?.toJSON() || null,
    }
}

const moduleState = getInitialUserState()

export default moduleState
