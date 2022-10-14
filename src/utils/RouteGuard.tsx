import React from 'react'
import { getToken } from './auth'
import SlideMenu from '@/components/MenuSlide'
const { Redirect } = require('dva').router

interface propType {
    children?: React.ReactNode;
    currentKey?: Object
}

export default (props: propType) => {
    const isLogin = getToken()
    const route_data = props.children
    const validPage = (route_data as any).props.children.some((item: any) => item.props.path === (props.children as any).props.location.pathname)
    return (
        isLogin || (props.children as any).props.location.pathname === '/login' ?
            <div className={'flex-full'}>
                {isLogin && (props.children as any).props.location.pathname !== '/login' ? <SlideMenu currentKey={props.currentKey}/> : null}
                <div className={'flex-full'}>
                    {
                        validPage ?
                            props.children :
                            <Redirect to="/404" />
                    }
                </div>
            </div> :
            <Redirect to="/login" />
    )
}