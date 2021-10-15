import { IBackground } from '@/store/backgrounds/state'
import axios from 'axios'

const fetchBackgrounds = async () => {
    const backgrounds = (await axios.get(`${process.env.VUE_APP_SERVER_URL}/backgrounds`)).data as IBackground[]
    return backgrounds
}

const createBackground = async (background: Omit<IBackground, 'objectId'>) => {
    const result = await axios.post(`${process.env.VUE_APP_SERVER_URL}/backgrounds`, background)
    console.log(result.data)
    return result
}

export default {
    fetchBackgrounds,
    createBackground,
}
