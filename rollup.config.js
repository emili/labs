import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import json from "@rollup/plugin-json";
import gzipPlugin from 'rollup-plugin-gzip';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import sveltePreprocess from 'svelte-preprocess';
import { brotliCompressSync } from 'zlib';
import fs from 'fs';
import path from 'path';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	moduleContext: (id) => {
		// Rollup outputs a warning if a module tries to
		// access `this` at the top level. The following modules 
		// use `this` at the top level and expect it to be the 
		// global`window` object, so we tell Rollup to set 
		// `this = window` for these modules.
		const thisAsWindowForModules = [
			"intl-format-cache/lib/index.js",
			"intl-messageformat/lib/core.js",
			"intl-messageformat/lib/formatters.js",
			"intl-messageformat-parser/lib/normalize.js",
			"intl-messageformat-parser/lib/parser.js",
			"intl-messageformat-parser/lib/skeleton.js"
		];

		if (thisAsWindowForModules.some((id_) => id.trimRight().replace(/\\/g, "/").endsWith(id_))) {
			return "window";
		}
	},
	plugins: [
		json(),
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: css => {
				css.write('public/build/bundle.css');
			},
			preprocess: sveltePreprocess()
		}),

		typescript(),

		postcss({
			config: false,
			extract: 'public/build/bundle.css',
			minimize: true,
			onExtract: (asset) => {
				// manual merge of an already existing file :(
				const { code, codeFileName } = asset();
				let dest = path.resolve(codeFileName);
				fs.appendFileSync(dest, `\n\n${code}`);
				return false;
			},
			use: {
				sass: {
					includePaths: [
						'./src/theme',
						'./node_modules'
					]
				}
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),

		gzipPlugin({
			customCompression: content =>
				brotliCompressSync(Buffer.from(content)),
			fileName: '.br',
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
