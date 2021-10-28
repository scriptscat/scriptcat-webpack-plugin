import { Compiler, Compilation } from "webpack";

export = ScriptCatWebpackPlugin;

declare class ScriptCatWebpackPlugin {
	constructor(options?: ScriptCatWebpackPlugin.Options);

	/**
	 * Options after html-webpack-plugin has been initialized with defaults
	 */
	options?: ScriptCatWebpackPlugin.Options;

	apply(compiler: Compiler): void;
}

declare namespace ScriptCatWebpackPlugin {
	interface Options {

	}
}