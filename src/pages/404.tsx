import React from 'react'
import { Button } from 'antd'
import router from 'umi/router'

export default () => {
    return (
        <div className="flex-container" style={{alignItems: 'center',justifyContent: 'center'}}>
            <img width="238" height="234" src={require('@/assets/images/404.png')} alt="404" />
            <div>
                404 Not Found 
            </div>
            <Button type="primary" onClick={() => router.push('/dashboard')}>返回首页</Button>
        </div>
    )
}