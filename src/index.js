import path from 'path';
import { contentManagement } from './content/posts.js'
import { handleAvatars } from './content/profile.js'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname.startsWith('/api/')) {
      const remainder = pathname.replace('/api/', '')

      if (remainder === 'content/management') {
        return contentManagement(request, env, 'hi', 'info')
      }

      if (remainder === 'profile/avatar/upload') {
        return handleAvatars(request, env, 'null', 'upload')
      }
    }
  },
};
