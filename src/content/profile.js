export async function handleAvatars(request, env, user) {
    const body = request.json();
    
    if (body.type === 'upload') {
        if (request.method === 'POST') {
            const formData = await request.formData();
            const file = formData.get('file');

            if (!file || typeof file === 'string') {
                return new Response(JSON.stringify({ success: false, statustext: 'No file attached' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
            }

            if (!file.type.startsWith('image/')) {
                return new Response(JSON.stringify({ success: false, statustext: 'Only image uploads are allowed as avatars' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
            }

            const uuid = crypto.randomUUID();
            const key = 'useruploadedcontent/avatars' + uuid;
            await env.CDN.put(key, file.stream());

            return new Response(`Uploaded ${key} successfully!`);
        }

        return new Response(JSON.stringify({ success: false, statustext: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: false, statustext: 'Resource or endpoint not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
}