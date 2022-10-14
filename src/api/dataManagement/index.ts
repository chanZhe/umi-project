import request from '@/utils/request'

export function  buildTree(parentId: Number) {
    return request.get('/cdss/range/directory/info/query',{
        params: {
            parentId
        }
    })
}