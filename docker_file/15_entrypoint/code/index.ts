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
  port: 8080,
  development: {
    hmr: true,
    console: true,
  },
});
