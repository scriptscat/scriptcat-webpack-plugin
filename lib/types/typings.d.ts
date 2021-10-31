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
		file: string
		name: string
		namespace: string
		description?: string
		version?: string
		author?: string
		metadata?: { [key: string]: string[] | string }
	}

}