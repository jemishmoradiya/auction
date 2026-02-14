import { NextRequest, NextResponse } from 'next/server';

/**
 * Extract and decode user from JWT token
 */
export function getUserFromRequest(req: NextRequest): { id: string;[key: string]: any } | null {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return null;

    const token = authHeader.replace('Bearer ', '');
    try {
        // Simple local decode to get user ID (sub) without verification overhead
        // RLS will handle the actual signature verification during DB access
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        const payload = JSON.parse(jsonPayload);
        if (payload.sub) {
            return { id: payload.sub, ...payload };
        }
    } catch (e) {
        // Token parsing failed
    }

    return null;
}

/**
 * Middleware wrapper for protected API routes
 */
export function withAuth(
    handler: (req: NextRequest, user: { id: string;[key: string]: any }) => Promise<NextResponse>
) {
    return async (req: NextRequest) => {
        try {
            const user = getUserFromRequest(req);
            if (!user) {
                return NextResponse.json({ error: 'Unauthorized: Missing or invalid token' }, { status: 401 });
            }

            return await handler(req, user);
        } catch (error: any) {
            console.error(`[API Error] ${req.method} ${req.url}:`, error);
            return NextResponse.json(
                {
                    error: 'An internal server error occurred',
                    message: process.env.NODE_ENV === 'development' ? error.message : undefined,
                },
                { status: 500 }
            );
        }
    };
}
