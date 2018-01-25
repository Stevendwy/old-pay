var webpack = require('webpack')

module.exports = {
    entry: "./js/index.js",
    output: {
        path: __dirname + "/js/",
        filename: "userpay.js"
    },
    
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                	//下面插件去掉关键字default等的引号问题，IE8处理
//                  plugins: ["transform-es3-property-literals", "transform-es3-member-expression-literals"],
                    presets: ["es2015", "react"]
                }
            }
        ]
    },
    
    plugins:[
   	 new webpack.DefinePlugin({
   	   'process.env':{
   	     NODE_ENV: JSON.stringify('production')
   	   }
   	 }),
   	 new webpack.optimize.UglifyJsPlugin()
   	]
}