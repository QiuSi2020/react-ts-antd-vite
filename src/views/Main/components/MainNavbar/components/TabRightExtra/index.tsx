import {useState, useEffect, useMemo} from "react"

import {useLocation} from 'react-router-dom'
import {allRoute} from '@/routes'

import {Button, Popover, Space, message} from "antd"

import bus from '@/utils/bus'

import {useAliveController} from '@/components/KeepAlive'

type TabRightExtraProps = {
    handlePanes: Function
}

type PanesProps = {
    title: string,
    key: string
}

export default function TabRightExtra(props: TabRightExtraProps) {

    useEffect(() => {
        bus.addListener('fromMainNavbar', savePanes)
        return () => {
            bus.removeListener("fromMainNavbar", savePanes)
        }
    }, [])

    const {refreshScope} = useAliveController()

    const {pathname} = useLocation()

    const {handlePanes} = props

    const [panes, setPanes] = useState<PanesProps[]>([])// 总的 Tab栏

    const LeftTabFlag = useMemo(() => {
        const current_tab = allRoute.filter(v => v.path == pathname)[0]// 当前path的路由信息
        const panesIndex = panes.findIndex(f => f.key == current_tab.id)// 当前Tab在panes中的下标
        const newPanes = panes.filter((v, index) => index < panesIndex)// 当前Tab左侧的Tab
        return newPanes.length == 0
    },[panes, pathname])

    const RightTabFlag = useMemo(() => {
        const current_tab = allRoute.filter(v => v.path == pathname)[0]// 当前path的路由信息
        const panesIndex = panes.findIndex(f => f.key == current_tab.id)// 当前Tab在panes中的下标
        const newPanes = panes.filter((v, index) => index > panesIndex)// 当前Tab右侧的Tab
        return newPanes.length == 0
    },[panes, pathname])

    const savePanes = (panesDate: PanesProps[]) => {
        setPanes(panesDate)
    }

    const refreshCurrentTab = () => {
        refreshScope(pathname)
        message.success('刷新成功')
    }

    const closeLeftTab = () => {
        handlePanes('left')
    }

    const closeRightTab = () => {
        handlePanes('right')
    }

    const closeOtherTab = () => {
        handlePanes('other')
    }

    const buttonSize = 'small'

    return (
        <>
            <Popover 
                color='rgb(190, 200, 200)'
                content={
                    <Space direction="vertical" size="small">
                        <Button 
                            ghost 
                            size={buttonSize}
                            onClick={() => refreshCurrentTab()}
                        >刷新当前标签页</Button>
                        <Button 
                            ghost 
                            size={buttonSize}
                            onClick={() => closeLeftTab()}
                            // disabled={LeftTabFlag}
                            disabled={panes.length == 1 || (!LeftTabFlag && RightTabFlag) || (!RightTabFlag && LeftTabFlag)}
                        >关闭左侧标签页</Button>
                        <Button 
                            ghost 
                            size={buttonSize}
                            onClick={() => closeRightTab()}
                            // disabled={RightTabFlag}
                            disabled={panes.length == 1 || (!LeftTabFlag && RightTabFlag) || (!RightTabFlag && LeftTabFlag)}
                        >关闭右侧标签页</Button>
                        <Button 
                            ghost 
                            size={buttonSize}
                            onClick={() => closeOtherTab()}
                            // disabled={LeftTabFlag || RightTabFlag}
                            disabled={panes.length == 1}
                        >关闭其他标签页</Button>
                    </Space>
                }
                trigger='hover'
                placement="bottomLeft"
            >
                {/* <Button ghost>关闭</Button> */}
                <Button ghost>EXTRA</Button>
            </Popover>
        </>
    )
}

// const TabRightExtra:React.FC<TabRightExtraProps> = ({handlePanes}) => {

//     return (
//         <Div>
//             <Button onClick={() => handlePanes()}>Extra</Button>
//             {/* <Button>Extra</Button> */}
//         </Div>
//     )
// }

// export default TabRightExtra
