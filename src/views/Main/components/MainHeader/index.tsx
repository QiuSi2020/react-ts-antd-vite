import {useState} from "react"

import {useNavigate} from 'react-router-dom'

// 引入connect，用于连接UI组件与redux
import {connect} from 'react-redux'

import {Button, Popover, Space, Card, Modal} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import {Div, CardBox} from './style'

import {MyObject} from '@/types'

import bus from '@/utils/bus'

const { confirm } = Modal

function MainHeader(props: MyObject) {

    const {users} = props

    // const viewUsername = '张飞'
    const viewUsername = users.name?.substring(users.name.length-2)
    
    const navigate = useNavigate()

    const [direction, setDirection] = useState<"horizontal" | "vertical" | undefined>('vertical')

    const changeDirection = () => {
        if (direction == "horizontal") {
            setDirection("vertical")
        } else {
            setDirection("horizontal")
        }
    }

    // 退出登录
    const loginOut = () => {
        confirm({
            title: '确认退出登录?',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            cancelText: '取消',
            zIndex: 1050,
            onOk() {
                bus.emit("clearLoginInfo")
            },
            onCancel() {},
        })
    }

    return (
        <Div>
            <Popover
                // color='#8BC6EC'
                // color='#9599E2'
                color='#40a9ff'
                trigger='click'
                placement="bottomLeft"
                content={
                    <CardBox>
                        <Space 
                            size="small"
                            direction={direction}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                            }} 
                        >
                            <Card 
                                title='个人' 
                                size="small" 
                                style={{ width: 200 }}
                                extra={
                                    <a href="#" onClick={() => changeDirection()}>More</a>
                                }
                            >
                                {/* <Space 
                                    direction="vertical" 
                                    size="small"
                                    style={{ display: 'flex' }}
                                > */}
                                    <Button type="text" style={{textAlign: 'left'}} block disabled={true}>修改密码</Button>
                                    <Button type="text" style={{textAlign: 'left'}} block onClick={() => loginOut()} danger>退出登录</Button>
                                    <Button
                                        style={{textAlign: 'left'}}
                                        type="text"
                                        block
                                        onClick={() => changeDirection()}
                                    >
                                        {direction == "horizontal" ? '纵向' : '横向'}
                                        展示
                                    </Button>
                                {/* </Space> */}
                            </Card>
                            <Card 
                                title="系统" 
                                size="small" 
                                style={{ width: 200 }}
                            >
                                <Space 
                                    direction="vertical" 
                                    size="small"
                                    style={{ display: 'flex' }} 
                                >
                                    <Button block>primary</Button>
                                    <Button block>primary</Button>
                                    <Button block>primary</Button>
                                </Space>
                            </Card>
                            {/* <Card 
                                title="设置" 
                                size="small" 
                                style={{ width: 200 }}
                            >
                                <Space 
                                    direction="vertical" 
                                    size="small"
                                    style={{ display: 'flex' }} 
                                >
                                    <Button type="primary" block>primary</Button>
                                    <Button type="primary" block>primary</Button>
                                    <Button type="primary" block>primary</Button>
                                    <Button type="primary" block>primary</Button>
                                    <Button type="primary" block>primary</Button>
                                    <Button type="primary" block>primary</Button>
                                    <Button type="primary" block>primary</Button>
                                    <Button type="primary" block>primary</Button>
                                </Space>
                            </Card> */}
                        </Space>
                    </CardBox>
                }
            >
                <Button 
                    ghost 
                    size="large" 
                    shape="circle" 
                    className="head_"
                >
                    {viewUsername}
                </Button>
            </Popover>
        </Div>
    )
}

export default connect(
    (state: MyObject) => ({
        users: state.users
    }),
)(MainHeader)
