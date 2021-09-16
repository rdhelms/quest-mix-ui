import { Parse } from '@/store/parseUtils'
import { resetState } from '@/store/reset'
import { userModule } from '@/store/user/module'

const forgotPassword = (email: string) =>
    Parse.User.requestPasswordReset(email.toLowerCase())

type TCreateUser = { 
    email: string
    password: string
}
const createUser = async ({ email, password }: TCreateUser) => {
    const generatePassword = () => {
        const length = 12
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let retVal = ''
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n))
        }
        return retVal
    }

    const lowercaseEmail = email.toLowerCase()
    const newUser = await Parse.User.signUp(
        lowercaseEmail,
        password || generatePassword(),
        {}
    )

    userModule.state.user = newUser.toJSON()
    return newUser.toJSON()
}

const resetPassword = async () => {
    const user = Parse.User.current()
    if (!user) {
        throw new Error('resetPassword: No current user found.')
    }
    await Parse.User.requestPasswordReset(user.get('username'))
    return
}

const signIn = async ({
    username,
    password,
}: { username: string; password: string }) => {
    const user = (await Parse.User.logIn(username.toLowerCase(), password)).toJSON()

    userModule.state.user = user
    return user
}

const signOut = async () => {
    if (userModule.state.user || Parse.User.current()) {
        // if you have an invalid session token, logout throws and we don't care
        try {
            await Parse.User.logOut()
        } catch (err) {
            // noop
        }
        resetState()
    }
}

export default {
    resetPassword,
    signIn,
    signOut,
    createUser,
    forgotPassword,
}
