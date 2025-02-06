import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    return json(
        { message: 'User logged out successfully' },
        { status: 201,
        headers: {
            'Set-Cookie': `barberjwt=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`
        }
    });
}