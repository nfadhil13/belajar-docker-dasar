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
  },
  port: 8080,
  development: {
    hmr: true,
    console: true,
  },
});
