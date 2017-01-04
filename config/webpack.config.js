const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss     = require('precss');
const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier');

const env = process.env.NODE_ENV
const isProduction = env === "production";

module.exports = {
    entry: {
        bundle : './src/ts/App.ts'
    },
    output: {
        path : "htdocs",
        filename: 'js/[name].js',
    },
    // Turn on sourcemaps
    devtool: '#source-map',
    cache:true,
    resolve: {
        extensions: [ '.webpack.js', '.web.js', '.css', '.ts', '.js' , '.tsx' , 'png' , 'jpg' , 'jpeg' , 'gif', 'svg'],
        alias: {
            //'react': 'react-lite',
            //'react-dom': 'react-lite',
        },
        modules : ['node_modules'] /*  追加 */
    },
    // Add minification
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new WebpackNotifierPlugin({alwaysNotify: true}),
    ],
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader : "babel-loader",
                    },
                    {
                        loader : "ts-loader",
                        options : {
                            compiler: 'ntypescript',
                            compilerOptions: {
                                sourceMap: !isProduction
                            }
                        }
                    }
                ],
                exclude: /node_modules/,
            },

            {
                test: /\.css$/,
                use : [
                    {loader:"style-loader"},
                    {
                        //loader:"css-loader?modules&localIdentName=[local]---[hash:base64:10]&sourceMap&importLoaders=1"},
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[local]---[hash:base64:10]",
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader:"postcss-loader",
                        options : {
                            plugins: () => [
                                autoprefixer, precss
                            ]
                        }
                    }
                ]
            },
        ]
    },
    externals: {
        //CDNで読み込むやつはここで除外しとくと良い
    },
    performance: {
        hints: false
    }
  /*
   postcss: function () {
   return [autoprefixer, precss];
   },
   */
}
