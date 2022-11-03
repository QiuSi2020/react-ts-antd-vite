import {useState, useEffect, useMemo} from "react"

import {useNavigate, useLocation} from 'react-router-dom'

import KeepAlive, {useActivate} from '@/components/KeepAlive'

import {PageName_Div} from './style'

import {Button} from 'antd'

function PageName() {

    // 结构：hook -> state -> compute、watch -> function

    useEffect(() => {
        console.log('挂载')
        initView()
        return () => {
            console.log('卸载')
        }
    }, [])

    useActivate(() => {
        // console.log('激活')
        initView()
    })

    const navigate = useNavigate()

    const toPageOne = () => {
        // navigate('/pageone')
    }

    // 首次进入页面，只触发useEffect，切换页面才会触发useActivate
    // 所以，需定义一个初始化函数(放置于底部)
    const initView = () => {

    }

    const content = <div>This is content.</div>

    return (
        <>
            {content}
            <PageName_Div>
                <h2>页面模板</h2>
                <Button type='primary' onClick={initView}>Button 1</Button>
                <Button type='primary' onClick={() => initView()}>Button 2</Button>

                <Button type='primary' onClick={() => {}}>Button</Button>
            </PageName_Div>
        </>
    )
}

export default () => KeepAlive(<PageName />)
