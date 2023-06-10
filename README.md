# scriptcat-webpack-plugin

demo:

```js
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
				match: "https://bbs.tampermonkey.net.cn/",
				background: ""
			},
		}, {
			group1: {
				configA: { // 键值为group.config,例如本键为:group1.configA
					title: "配置A", // 配置的标题
					description: "这是一个文本类型的配置", // 配置的描述内容
					type: "text", // 选项类型,如果不填写会根据数据自动识别
					default: "默认值", // 配置的默认值
					min: 2, // 文本最短2个字符
					max: 18, // 文本最长18个字符
					password: true // 设置为密码
				}
			}
		})
	],
}
```
