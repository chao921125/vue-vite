import fs from "node:fs";

export const imgToBase = (limit = 4096) => {
  return {
    name: "vite-img-to-base64",
    async transform(_, id) {
      if (!/\.(png|jpg|jpeg|gif)$/.test(id)) return id;
      const stat = await fs.promises.stat(id);
      if (stat.size > limit) return id;
      const buffer = await fs.promises.readFile(id);
      const base64 = buffer.toString("base64");
      const dataUrl = `data:image/${id.split(".").pop()};base64,${base64}`;
      return {
        code: `export default ${JSON.stringify(dataUrl)}`,
      };
    },
  };
};

export default {};
