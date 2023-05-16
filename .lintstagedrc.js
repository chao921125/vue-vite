module.exports = {
	"*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
	"{!(package)*.json,*.code-snippets,.!{npm,browserslist}*rc.{js,cjs,mjs}}": ["prettier --write--parser json"],
	"package.json": ["prettier --write"],
	"*.vue": ["stylelint --fix", "eslint --fix", "prettier --write"],
	"*.{css,scss,less,styl,html}": ["stylelint --fix", "prettier --write"],
	"*.md": ["prettier --write"],
	"*.js": "eslint --cache --fix",
	"*.css": "stylelint --fix",
};
