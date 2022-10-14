import { deptTree, manager, changeStatue } from '@/api/System/user'

interface NODE_DATA {
    id: number,
    label: string,
    leaf: boolean,
    enabled: boolean,
    hasChildren: boolean,
    children?: NODE_DATA[];
}

const onloadData = ({ key, children, content, state }: any) => {
    if (children) {
        return state
    }
    if (!state.treeData.length) {
        return content
    }
    return updateNode(state.treeData, key, content)
}

const updateNode = (list: NODE_DATA[], key: string, children: NODE_DATA[]): NODE_DATA[] => {
    return list.map((node: any) => {
        if (node.id === key) {
            return {
                ...node,
                children
            }
        }
        if (node.children) {
            return {
                ...node,
                children: updateNode(node.children, key, children)
            }
        }
        return node
    })
}

export default {
    namespace: 'User',
    state: {
        treeData: [],
        content: [],
        totalElement: 0,
        deptId: null
    },
    effects: {
        *getTree({ payload }: any, { call, put }: any) {
            const { key, children, resolve } = payload
            let { content } = yield call(deptTree, { pid: key })
            content = content.map((node: NODE_DATA) => ({
                ...node,
                ...{
                    title: node.label,
                    key: node.id,
                    children: node.children,
                    isLeaf: !node.hasChildren
                }
            }))
            yield put({
                type: 'setTreeData',
                payload: { content, key: key, children: children }
            })
            yield resolve && resolve()
        },
        *searchTree({ payload }: any, { call, put }: any) {
            const { name, setLoading, setLoadedKeys } = payload
            let { content } = yield call(deptTree, { name })
            content = content.map((node: NODE_DATA) => ({
                ...node,
                ...{
                    title: node.label,
                    key: node.id,
                    children: node.children,
                    isLeaf: name ? true : !node.hasChildren
                }
            }))
            yield !name && setLoadedKeys && setLoadedKeys([])
            yield put({
                type: 'updateTreeData',
                payload: { content }
            })
            yield setLoading && setLoading(false)
        },
        *getManager({ payload }: any, { call, put }: any) {
            const { deptId, setTableLoading } = payload
            yield setTableLoading(true)
            const { content, totalElement } = yield call(manager, { deptId })
            yield put({
                type: 'setState',
                payload: {
                    content,
                    totalElement,
                    deptId
                }
            })
            yield setTableLoading && setTableLoading(false)
        },
        *setDataSource({ payload }: any, { call, put, select }: any) {
            const { state, setTableLoading } = payload
            yield call(changeStatue, { ...state })
            const { deptId } = yield select((_: any) => _.User)
            yield put.resolve({ type: 'getManager', payload: { deptId, setTableLoading } })
        }
    },
    reducers: {
        setTreeData(state: any, action: { payload: any }) {
            const { key, content, children } = action.payload
            const treeData = onloadData({ key, children, content, state })
            return { ...state, ...{ treeData } }
        },
        updateTreeData(state: any, action: { payload: any }) {
            const { content } = action.payload
            return { ...state, ...{ treeData: content } }
        },
        setState(state: any, action: { payload: any }) {
            return { ...state, ...action.payload }
        }
    }
}