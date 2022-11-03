import React, {useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

import {firstPath} from '@/routes'

import { Button, Result } from 'antd'
import { HomeOutlined, RollbackOutlined } from "@ant-design/icons"

const NotFound: React.FC = () => {

    // useEffect(() => {
    //     console.log('pathname', pathname)
    // }, [])

    const navigate = useNavigate()
    
    const {pathname} = useLocation()

    const toFirstView = () => {
        const path = firstPath ? firstPath : '/'
        navigate(path)
    }

    const goBack = () => {
        navigate(-1)
    }

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <>
                        <Button type="primary" size="large" onClick={() => toFirstView()}><HomeOutlined />首 页</Button>
                        <Button type="primary" size="large" onClick={() => goBack()}>返 回<RollbackOutlined /></Button>
                    </>
                }
            />
        </div>
    )
}

export default NotFound
