console.log(`App is running on port ${process.env.APP_PORT}`);
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
  port: process.env.APP_PORT,
  development: {
    hmr: true,
    console: true,
  },
});
