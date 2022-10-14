import request from '@/utils/request'
import {LoginState} from '@/models/login'

export function code() {
    return request.get('/auth/code')
}

export function login(data:LoginState) {
    return request.post('/auth/login',{
        data
    })
}