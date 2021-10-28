
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

	}

	/**
	  * @param {WebpackCompiler} [compiler]
	  */
	apply(compiler) {
		compiler.hooks.compilation.tap("ScriptCatWebpackPlugin", (compilation, compilationParams) => {

		});
	}

}