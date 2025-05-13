import home from './public/index.html'

export default {
  async fetch(request, env, ctx) {
    return new Response(home, {
      headers: { "Content-Type": "text/html" },
    });
  },
};
