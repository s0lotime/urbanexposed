const allowedImageTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif',
    'image/avif',
];

const allowedVideoTypes = [
    'video/mp4',
    'video/webm',
    'video/ogg'
];

export async function contentManagement(request, env, user, info) {
    if (user !== null && info !== null) {
        if (request.method === 'POST') {
            const formData = await request.formData();
            const file = formData.get("file");
            let fileType;

            if (!file || typeof file === "string") {
                return new Response(JSON.stringify({
                    success: false,
                    statustext: 'No file attached'
                }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
                return new Response(JSON.stringify({
                    success: false,
                    statustext: 'Only image or video uploads are allowed to be posted'
                }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            const MAX_IMAGE_SIZE = parseInt(env.MAX_IMAGE_SIZE);
            const MAX_VIDEO_SIZE = parseInt(env.MAX_VIDEO_SIZE);
            const fileSize = file.size;

            if (file.type.startsWith("image/")) {
                if (!allowedImageTypes.includes(file.type)) {
                    return new Response(JSON.stringify({
                        success: false,
                        statustext: 'Unsupported image type.'
                    }), {
                        status: 415,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                if (fileSize > MAX_IMAGE_SIZE) {
                    return new Response(JSON.stringify({
                        success: false,
                        statustext: 'Image too large. Max is 10MB.'
                    }), {
                        status: 413,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                fileType = 'pic';
            }

            if (file.type.startsWith("video/")) {
                if (!allowedVideoTypes.includes(file.type)) {
                    return new Response(JSON.stringify({
                        success: false,
                        statustext: 'Unsupported video type.'
                    }), {
                        status: 415,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                if (fileSize > MAX_VIDEO_SIZE) {
                    return new Response(JSON.stringify({
                        success: false,
                        statustext: 'Video too large. Max is 50MB.'
                    }), {
                        status: 413,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                fileType = 'vid';
            }

            const uuid = crypto.randomUUID();
            const key = fileType === 'pic'
                ? `useruploadedcontent/pics/${uuid}`
                : `useruploadedcontent/vids/${uuid}`;

            await env.CDN.put(key, file.stream());

            return new Response(JSON.stringify({
                success: true,
                statustext: 'Attachment uploaded'
            }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (request.method === 'PATCH') {
            return new Response(JSON.stringify({
                success: true,
                statustext: 'Request is understood, no functionality yet :|'
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (request.method === 'DELETE') {
            return new Response(JSON.stringify({
                success: true,
                statustext: 'Request is understood, no functionality yet :|'
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({
            success: false,
            statustext: 'Method not allowed'
        }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({
        success: false,
        statustext: 'Resource or endpoint not found'
    }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
    });
}
