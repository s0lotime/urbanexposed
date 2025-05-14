import { contentManagement } from './content/posts.js'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname === '/api/content/management') {
      return contentManagement(request, env, 'pic', 'hi', 'info')
    }

    if (pathname === '/hi') {
      return new Response("hi", {
        headers: { "Content-Type": "text/html" },
      });
    }
  },
};
