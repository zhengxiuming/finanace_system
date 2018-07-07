import {resolve} from 'path';

export default {
  publicPath: "",
  theme: './src/theme.js',
  proxy: {
    "/Admin": {
      "target": "http://test.linkpet.com.cn:6688",
      "changeOrigin": true,
      // "headers": {
      //   "host": "test.linkpet.com.cn:6688/"
      // },
      "pathRewrite": {"^/Admin": "/Admin"}
    }
  },
  alias: {
    theme: resolve(__dirname, './src/themes'),
    assets: resolve(__dirname, 'src/assets/'),
    components: resolve(__dirname, "./src/components"),
    models: resolve(__dirname, "./src/models"),
    utils: resolve(__dirname, "./src/utils"),
    services: resolve(__dirname, "./src/services")
  },
  extraBabelPlugins: [
    ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}],
  ],
}
