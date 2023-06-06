module.exports = {
	"*.{js,jsx,ts,tsx}": ["eslint --cache --fix", "prettier --write"],
	"{!(package)*.json,*.code-snippets,.!{npm,browserslist}*rc.{js,cjs,mjs}}": ["prettier --write--parser json"],
	"*.json": ["prettier --write"],
	"*.vue": ["eslint --fix", "prettier --write"],
	"*.{css,scss,less,styl,html}": ["prettier --write"],
	"*.md": ["prettier --write"],
};
