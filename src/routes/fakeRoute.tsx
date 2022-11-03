type MenuType = {
    id: string,
    title: string,
    icon: string,
    pathUrl: string,
    childList: null | MenuType[]
}

const fakeRouteOne: MenuType[] = [
    {
        id: '100',
        title: '菜单一',
        icon: 'HomeOutlined',
        pathUrl: '',
        childList: [
            {
                id: '01',
                title: '项目介绍',
                icon: 'MehOutlined',
                pathUrl: 'ModuleOne/Introduce',
                childList: null
            },
        ]
    },
    {
        id: '101',
        title: '菜单二',
        icon: 'HomeOutlined',
        pathUrl: '',
        childList: [
            {
                id: '1',
                title: '页面一',
                icon: 'MehOutlined',
                pathUrl: 'ModuleOne/PageOne',
                childList: null
            },
            {
                id: '2',
                title: '页面二',
                icon: 'MehOutlined',
                pathUrl: 'ModuleOne/PageTwo',
                childList: null
            },
            {
                id: '3',
                title: '页面三',
                icon: 'MehOutlined',
                pathUrl: 'ModuleOne/PageThree',
                childList: null
            },
            {
                id: '104',
                title: '嵌套多层菜单',
                icon: 'HomeOutlined',
                pathUrl: '',
                childList: [
                    {
                        id: '04',
                        title: '参数跳转',
                        icon: 'MehOutlined',
                        pathUrl: 'ModuleOne/PageDetail',
                        childList: null
                    },
                    {
                        id: '001',
                        title: 'Redux练习',
                        icon: 'MehOutlined',
                        pathUrl: 'ModuleOne/ReduxView',
                        childList: null
                    },
                ]
            }
        ]
    },
]

const fakeRouteTwo: MenuType[] = [
    {
        id: '101',
        title: '菜单一',
        icon: 'HomeOutlined',
        pathUrl: '',
        childList: [
            {
                id: '001',
                title: 'Redux练习',
                icon: 'MehOutlined',
                pathUrl: 'ModuleOne/ReduxView',
                childList: null
            },
        ]
    },
    {
        id: '102',
        title: '菜单二',
        icon: 'HomeOutlined',
        pathUrl: '',
        childList: [
            {
                id: '04',
                title: '参数跳转',
                icon: 'MehOutlined',
                pathUrl: 'ModuleOne/PageDetail',
                childList: null
            },
        ]
    },
    {
        id: '103',
        title: '菜单二',
        icon: 'HomeOutlined',
        pathUrl: '',
        childList: [
            {
                id: '3',
                title: '页面三',
                icon: 'MehOutlined',
                pathUrl: 'ModuleOne/PageThree',
                childList: null
            },
        ]
    },
]

export {fakeRouteOne, fakeRouteTwo}
