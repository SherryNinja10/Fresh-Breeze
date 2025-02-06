import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function handle({ event, resolve }) {
    const barberToken = event.cookies.get('barberjwt');
    const customerToken = event.cookies.get('customerjwt');

    if (barberToken) {
        try {
            const barber = jwt.verify(barberToken, process.env.SECRET_KEY);
            event.locals.role = 'barber';
            event.locals.user = barber;
        } catch (error) {
            console.error(error);
            event.locals.role = null;
        }
    } else if (customerToken) {
        try {
            const customer = jwt.verify(customerToken, process.env.SECRET_KEY);
            event.locals.role = 'customer';
            event.locals.user = customer;
        } catch (error) {
            console.error(error);
            event.locals.role = null;
        }
    } else {
        event.locals.role = null;
    }

    if (event.url.pathname === '/') {
        event.cookies.set('barberjwt', '', {
             path: '/',
             maxAge: 0
            });
    }

    if (event.url.pathname === '/') {
        event.cookies.set('customerjwt', '', {
            path: '/',
            maxAge: 0
        });
    }

    if (event.url.pathname === '/barber/registerlogin') {
        event.cookies.set('barberjwt', '', {
             path: '/',
             maxAge: 0
            });
    }

    if (event.url.pathname === '/customer/registerlogin') {
        event.cookies.set('customerjwt', '', {
            path: '/',
            maxAge: 0
        });
    }

    if (event.url.pathname === '/barber/main' && event.locals.role !== 'barber') {
        return new Response(null, { status: 302, headers: { location: '/' } });
    }

    if (event.url.pathname === '/customer/main' && event.locals.role !== 'customer') {
        return new Response(null, { status: 302, headers: { location: '/' } });
    }

    return await resolve(event);
}

export async function getSession({ locals }) {
    return {
        role: locals.role,
        user: locals.user
    };
}
