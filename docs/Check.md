husky + lint-staged + commitlint 提交前校验

```shell
npm install husky -D
```

```shell
npx husky-init
```

```shell
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit'
```

```shell
npm install @commitlint/config-conventional @commitlint/cli -D
```

TS

```shell
npm install @commitlint/types -D
```

```shell
npm install lint-staged -D
```
