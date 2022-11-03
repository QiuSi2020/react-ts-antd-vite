import React, {useEffect} from 'react'
import {useNavigate, useLocation, useParams, useMatch} from 'react-router-dom'

import {Button} from 'antd'

interface MyObject {
    [key: string]: any
}

const NotFound: React.FC = () => {

    useEffect(() => {
        console.log('pathname', pathname)
        console.log('params 方式一', paramsData)
        console.log('params 方式二', paramsData_.params)
    }, [])

    const navigate = useNavigate()
    
    const {pathname} = useLocation()

    // 取参方式一
    const paramsData: MyObject = useParams()
    
    // 取参方式二，通过 .params 读取
    // 本页路径，还有占位的标识(如id)
    const paramsData_: any = useMatch('/blankview/:id/:title')

    const goBack = () => {
        navigate(-1)
    }

    return (
        <>
            <h1>params 方式传参</h1>
            <h2>接收到的值：</h2>
            <h3>ID: {paramsData.id}</h3>
            <h3>名称: {paramsData.name}</h3>
            <Button type="primary" size="large" onClick={() => goBack()}>返 回</Button>
            <br />
            <br />
            <br />
            <h3>此方式会改变平常的 pathname 格式</h3>
            <h3>如: '/blankview'的, 变成了: '/blankview/001/%E5%85%B3%E7%BE%BD'</h3>
            <h3>为了识别出正确pathname,目前想到的是</h3>
            <h3>在 pathname 加上截断标识符，表明 pathname 在标识符后结束</h3>
            <h3>标识符可以是几个符合组成(+-+-+-), 或一串数字(1234567890)</h3>
            <h3>如将 '/blankview' , 写成 '/blankview+-+-+-'</h3>
            <h3>当遇到 '/blankview+-+-+-/001/%E5%85%B3%E7%BE%BD' </h3>
            <h3>以标识 '+-+-+-' 解析出正确的path, 即 '/blankview+-+-+-'</h3>
        </>
    )
}

export default NotFound
