const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/js/index.js",
    output: {
        filename: "js/main.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
             },
            {
                test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: './img',
                        useRelativePaths: true
                    },
                }, ],
            },
        ]
    },
    plugins: [
         new HtmlWebpackPlugin({
             template: './src/index.html',
             minify: {
                 removeAttributeQuotes: true,
                 collapseWhitespace: true,
                 removeComments: true
             }
         }),
         new CleanWebpackPlugin(),
         new MiniCssExtractPlugin({
             filename: '[name].css'
         }),
    ],
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(), //for css
            new TerserPlugin(), //for js, it is build-in
        ]
    },



};