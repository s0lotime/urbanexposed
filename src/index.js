export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname === '/hi') {
      return new Response("hi", {
        headers: { "Content-Type": "text/html" },
      });
    }
    
    return new Response("Not found", { status: 404 });
  },
};
