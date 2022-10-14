import request from '@/utils/request'

export function deptTree(query: Object) {
    return request.get('/manager/dept', {
        params: {
            sort: 'id,desc',
            ...query
        }
    })
}

export function manager(query: Object) {
    return request.get('/manager/users', {
        params: {
            ...{
                page: 1,
                size: 10,
                sort: 'id,desc'
            }, ...query
        }
    })
}

export function changeStatue(data: Object) {
    return request.put('/manager/users', {
        data
    })
}