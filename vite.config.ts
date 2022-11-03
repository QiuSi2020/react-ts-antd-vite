import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 配置路径别名 @
import path from 'path'

// antd组件样式自动导入
import vitePluginImp from 'vite-plugin-imp'

// Vite 打包 问题 -- 打包完成后能直接打开 index.html 不需要启动服务
import { viteSingleFile } from "vite-plugin-singlefile"

// gzip静态资源压缩
import viteCompression from 'vite-plugin-compression'

// IE和旧版chrome兼容
import legacyPlugin from '@vitejs/plugin-legacy'

// vite 默认会对文件有个类似 304 的缓存效果，如果文件未修改，再次请求时会直接读取缓存，
// 但是使用 Chrome 浏览器时，在某些情况下（具体原因未知）会导致 304 缓存失败
// 使用此插件可能会使浏览器弹出一个 证书签名 的警告
// import mkcert from'vite-plugin-mkcert'

// 替换热更新，在文件更改时重新加载浏览器
import FullReload from 'vite-plugin-full-reload'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        vitePluginImp({
            libList: [{
                libName: 'antd-mobile',
                style: () => false,
                libDirectory: 'es/components',
                replaceOldImport: true
            }]
        }),
        // viteSingleFile(),
        // viteCompression({
        //     verbose: true,
        //     disable: false,
        //     threshold: 10240,
        //     algorithm: 'gzip',
        //     ext: '.gz',
        // }),
        legacyPlugin({
            targets: ['chrome 52'],// 需要兼容的目标列表，可以设置多个
            additionalLegacyPolyfills: ['regenerator-runtime/runtime']// 面向IE11时需要此插件
        }),
        // mkcert(),
        // FullReload(
        //     // **: 可能代表文件夹，*：可能代表单个文件
        //     [
        //         'src/redux/**',
        //         'src/routes/**',
        //         'src/views/Modules/**',
        //     ], 
        //     { always: false }
        // ),
    ],

    server: {
        // open: true,// 服务启动时自动在浏览器中打开应用
        // hmr: true, // 开启热更新（默认开启）
        host: '0.0.0.0',// 启用本地 localhost
        port: 8000,// 端口
        // strictPort: true,// 设置端口被占用时立即退出，不会尝试其他可用的端口
        // https: false,// 是否启用 http2
        // cors: true,// 为开发服务器配置 CORS，默认启用并允许任何源
        // force: true,// 是否强制依赖预构建

        // 跨域处理
        proxy: {
            '/api1': {// 遇见/api1前缀的请求，就会触发该代理配置
                target: 'http://localhost:5000',// 请求转发给谁
                changeOrigin: true,// 控制服务器收到的请求头中的Host的值
                rewrite: (path) => path.replace(/^\/api1/, '')// 重写请求路径(将请求路径中的‘/api1’替换为空)
            },
            // 可以配置多个代理
            /**
             * 使用方式：
             * 如 'http://localhost:3000' 向 'http://localhost:5000/data' 请求资源
             * 请求地址时书写 'http://localhost:3000/api1/data' 即可向 api1 指定域名发送请求
             * (
                * 1、比如你地址端口号是3000，请求时的地址也要写3000
                * 2、后面接上配置过的/api,即可
            * )
            */
        }
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },

    base: './',
    build: {
        outDir: "dist",
        assetsDir:'static',
        sourcemap: false, //是否构建source map 文件

        minify: "terser",
        terserOptions: {
            compress: {
                // 生产环境时移除console
                drop_console: true,
                drop_debugger: true,
            },
        },

		cssCodeSplit: false,// css代码分离
		// assetsInlineLimit: 100000000,// 超大静态资源警告门槛，单位KB (97656.25MB)
		rollupOptions: {
			inlineDynamicImports: true,
            output: { // 静态资源分类打包
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                manualChunks(id) { // 静态资源分拆打包
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        
		},
	},
    // build: {
	// 	cssCodeSplit: false,
	// 	assetsInlineLimit: 100000000,// 超大静态资源警告门槛，单位KB
	// 	rollupOptions: {
	// 		inlineDynamicImports: true,
	// 	},
	// },
    // build: {
    //     rollupOptions: {
    //         output: {
    //             chunkFileNames: 'static/js/[name]-[hash].js',
    //             entryFileNames: 'static/js/[name]-[hash].js',
    //             assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
    //         }
    //     }
    // },
    optimizeDeps: {
        // include: ['esm-dep > cjs-dep'],
        // include: [],// 预打包某些文件
        include: ['linked-dep'],
        exclude: [],// 在预构建中强制排除的依赖项
    },
})
