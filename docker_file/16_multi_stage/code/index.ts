const port = process.env.APP_PORT || 8080;

console.log(`Server is running on port ${port}`);

Bun.serve({
  routes: {
    "/": (req) => {
      return new Response("Hello World");
    },
    "/api/users/:id": {
      GET: (req) => {
        return new Response(JSON.stringify({ id: req.params.id }));
      },
    },
    "/api/env": {
      GET: (req) => {
        return new Response(JSON.stringify({ env: process.env.ENVTYPE }));
      },
    },
  },
  port: port,
  development: {
    hmr: true,
    console: true,
  },
});
