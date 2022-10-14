import router from 'umi/router'
import {code, login} from '@/api/Login'
import {setToken} from '@/utils/auth'

export interface stateType {
    img: string,
    uuid: string
}

export interface LoginState {
    username: string,
    password: string,
    code: string,
    uuid: string
}

export default{
    namespace: 'Login',
    state: {
        img: '',
        uuid: ''
    },
    effects:{
        *getImage({payload}:any,{call,put}:any) {
            const {img, uuid} = yield call(code, payload)
            yield put({
                type: 'setImage',
                payload: {
                    img, uuid
                }
            })
        },
        *toLogin({payload}:any, {call}:any) {
            try{
                const {token} = yield call(login, payload)
                setToken(token, true)
                router.push('/dashboard')
            }catch(err) {
                console.log("fail:", err)
            }
        }
    },
    reducers: {
        setImage(state:stateType, action:{payload: stateType}) {
            return {...state, ...action.payload}
        }
    }
}