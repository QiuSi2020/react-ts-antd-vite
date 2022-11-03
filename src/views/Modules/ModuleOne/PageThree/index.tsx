import {useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import {Button, message} from 'antd'

import KeepAlive from '@/components/KeepAlive'

import {useActivate} from 'react-activation'

import {clearCookie} from '@/utils/cookie'

function PageThree() {

    // useEffect(() => {
    //     console.log('页面二挂载了')
    //     return () => {
    //         console.log('页面二卸载了')
    //     };
    // }, [])

    // useActivate(() => {
    //     console.log('页面三 激活');
    // })

    const navigate = useNavigate()

    const goPageOne = () => {
        navigate('/pageOne')
    }

    const deteleToken = () => {
        clearCookie('token')
        message.success('success')
    }

    return (
        <>
            <h1>页面三</h1>
            <span>模拟token失效<Button onClick={deteleToken}>点击token将失效</Button>, 随意切换到一个页面, 将重定向到登录页</span>
        </>
    )
}

export default () => KeepAlive(<PageThree />)
