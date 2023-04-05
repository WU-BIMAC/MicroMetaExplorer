const path = require("path");
const env = process.env.NODE_ENV;
const webpack = require("webpack");
const packageJson = require("./package.json");

/**
 * @todo
 * Fill with appropriate ones such as minify plugin
 * depending on value of 'env' & consume.
 */
var plugins = [];
var mode = env === "production" ? "production" : "development";

module.exports = {
	// Entry point to our code. This index.js (or other-name)
	// file/module should export the MicroscropyApp Component
	mode: mode,
	entry: "./src/app.js",
	output: {
		library: "MicroMetaExplorer", // Unsure if best naming convention
		libraryTarget: "umd",
		path: path.resolve("./dist"),
		filename:
			mode === "production"
				? "MicroMetaExplorer.min.js"
				: "MicroMetaExplorer.dev.js",
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							fallback: "file-loader",
							name: "[name][md5:hash].[ext]",
							outputPath: "assets/",
							publicPath: "/assets/",
						},
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: "style-loader", // creates style nodes from JS strings
					},
					{
						loader: "css-loader", // translates CSS into CommonJS
					},
					{
						loader: "less-loader", // compiles Less to CSS
					},
				],
			},
		],
	},
	resolve: {
		alias: {
			assets: path.resolve(__dirname, "assets"),
		},
	},
	externals: {
		// Things which we don't transpile and expect user of library/component to have or provide.
		react: {
			commonjs: "react",
			commonjs2: "react",
			amd: "react",
			root: "React",
		},
		"react-dom": {
			commonjs: "react-dom",
			commonjs2: "react-dom",
			amd: "react-dom",
			root: "ReactDOM",
		},
	},
	plugins: [
		new webpack.DefinePlugin({
			VERSION: JSON.stringify(packageJson.version),
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(mode),
			},
		}),
	],
};
