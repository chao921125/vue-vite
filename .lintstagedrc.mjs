export default {
	"*.{ts,mts,cts,tsx,js,mjs,cjs,jsx,vue}": ["prettier --write", "eslint --cache --fix"],
	"{!(package)*.json,*.code-snippets,.!{npm,browserslist}*rc.{js,cjs,mjs}}": ["prettier --write--parser json"],
	"*.json": ["prettier --write"],
	"*.{css,scss,less,styl,html}": ["prettier --write", "stylelint --cache --fix"],
	"*.{md, mdx}": ["prettier --write"],
};
