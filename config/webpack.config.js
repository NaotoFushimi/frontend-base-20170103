const webpack = require('webpack');  
const autoprefixer = require('autoprefixer');
const precss       = require('precss');
const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier');

console.log(process.env.NODE_ENV);

module.exports = { 
  publicPath: './htdocs/',
  entry: './ts/App.tsx',
  output: {
    filename: './htdocs/js/bundle.js',
  },
  // Turn on sourcemaps
  devtool: '#source-map',
  cache:true,
  resolve: {
    extensions: ['' , '.css', '.webpack.js', '.web.js', '.ts', '.js' , '.tsx' , 'png' , 'jpg' , 'jpeg' , 'gif', 'svg'],
    alias: {
            //'react': 'react-lite',
            //'react-dom': 'react-lite'
    },
    moduleDirectories : ['node_modules'] /*  追加 */
  },
  // Add minification
  plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new WebpackNotifierPlugin({alwaysNotify: true})
  ],
  module: {
    loaders: [
      { test: /\.(png|woff|jpg|gif|svg)$/, loader: require.resolve("url-loader") + "?limit=10000" },
      {
        test: /\.ts(x?)$/,
        loader: 'babel-loader?presets[]=es2015!ts-loader',
        exclude: /(node_modules)/,
      },
      { test: /\.css$/, loader : "style-loader!css-loader?modules&localIdentName=[local]---[hash:base64:10]&sourceMap&importLoaders=1!postcss-loader"},
    ]
  },
  externals: {
    //CDNで読み込むやつはここで除外しとくと良い
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'react-addons-transition-group': 'React.addons.TransitionGroup',
    'react-addons-pure-render-mixin': 'React.addons.PureRenderMixin',
    'react-addons-create-fragment': 'React.addons.createFragment',
    'react-addons-update': 'React.addons.update'
  },
  postcss: function () {
    return [autoprefixer, precss];
  }
}
