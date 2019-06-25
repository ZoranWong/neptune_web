/** 这是用于开发环境的webpack配置文件 **/

const path = require("path"); // 获取绝对路径用
const webpack = require("webpack"); // webpack核心
const webpackbar = require("webpackbar");
const PUBLIC_PATH = "/"; // 基础路径
module.exports = {
  mode: "development",
  entry: [
    "webpack-hot-middleware/client?reload=true&path=/__webpack_hmr", // webpack热更新插件，就这么写
    "@babel/polyfill",
    "./src/index.js", // 项目入口
    "./dll/vendor.dll.js"
  ],
  output: {
    path: __dirname + "/", // 将打包好的文件放在此路径下，dev模式中，只会在内存中存在，不会真正的打包到此路径
    publicPath: PUBLIC_PATH, // 文件解析路径，index.html中引用的路径会被设置为相对于此路径
    filename: "bundle.js" // 编译后的文件名字
  },
  devtool: "inline-source-map", // 报错的时候在控制台输出哪一行报错
  context: __dirname, // entry 和 module.rules.loader 选项相对于此目录开始解析
  module: {
    rules: [
      {
        // 编译前通过eslint检查代码 (注释掉即可取消eslint检测)
        test: /\.js?$/,
        enforce: "pre",
        use: ["eslint-loader"],
        include: path.resolve(__dirname, "src")
      },
      {
        // .js .jsx用babel解析
        test: /\.js?$/,
        use: ["happypack/loader"],
        include: path.resolve(__dirname, "src")
      },
      {
        // .css 解析
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        // .scss 解析
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        // .less 解析
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          { loader: "less-loader", options: { javascriptEnabled: true } }
        ]
      },
      {
        // 文件解析
        test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
        include: path.resolve(__dirname, "src"),
        use: ["file-loader?name=assets/[name].[hash:4].[ext]"]
      },
      {
        // 图片解析
        test: /\.(png|jpg|gif)(\?|$)/,
        include: path.resolve(__dirname, "src"),
        use: ["url-loader?limit=8192&name=assets/[name].[hash:4].[ext]"]
      },
      {
        // wasm文件解析
        test: /\.wasm$/,
        include: path.resolve(__dirname, "src"),
        type: "webassembly/experimental"
      },
      {
        // xml文件解析
        test: /\.xml$/,
        include: path.resolve(__dirname, "src"),
        use: ["xml-loader"]
      }
    ]
  },
  plugins: [
    new webpackbar(),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        PUBLIC_URL: PUBLIC_PATH
      })
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      /**
           下面这个地址对应webpack.dll.config.js中生成的那个json文件的路径
           这样webpack打包时，就先直接去这个json文件中把那些预编译的资源弄进来
           **/
      manifest: require("./dll/vendor-manifest.json")
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".less", ".css", ".wasm"], //后缀名自动补全
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
};