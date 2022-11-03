import { EventEmitter } from 'events'

const bus = new EventEmitter()

export default bus

// 另一种方式

// 事件订阅
// import PubSub from 'pubsub-js'
// useEffect(() => {
//     PubSub.subscribe('MY TOPIC', (_, data) => {// (消息名(可不写，用_占位), 数据)
//         console.log('执行', data)
//     })
//     return () => {
//         PubSub.unsubscribe('MY TOPIC')
//     }
// }, [])

//触发订阅
// import PubSub from 'pubsub-js'
// <button onClick={() => {PubSub.publish('MY TOPIC', '我是携带的数据')}}>发布订阅</button>
