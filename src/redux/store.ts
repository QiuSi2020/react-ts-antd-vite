// 引入createStore，专门用于创建redux中最为核心的store对象
import { legacy_createStore as createStore, applyMiddleware} from 'redux'

// 应对redux异步action返回值不是对象而是函数问题，用于支持异步action
import thunk from 'redux-thunk'

// 引入 redux-devtools-extension ，配合谷歌浏览器的扩展程序 Redux DevTools 使用
import {composeWithDevTools} from 'redux-devtools-extension'

// 引入汇总 Reducer
import allReducer from './reducers'

// 持久化缓存
import {persistReducer, persistStore} from 'redux-persist'

import storage from 'redux-persist/lib/storage'// localStorage 机制
// import storageSession from 'redux-persist/lib/storage/session'// storageSession 机制

const storageConfig = {
    key: 'root', // 必须有的
    storage: storage, // localStorage 缓存
    // storage: storageSession, // storageSession 缓存
    // whitelist: ['users'], // reducer 里持久化的数据, 除此外均为不持久化数据
    blacklist: [], // reducer 里不持久化的数据, 除此外均为持久化数据
}

const myPersistReducer = persistReducer(storageConfig, allReducer)

const store = createStore(myPersistReducer, composeWithDevTools(applyMiddleware(thunk)))

export const persistor = persistStore(store)

export default store

//把Reducer数据传入store
// export default createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)))
