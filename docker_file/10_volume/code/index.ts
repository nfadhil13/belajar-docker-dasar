import * as fs from "node:fs/promises";

import path from "node:path";
const appPort = process.env.APP_PORT || 3000;

console.log(`App is running on port ${appPort}`);
Bun.serve({
  routes: {
    "/save-name/:name": {
      GET: async (req) => {
        const name = req.params.name;
        console.log(`Name ${name} saved`);
        await saveName(name);
        return new Response(JSON.stringify({ message: `Name ${name} saved` }));
      },
    },
  },
  port: appPort,
  development: {
    hmr: true,
    console: true,
  },
});

const saveName = async (name: string): Promise<void> => {
  const dir = "names";
  const data = `Hello ${name}`;
  await fs.mkdir(dir, { recursive: true });
  console.log(`Directory ensured: ${dir}`);

  // 2. Define the full path for the new file.
  const filePath = path.join(dir, `${name}.txt`);
  await Bun.write(`${dir}/${name}.txt`, data);
};
