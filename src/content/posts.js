export async function contentManagement(request, env, type, user, info) {
    if (type === 'pic') {
        if (request.method === 'POST') {
            const formData = await request.formData();
            const file = formData.get("file");

            if (!file || typeof file === "string") {
                return new Response(JSON.stringify({ success: false, statustext: 'No file attached' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
            }

            const uuid = crypto.randomUUID();
            const key = 'useruploadedcontent/pics/' + uuid;
            await env.CDN.put(key, file.stream());

            return new Response(`Uploaded ${key} successfully!`);
        }

        if (request.method === 'PATCH') {
            return new Response(JSON.stringify({ success: true, statustext: 'Request is understood, no functionality yet :|' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        if (request.method === 'DELETE') {
            return new Response(JSON.stringify({ success: true, statustext: 'Request is understood, no functionality yet :|' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify({ success: false, statustext: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    if (type === 'vid') {
        if (request.method === 'POST') {
            const formData = await request.formData();
            const file = formData.get('file');

            if (!file || typeof file === 'string') {
                return new Response(JSON.stringify({ success: false, statustext: 'No file attached' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
            }

            const uuid = crypto.randomUUID();
            const key = 'useruploadedcontent/vids/' + uuid;
            await env.CDN.put(key, file.stream());
            
            return new Response(`Uploaded ${key} successfully!`)
        }

        if (request.method === 'PATCH') {
            return new Response(JSON.stringify({ success: true, statustext: 'Request is understood, no functionality yet :|' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        if (request.method === 'DELETE') {
            return new Response(JSON.stringify({ success: true, statustext: 'Request is understood, no functionality yet :|' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify({ success: false, statustext: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: false, statustext: 'Resource or endpoint not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
}