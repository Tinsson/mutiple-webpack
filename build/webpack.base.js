const path = require('path')
const webpack = require('webpack')
const page = require('./config')
const vueConfig = require('./vue-loader.config')

process.env.BROWSERSLIST = page.browsers

page.entry = {};
page.template = {};
page.buildName.split(",").forEach(function(bName){
  page.entry[bName]  = path.resolve(__dirname, '../src/view/' + bName + '/main.js');
  page.template[bName] = path.resolve(__dirname, '../src/view/' + bName + '/template.html');
});

/*page.entry = { app: path.resolve(__dirname, '../src/view/' + page.pageName + '/main.js') };
page.template = path.resolve(__dirname, '../src/view/' + page.pageName + '/template.html')*/

module.exports = {
  entry: page.entry,

  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: page.absolutePath ? page.absolutePath + '/static/' : './static/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.json', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8000,
          name: '[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin()
  ],
  node: {  // to fix css-loader add node-shim
    Buffer: false
  }
}

if (page.useVendor) {
  module.exports.plugins.push(new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require('../manifest.json')
  }))
}