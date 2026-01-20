console.log(`App is running on port ${process.env.APP_PORT}`);

let healthCheckCount = 0;
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
    "/health": (req) => {
      healthCheckCount++;
      if (healthCheckCount > 5) {
        return new Response("KO", { status: 500 });
      }
      return new Response("OK", { status: 200 });
    },
  },
  hostname: "0.0.0.0",
  port: process.env.APP_PORT,
  development: {
    hmr: true,
    console: true,
  },
});
