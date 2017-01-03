const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss       = require('precss');
const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier');

console.log(process.env.NODE_ENV);

module.exports = {
    entry: './src/ts/App.ts',
    output: {
        path : "htdocs",
        filename: 'js/bundle.js',
    },
    // Turn on sourcemaps
    devtool: '#source-map',
    cache:true,
    resolve: {
        extensions: [ '.css',   '.ts', '.js' , '.tsx' , 'png' , 'jpg' , 'jpeg' , 'gif', 'svg'],
        alias: {
            //'react': 'react-lite',
            //'react-dom': 'react-lite'
        },
        modules : ['node_modules'] /*  追加 */
    },
    // Add minification
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new WebpackNotifierPlugin({alwaysNotify: true})
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
                            compiler: 'ntypescript'
                        },
                    }
                ],
                exclude: /node_modules/,
            },

            {
                test: /\.css$/,
                use : [
                    {loader:"style-loader"},
                    {loader:"css-loader?modules&localIdentName=[local]---[hash:base64:10]&sourceMap&importLoaders=1"},
                    {loader:"postcss-loader"}
                ]
            },

        ]
    },
    externals: {
        //CDNで読み込むやつはここで除外しとくと良い
    },
    /*
    postcss: function () {
        return [autoprefixer, precss];
    },
    */
}
