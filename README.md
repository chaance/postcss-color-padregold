<div align="center">
	<img src="./padres.png" alt="San Diego Padres Friar Logo" width="151" height="115" align="center" />
	<p></p>
	<h1 align="center">PostCSS PadreGold</h1>
	<a href="https://www.npmjs.com/package/postcss-color-padregold"><img alt="npm version" src="https://img.shields.io/npm/v/postcss-color-padregold.svg" height="20"></a>
</div>

---

A PostCSS plugin for the Friar Faithful. Use the `padregold` color keyword in CSS.

```pcss
.nlwest-is-best {
	color: padregold;
}

/* becomes */

.nlwest-is-best {
	color: #ffc425;
}
```

## Credits

This plugin began as a fork of [`postcss-color-rebeccapurple`](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-color-rebeccapurple). Thanks to its [contributors](https://github.com/csstools/postcss-plugins/blob/main/plugins/postcss-color-rebeccapurple/package.json#L5) for all of your great work.

## Usage

Add [PostCSS PadreGold] to your project:

```bash
npm install postcss postcss-color-padregold --save-dev
```

Use it as a [PostCSS] plugin:

```js
// postcss.config.js
const postcss = require("postcss");
const postcssPadreGold = require("postcss-color-padregold");

postcss([postcssPadreGold()]).process(YOUR_CSS /*, processOptions */);
```
