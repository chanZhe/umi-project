import {build} from '@/api/Menu'

export interface MenuItem {
    name: string,
    children: Array<MenuItem>,
    path: string,
    meta: {
        title: string
    }
}

export interface MenuState {
    menus: Array<MenuItem>,
    collapsed: Boolean
}

export default {
    namespace: 'Menus',
    state: {
        menus: [],
        collapsed: false
    },
    effects: {
        *getMenus({},{call, put}:any) {
            try {
                const response:Array<MenuItem> = yield call(build)
                yield put({
                    type: 'setMenus',
                    payload: {menus:response}
                })
            }catch(err) {
                console.log('fail:', err)
            }
        }
    },
    reducers: {
        setMenus(state:MenuState, action:{payload:MenuState}) {
            return {...state, ...action.payload}
        }
    }
}