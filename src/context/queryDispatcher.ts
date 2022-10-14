import { createContext, Dispatch } from 'react'

interface context {
    state: Object,
    dispatch: Dispatch<any>
}

const QueryDispatcherContext = createContext<context>({
    state: {},
    dispatch: () => undefined
})

export default QueryDispatcherContext