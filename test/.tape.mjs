import postcssTape from "./postcss-tape/dist/index.mjs";
import plugin from "postcss-color-padregold";

postcssTape(plugin)({
	basic: {
		message: "supports basic usage",
	},
	"generated-value-cases": {
		message: "supports generated test cases",
	},
	"examples/example": {
		message: "minimal example",
	},
});
