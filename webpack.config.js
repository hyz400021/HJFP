var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
//var HtmlWebpackPlugin=require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: {
        bundle1: './index.jsx',
        bundle2: './components/dyjs.jsx',
        TXL:'./components/TXL.jsx',
        HYZ:'./components/HYZ.jsx'
    },
    output: {
        filename: '[name].js'
    },
    module: {
        loaders:[
            { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
            { test: /\.css$/, loader: 'style-loader!css-loader?modules' },
            { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" },

            {
                test: /\.less$/,//正则匹配拓展名为···的文件
                include: path.join(__dirname, './src/css'),//需要被加载文件的路径
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,//这个文件除外
                loader: 'html-loader'
            },{
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192' // 内联的base64的图片地址，图片要小于8k，直接的url的地址则不解析
            }
        ]
    },
    plugins: [
        new CommonsChunkPlugin('init.js'),

        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000
            //server: { baseDir: ['./build/'] }//会默认访问./build/index.html
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })

        // ,new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
    // ,externals: {
    //     'react': 'React'
    // }
};
/**
 * Created by Administrator on 2016/8/13.
 */
