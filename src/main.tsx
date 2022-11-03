import React from 'react'
import ReactDOM from 'react-dom/client'

import {BrowserRouter as Router} from 'react-router-dom'// 历史模式
// import {HashRouter as Router} from 'react-router-dom'// 哈希模式

import {Provider} from 'react-redux'// 给所有的后代容器组件传递 store 对象
import store, {persistor} from './redux/store'
import {PersistGate} from 'redux-persist/lib/integration/react'

import { AliveScope } from 'react-activation'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <React.Fragment>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <AliveScope>
                        <App />
                    </AliveScope>
                </Router>
            </PersistGate>
        </Provider>
    </React.Fragment>
)
