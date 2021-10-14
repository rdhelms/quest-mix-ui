import { IBackground } from '@/store/backgrounds/state'
import axios from 'axios'

const createBackground = async (background: IBackground) => {
    const result = await axios.post(`${process.env.VUE_APP_SERVER_URL}/backgrounds`, background)
    console.log(result.data)
    return result
}

export default {
    createBackground,
}
