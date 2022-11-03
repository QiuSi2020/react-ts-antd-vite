import {Suspense} from "react"
import {Outlet} from 'react-router-dom'

import {Spin} from 'antd'

import {Div} from './style'

export default function MainContent() {
    return (
        <Div>
            <div className="content_">
                <Suspense fallback={
                    <div className="loading_">
                        <Spin size="large" />
                    </div>
                }>
                    <Outlet />
                </Suspense>
            </div>
        </Div>
    )
}