
// @ts-check
// Import types
/** @typedef {import("./types/typings").Options} ScriptCatWebpackOptions */
/** @typedef {import("webpack/lib/Compiler.js")} WebpackCompiler */
/** @typedef {import("webpack/lib/Compilation.js")} WebpackCompilation */
'use strict';


class ScriptCatWebpackPlugin {

	/**
	 * @param {ScriptCatWebpackOptions} [options]
	 */
	constructor(options) {
		this.options = options;
	}

	/**
	  * @param {WebpackCompiler} [compiler]
	  */
	apply(compiler) {
		compiler.hooks.emit.tap("ScriptCatWebpackPlugin", (compilation, compilationParams) => {
			if (compilation.assets[this.options.file]) {
				/**
				 * @var {{ [key: string]: string[] | string }} metadata
				 */
				let metadata = {};
				metadata["name"] = this.options.name;
				metadata["namespace"] = this.options.namespace;
				metadata["description"] = this.options.description;
				metadata["version"] = this.options.version;
				metadata["author"] = this.options.author;
				Object.assign(metadata, this.options.metadata);
				let content = this.align(metadata) + compilation.assets[this.options.file].source();
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
			let start = "// @" + key;
			for (let i = 0; i < maxLen - key.length; i++) {
				start += " "
			}
			if (typeof metadata[key] === "object") {
				for (let i = 0; i < metadata[key].length; i++) {
					header += start + metadata[key][i] + "\n";
				}
			} else {
				header += start + metadata[key] + "\n";
			}
		}
		header += "// ==/UserScript==\n\n"
		return header;
	}

}

module.exports = ScriptCatWebpackPlugin
