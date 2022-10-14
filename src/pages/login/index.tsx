import React, { useEffect } from 'react'
import { connectDva } from '@/utils/common'
import styles from './index.scss'
import { Form, Input, Button, Row, Col } from 'antd'
import { UserOutlined, LockOutlined, VerifiedOutlined } from '@ant-design/icons'
import { stateType, LoginState } from '@/models/login'
import { encrypt } from '@/utils/rsaEncrypt'
import { removeToken } from '@/utils/auth'

const Login = (props: any) => {
    const { Login, dispatch }: any = props
    return (
        <div className={["flex-full", `${styles.background}`].join(' ')}>
            <img src={require('@/assets/images/login/logo.png')} width="324" alt="" />
            <div className={styles.loginForm}>
                <LoginField {...{ Login, dispatch }} />
            </div>
        </div>
    )
}

const LoginField = (props: { Login: stateType, dispatch: any }) => {
    const { dispatch, Login } = props
    const [form] = Form.useForm()
    const onFinish = async (fieldData: LoginState) => {
        try {
            const valid = await form.validateFields();
            if (valid) {
                const password = encrypt(fieldData.password)
                const params = { ...fieldData, ...{ uuid: Login.uuid, password } }
                dispatch({
                    type: 'Login/toLogin',
                    payload: params
                })
            }
        } catch (err) {
            console.log('Failed:', err);
        }
    }

    const refreshValidImg = () => {
        dispatch({
            type: 'Login/getImage'
        })
    }

    useEffect(() => {
        removeToken()
        dispatch({
            type: 'Login/getImage'
        })
    }, [])

    return (
        <div className="login">
            <Form onFinish={onFinish} form={form}>
                <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input placeholder="请输入用户名" prefix={<UserOutlined />}></Input>
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    <Input type="password" placeholder="请输入密码" prefix={<LockOutlined />}></Input>
                </Form.Item>
                <Form.Item required name="code" rules={[{ required: true, message: '请输入验证码' }]}>
                    <Row gutter={12}>
                        <Col span={16}>
                            <Input placeholder="请输入验证码" prefix={<VerifiedOutlined />}></Input>
                        </Col>
                        <Col span={6}>
                            <img onClick={refreshValidImg} src={Login.img} alt="" />
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" block>登录</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default connectDva((state: any) => ({ ...state }))(Login)