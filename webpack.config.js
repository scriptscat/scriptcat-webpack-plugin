
const ScriptCatWebpackPlugin = require("./lib/plugin");

module.exports = {
	entry: {
		app: './src/index.js',
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/dist'
	},
	plugins: [
		new ScriptCatWebpackPlugin({
			file: "app.js",
			name: "New Userscript",
			namespace: "https://bbs.tampermonkey.net.cn/",
			version: "0.1.0",
			description: "try to take over the world!",
			author: "You",
			metadata: {
				grant: [
					"GM_xmlhttpRequest",
					"GM_notification"
				],
				match: "https://bbs.tampermonkey.net.cn/"
			},
		})
	],
}