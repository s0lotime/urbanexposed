export async function contentManagement(request, env, user, info) {
    if (user !== null && info !== null) {
        if (request.method === 'POST') {
            const formData = await request.formData();
            const file = formData.get("file");
            let fileType;

            if (!file || typeof file === "string") {
                return new Response(JSON.stringify({ success: false, statustext: 'No file attached' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
            }

            if (!file.type.startsWith('image/') || !file.type.startsWith('video/')) {
                return new Response(JSON.stringify({ success: false, statustext: 'Only image or video uploads are allowed to be posted' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
            }

            if (file.type.startsWith('image/')) {
                fileType = 'pic'
            } else if (file.type.startsWith('video/')) {
                fileType = 'vid'
            }

            let key = 'useruploadedcontent/pics/' + uuid;
            const uuid = crypto.randomUUID();

            if (fileType === 'pic') {
                key = 'useruploadedcontent/pics/' + uuid
            } else if (fileType === 'vid') {
                key = 'useruploadedcontent/vids/' + uuid
            }

            await env.CDN.put(key, file.stream());
            return new Response(JSON.stringify({ success: true, statustext: 'Attachment uploaded' }), { status: 201, headers: { 'Content-Type': 'application/json' } });
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