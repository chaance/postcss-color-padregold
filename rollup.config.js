import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const presets = [
	{
		input: "src/index.ts",
		output: [
			{
				file: "dist/index.cjs",
				format: "cjs",
				sourcemap: false,
				exports: "auto",
			},
			{
				file: "dist/index.mjs",
				format: "esm",
				sourcemap: false,
				exports: "auto",
			},
		],
		external: [
			"assert",
			"fs",
			"module",
			"path",
			"url",
			"vm",
			"postcss",
			"postcss-color-padregold",
			"postcss-value-parser",
		],
		plugins: [
			typescript({ tsconfig: "./tsconfig.json" }),
			babel({
				babelHelpers: "bundled",
				exclude: "node_modules/**",
				extensions: [".js", ".ts"],
				presets: [
					[
						"@babel/preset-env",
						{
							loose: true,
							modules: false,
							targets: { node: 14 },
							useBuiltIns: false,
						},
					],
				],
			}),
			terser(),
		],
	},
];

export default presets;
