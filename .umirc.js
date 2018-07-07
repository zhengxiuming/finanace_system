export default {
  plugins: [
    'umi-plugin-dva',
    ["umi-plugin-polyfill", {extend: ["url-polyfill"]}],
    ['umi-plugin-routes', {
      exclude: [/model\.(j|t)sx?$/,
        /service\.(j|t)sx?$/,
        /models\//,
        /components\//,
        /services\//]
    }],
    ['umi-plugin-dll',
      {
        exclude: ["@babel/runtime"],
        include: ["dva", "dva/router", "dva/saga", "dva/fetch", "antd/es"],
      },]
  ],
  hashHistory: true,
}
