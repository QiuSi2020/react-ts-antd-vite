import {useState, useEffect, useRef, useMemo} from "react"

import {useNavigate, useLocation} from 'react-router-dom'

import {Button, Space} from 'antd'

import KeepAlive, {useActivate, useUnactivate} from '@/components/KeepAlive'

function PageOne() {

    // hook -> state -> compute、watch -> function

    useEffect(() => {
        console.log('页面一 挂载了')
        return () => {
            console.log('页面一 卸载了')
        }
    }, [])

    useActivate(() => {
        // alert('页面一 激活')
        console.log('页面一 激活')
    })

    useUnactivate(() => {
        // alert('页面一 失活')
        console.log('页面一 失活')
    })

    const navigate = useNavigate()

    const [num, setNum] = useState(0)
    // 设置一个实时更新的值(useState 设置的值会有异步问题)
    const titleOne: {current?: number} = useRef(0)// 设置个默认值

    const updateNum = useMemo(() => {
        return num + 10
    },[num])

    const goPageTwo = () => {
        // debugger
        navigate('/pagetwo')
    }

    const toPageFour = () => {
        navigate('/pagefour')
    }

    const numAdd = () => {
        setNum(num+1)
        titleOne.current = num+1
    }

    const hoverContent = <h2>拥有keep alive属性</h2>

    return (
        <>
            <h1>页面一</h1>
            {hoverContent}
            <Space size='middle' direction='vertical'>
                <Space size='middle'>
                    <Button onClick={() => goPageTwo()}>到页面二</Button>
                    <Button onClick={() => toPageFour()}>到菜单项不存在的页面四</Button>
                </Space>
                <Space size='middle'>
                    <Button onClick={() => numAdd()}>+1</Button>
                    <span>异步更新的值: {num}</span>
                    <span>同步更新的值: {titleOne.current}</span>
                    <span>计算属性(+10): {updateNum}</span>
                </Space>
            </Space>
            <br />
            <br />
            <div style={{
                // width: '200vw',
                height: '200vh',
                backgroundColor: '#e6e6e6',
            }}>超出高度出现自定义滚动条(200vh)</div>
        </>
    )
}

export default () => KeepAlive(<PageOne />)
