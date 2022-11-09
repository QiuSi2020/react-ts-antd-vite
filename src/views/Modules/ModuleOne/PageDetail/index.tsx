import {useState, useEffect} from "react"

import {useNavigate} from 'react-router-dom'

import KeepAlive from '@/components/KeepAlive'

import {Button, Space} from 'antd'

function PageName() {

    useEffect(() => {
        
    }, [])

    const navigate = useNavigate()

    const searchRouting = () => {
        const news = {
            id: '001',
            name: '关羽'
        }
        navigate(`/searchrouting?id=${news.id}&name=${news.name}`)
    }

    const stateRouting = () => {
        const news = {
            id: '001',
            name: '关羽'
        }
        navigate(`/staterouting`, {
            // replace: false,
            state: {
                id: news.id,
                name: news.name,
            }
        })
    }

    const paramsRouting = () => {
        const news = {
            id: '001',
            name: '关羽'
        }
        navigate(`/blankview/${news.id}/${news.name}`)
    }

    return (
        <>
            <h2>带着 参数跳转 到 左侧菜单上 不存在的 详情页</h2>
            <h3>参数: id: 001, name: 关羽</h3>
            <Space wrap>
                <Button onClick={searchRouting}>search 方式(? 拼接)</Button>
                <Button onClick={stateRouting}>state 方式(隐藏参数)</Button>
                <Button onClick={paramsRouting}>params 方式(/ 拼接) 跳转到空白页</Button>
            </Space>
        </>
    )
}

export default () => KeepAlive(<PageName />)
