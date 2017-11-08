var webpack = require('webpack')
var config = require('./webpack.base.js')
var cssLoaders = require('./css-loaders')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var page = require('./config')
var vueConfig = require('./vue-loader.config')
var path = require('path')
var vuxLoader = require('vux-loader')

config.devtool = 'source-map'
cssLoaders({ sourceMap: false, extract: false }).forEach(function (loader) {
  config.module.rules.push({
    test: new RegExp('\\.' + loader.key + '$'),
    loader: loader.value
  })
})

/*config.entry.app = ['./build/dev-client', config.entry.app]
config.entry.app = ['./build/dev-client', page.entry[page.devName]];*/
config.output.publicPath = '/'
config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: path.resolve(__dirname, '../'),
      postcss: [require('autoprefixer')({ browsers: page.browsers })]
    }
  })/*,
  new HtmlWebpackPlugin({
      filename: "index.html",
      template: page.template[page.devName],
      chunks: [page.devName],
      inject: true,
      path: '/'
  })*/
]);

for(var pathname in page.entry){
    config.entry[pathname] = ['./build/dev-client', page.entry[pathname]];
    var conf = {
        filename: pathname + ".html",
        template: page.template[pathname],
        chunks: [pathname],
        inject: true,
        hash: true,
        path: page.absolutePath ? page.absolutePath : '../'
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
}


// module.exports = config

module.exports = vuxLoader.merge(config, { plugins: ['vux-ui'], showVuxVersionInfo: false })