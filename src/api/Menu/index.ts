import request from '@/utils/request'

export function build() {
    return request.get('/manager/menus/build')
}