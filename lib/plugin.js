
// @ts-check
// Import types
/** @typedef {import("./types/typings").Options} ScriptCatWebpackOptions */
/** @typedef {import("./types/typings").UserConfig} ScriptCatWebpackUserConfig */
/** @typedef {import("webpack/lib/Compiler.js")} WebpackCompiler */
/** @typedef {import("webpack/lib/Compilation.js")} WebpackCompilation */
'use strict';
const YAML = require('yaml')

class ScriptCatWebpackPlugin {

	/**
	 * @param {ScriptCatWebpackOptions} [options]
	 * @param {ScriptCatWebpackUserConfig} [userConfig]
	 */
	constructor(options, userConfig) {
		this.options = options;
		this.userConfig = userConfig;
	}

	/**
	  * @param {WebpackCompiler} [compiler]
	  */
	apply(compiler) {
		if (!compiler) {
			return;
		}
		compiler.hooks.emit.tap("ScriptCatWebpackPlugin", (compilation, compilationParams) => {
			if (this.options?.file && compilation.assets[this.options.file]) {
				/**
				 * @var {{ [key: string]: string[] | string }} metadata
				 */
				let metadata = {};
				metadata["name"] = this.options.name;
				metadata["namespace"] = this.options.namespace;
				metadata["description"] = this.options.description;
				metadata["version"] = this.options.version === undefined ? process.env.npm_package_version : this.options.version;
				metadata["author"] = this.options.author;
				Object.assign(metadata, this.options.metadata);
				let userConfig = "";
				if (this.userConfig) {
					userConfig = "/* ==UserConfig==\n";
					userConfig += YAML.stringify(this.userConfig);
					userConfig += " ==/UserConfig== */\n";
				}
				let content = this.align(metadata) + userConfig + compilation.assets[this.options.file].source();
				compilation.assets[this.options.file] = {
					source: () => content,
					size: () => content.length
				};
			}
		});
	}

	/**
	 * 对齐输出header
	 */
	align(metadata) {
		// 先找出最长的单词
		let maxLen = 0;
		for (const key in metadata) {
			if (key.length > maxLen) {
				maxLen = key.length;
			}
		}
		maxLen++;
		let header = "// ==UserScript==\n";
		for (const key in metadata) {
			if (metadata[key] === undefined) {
				continue;
			}
			let start = "// @" + key;
			for (let i = 0; i < maxLen - key.length; i++) {
				start += " "
			}
			if (typeof metadata[key] === "object") {
				for (let i = 0; i < metadata[key].length; i++) {
					if (metadata[key][i]) {
						header += start + metadata[key][i] + "\n";
					} else {
						header += "// @" + key + "\n";
					}
				}
			} else {
				if (metadata[key]) {
					header += start + metadata[key] + "\n";
				} else {
					header += "// @" + key + "\n";
				}
			}
		}
		header += "// ==/UserScript==\n\n"
		return header;
	}

}

module.exports = ScriptCatWebpackPlugin
