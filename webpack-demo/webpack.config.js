/// <binding ProjectOpened='Watch - Development' />
const webpack = require('webpack');
const path = require('path');
const htmlwebpackplugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	entry:{
		index:'./src/js/index.js',
		header: './src/js/header.js',
		footer: './src/js/footer.js',
		global: ['./src/js/header.js', './src/js/index.js', './src/js/footer.js']
	},
	output:{
		//用来存放打包后文件的输出目录 
	    path: path.resolve(__dirname, 'dist'),
		//指定资源文件引用的目录 
		publicPath:'/',
		filename:'js/[name].bundle.js'
	},
	module:{
		//加载器配置
		rules: [
		// {
		// 	test: /\.less$/,
		// 	//合并
		//     use: ExtractTextPlugin.extract({
  //           fallback: "style-loader",
  //           use: ["css-loader","less-loader"],
  //          })
		// },
		{
			test: /\.less$/,
            use: ["style-loader","css-loader","less-loader"],
		},
		{
	    	test: /\.(png|jpg)$/,
	    	use: "url-loader?limit=8192&name=img/[name][hash:8].[ext]",
	    	exclude:"/node_modules/",
	    	include:path.resolve(__dirname,'app/img')
	    },
	    {
	    	test: /\.jade$/,
	    	use: "jade-loader",
	    	exclude:"/node_modules/",
	    	include:path.resolve(__dirname,'app/tpl')
	    },
		]
	},
	//添加参数 省略扩展名
	resolve: {
	    	extensions: ['.js','.jpg','.less']
	    },
	plugins:[
		new htmlwebpackplugin({
			title:'webpack2',
			filename:'index.html',
			inject:true,
			//模板引擎
			template:path.resolve(__dirname,'app/tpl/layout.jade'),
			hash:true,
			chunks:['global']
		}),
		new htmlwebpackplugin({
			title:'header',
			filename:'pages/header.html',
			inject:true,
			hash:true,
			chunks:['header']
		}),
		new htmlwebpackplugin({
			title:'footer',
			filename:'pages/footer.html',
			inject:true,
			hash:true,
			chunks:['footer']
		}),
		// css抽取
		// new ExtractTextPlugin('./css/style.css'),
    	//添加注释,webpack内置插件
		new webpack.BannerPlugin('This file is created by zhangkaidi'),
		//生产环境中使用 压缩
		//new webpack.optimize.UglifyJsPlugin({minimize: false}),
		//如果你正在将应用拆解，打包成多个 output 的话（如果应用的某部分有大量不需要提前加载的
		//JS的话，这样做会很有用），那么在这些文件里就有可能出现重复的代码，因为在解决依赖问题
		//的时候它们是互相不干预的
	    // new webpack.optimize.CommonsChunkPlugin({
	    //   name: "commons",
	    //   filename: "js/commons.js",
	    //   minChunks: 2,
	    // }),
	  ],
}
module.exports = config;
