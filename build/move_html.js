// import fs from "fs";
const fs = require("fs");

const dirName = fs.readdirSync("./dist/public");

for (let i = 0; i < dirName.length; i++) {
	fs.copyFileSync(`./dist/public/${dirName[i]}`, `./dist/${dirName[i]}`);
}

fs.rmdirSync(`./dist/public`, { recursive: true });

// moveFile("./dist/public", "./dist");
//
// function moveFile(source, target) {
//
//   const dirName = fs.readdirSync(`${source}`);
//
//   for (let i = 0; i < dirName.length; i++) {
//     fs.copyFileSync(`${source}/${dirName[i]}`, `${target}/${dirName[i]}`);
//   }
//
//   fs.rmdirSync(`${source}`, { recursive: true });
// }
