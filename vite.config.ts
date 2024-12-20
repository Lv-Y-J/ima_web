import { defineConfig, loadEnv } from "vite"
import { fileURLToPath, URL } from "node:url"
import UnoCSS from "unocss/vite"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import path from "path"
import { viteMockServe } from "vite-plugin-mock"
import vue from "@vitejs/plugin-vue"
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  //拿到配置的环境变量
  const env = loadEnv(mode, process.cwd())
  return {
    base: "./",
    plugins: [
      vue(),
      UnoCSS(),
      // ...
      AutoImport({
        resolvers: [
          ElementPlusResolver(), // 自动导入图标组件
        ],
      }),
      //mock
      viteMockServe({
        mockPath: "./src/mock",
        // localEnabled: true,
      }),
      // 主题定制
      Components({
        resolvers: [ElementPlusResolver({ importStyle: "sass" })],
        // 指定自定义组件位置(默认:src/components)自动注册全局组件
        dirs: [
          "src/components/ElementPlus_components/",
          "src/components/",
          "src/**/components",
        ],
        // 生成components.d.ts
        dts: false,
        deep: true,
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/svgs")],
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      //const filePath = fileURLToPath(new URL('plopfile.js', import.meta.url));
      // 这段代码的作用是获取当前文件所在目录下的plopfile.js文件的绝对路径。这里是逐步解释：

      // import.meta.url: 这是ES Modules中的一个元属性，它提供了当前模块的绝对URL。
      // 在Node.js环境中，当你在一个模块文件中访问import.meta.url时，它会返回该模块文件的文件系统路径转换成的URL格式。

      // new URL()构造函数用于创建一个新的URL对象。这里它接收两个参数：
      //   'plopfile.js': 表示你想要解析或创建的URL的路径部分，即你想要定位到的资源名称，在这个例子中是同一目录下的plopfile.js文件。
      //   import.meta.url: 作为基URL，告诉new URL()从当前模块的URL目录开始解析plopfile.js的位置。

      // 这行代码的效果是构造了一个指向当前模块同目录下plopfile.js文件的URL。
      // fileURLToPath():这是Node.js的一个实用函数，位于url模块中，用于将文件URL转换为文件系统的路径字符串。因为new URL()生成的是一个URL对象，而某些Node.js API或操作可能需要实际的文件系统路径，所以这一步是必要的转换过程。

      // 综合以上步骤，const filePath = fileURLToPath(new URL('plopfile.js', import.meta.url));
      // 这段代码的最终目的是为了动态地获取当前脚本所在目录下的plopfile.js文件的实际文件系统路径，并将其赋值给变量filePath，以便后续可以使用这个路径进行文件操作，比如读取或修改plopfile.js的内容。
    },
    //主题定制(主题覆盖)
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          // 自动导入定制化样式文件进行样式覆盖
          additionalData: `  
          @use "@/styles/element/index.scss" as *;
           @use "@/config/public.scss" as *;
          `,
        },
      },
    },
    //配置代理跨域
    server: {
      port: 9000, //自定义端口
      proxy: {
        [env.VITE_BASE_URL]: {
          target: env.VITE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  }
})
