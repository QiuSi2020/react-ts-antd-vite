>使用框架：React + TypeScript + Ant Design + Vite

```dash
特色：
    左侧菜单项可收缩，扩展视图
    除了右键功能，Tab栏与浏览器Tab栏功能基本一致
    开发环境、测试环境、生产环境 配置
    动态路由
    KeepAlive 功能
```

```dash
主要注意事项：
    01：首次加载时间会很长，可能需要十分钟多，但后续只要编译器不关闭，重启项目会很快
    02：新增未使用过的UI组件会使vite重新编译，类似首次加载
    03：经常会报error while updating dependencies: Error: ENOENT: no such file or directory, rename 'D:\Desktop\react-ts-vite\node_modules\.vite\deps_temp' -> 'D:\Desktop\react-ts-vite\node_modules\.vite\deps' 错误，
        方法一：将node_modules下的.vite文件夹删除，重新编译即可（如果不行就多重复试几次）
        方法二：在 node_modules\.vite 里新建一个 deps_temp 文件夹，重新编译
        方法三：在 node_modules\.vite 里新建一个 deps 文件夹，重新编译
        方法四：重新下载依赖，重新编译
```

```dash
优化功能：
    antd组件样式自动导入，详见https://blog.csdn.net/weixin_48213294/article/details/126294090
    路由懒加载
    Vite 打包 问题 -- 打包完成后能直接打开 index.html 不需要启动服务，详见https://github.com/richardtallent/vite-plugin-singlefile
    Vite 打包 问题 -- gzip静态资源压缩，详见https://blog.csdn.net/shinjie1210/article/details/122473024（包含多种Vite优化策略）
    IE和旧版chrome兼容，详见同上
    Vite 使用 @ 代替 src ，配置路径别名，TypeScript的配置，详见https://segmentfault.com/a/1190000041417219
    实现 KeepAlive 功能，详见https://github.com/CJY0208/react-activation/blob/HEAD/README_CN.md
```

```dash
尚未解决：
    vite首次打开界面加载慢问题解决，详见https://blog.csdn.net/m0_67265464/article/details/125345620
```
