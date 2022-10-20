import type { PluginCreator } from "postcss";
import valuesParser from "postcss-value-parser";

type PluginOptions = Record<string, never>;

const creator: PluginCreator<PluginOptions> = (
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	opts?: PluginOptions
) => {
	return {
		postcssPlugin: "postcss-color-padregold",
		Declaration(decl) {
			if (!decl.value.toLowerCase().includes("padregold")) {
				return;
			}

			let valueAST = valuesParser(decl.value);
			valueAST.walk((node) => {
				if (node.type === "word" && node.value.toLowerCase() === "padregold") {
					node.value = "#ffc425";
				}
			});

			let modifiedValue = String(valueAST);
			if (modifiedValue === decl.value) {
				return;
			}

			// Insert the new value before the current value, then remove the current
			decl.cloneBefore({ value: modifiedValue });
			decl.remove();
		},
	};
};

creator.postcss = true;

export default creator;
