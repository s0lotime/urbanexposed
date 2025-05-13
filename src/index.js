export default {
  async fetch(request, env, ctx) {
    return new Response("hi", {
      headers: { "Content-Type": "text/plain" },
    });
  },
};
