import {useState, useEffect, SetStateAction} from "react"
import {useNavigate} from 'react-router-dom'

// 引入connect，用于连接UI组件与redux
import {connect} from 'react-redux'
// 引入 redux/action 中对应文件里需要执行的方法
import {userInfoSave} from '@/redux/action/user_action'
import {loginOrexit} from '@/redux/action/login_action'

import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { Button, Checkbox, Form, Input, message } from "antd"
import { LockOutlined, UserOutlined } from "@ant-design/icons"

import {LoginDiv} from './style'

import {setCookie} from '@/utils/cookie'

import {getRoute} from '@/routes'

interface MyProps {
    userInfoSave: Function
    loginOrexit: Function
}

function Login(props: MyProps) {

    useEffect(() => {
        const username_ = window.localStorage.getItem('User_Name_')
        const password_ = window.localStorage.getItem('Pass_Word_')

        if (username_) {
            form.setFieldsValue({username: username_})
            setUsername(username_)
        }
        if (password_) {
            form.setFieldsValue({password: password_})
            setPassword(password_)
        }
    }, [])

    const {userInfoSave, loginOrexit} = props

    const [form]  = Form.useForm()

    const navigate = useNavigate()

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberFlag, setRememberFlag] = useState<boolean>(false)// 记住按钮

    const changeUsername = (e: { target: { value: SetStateAction<string> } }) => {
        setUsername(e.target.value)
    }

    const changePassword = (e: { target: { value: SetStateAction<string> } }) => {
        setPassword(e.target.value)
    }

    const onFinish = async () => {
        // 账号一：admin 12345 全部页面
        // 账号二：12345 12345 一个页面
        let user: {name: string, id: string} | {} = {}
        let token: string = ''
        if (username == 'admin' && password == '12345') {// 登录成功
            token = 'admin12345'
            user = {
                name: '张飞',
                id: '77777',
            }
        } else if (username == '12345' && password == '12345') {
            token = '1234512345'
            user = {
                name: '关羽',
                id: '77777',
            }
        } else {
            message.error('账号或密码不正确')
            return
        }

        // 记住账号
        if (rememberFlag) {
            window.localStorage.setItem('User_Name_', username)
            window.localStorage.setItem('Pass_Word_', password)
        } else {
        // 判断为新账号，且没勾选记住按钮
            if (username != window.localStorage.getItem('User_Name_')) {
                window.localStorage.removeItem('User_Name_')
                window.localStorage.removeItem('Pass_Word_')
            }
        }

        message.success('登录成功')
        setCookie('token', token)// 存储 token
        userInfoSave(user)// 保存用户信息
        loginOrexit(true)// 标记登录状态为 true

        await getRoute()// 更新路由再跳转
        navigate('/')
    }

    const rememberPassword = (e: CheckboxChangeEvent) => {
        setRememberFlag(e.target.checked)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo)
    }

    return (
        <LoginDiv>
            <div className="continueMoveBox">
                <div className="moveBoxChild"></div>
            </div>
            <div className="login_box">
                <div className="login_title">天道酬勤</div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: "请输入账号!" },
                        ]}
                    >
                        <Input
                            onChange={changeUsername}
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="请输入登录账号"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: "请输入密码!" },
                        ]}
                    >
                        <Input.Password
                            onChange={changePassword}
                            type="password"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="请输入登录密码"
                        />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ span: 24 }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Checkbox onChange={rememberPassword}>记住我</Checkbox>
                            {/* <a href="">忘记密码</a> */}
                            <a>忘记密码</a>
                        </div>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 24 }}>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="login_btn"
                        >登录</Button>
                    </Form.Item>
                </Form>
            </div>
            
            <div className="mark_css">
                <span>地址:广东省深圳市南山区*****</span>
                &nbsp;
                <span>电话:0755-**** ****</span>
                <br />
                <span>说明文说明文说明文说明文说明文说明文说明文说明文说明文说明文说明文说明文说明文</span>
            </div>
        </LoginDiv>
    )
}

export default connect(
    () => ({}), 
    {
        userInfoSave,
        loginOrexit
    }
)(Login)
