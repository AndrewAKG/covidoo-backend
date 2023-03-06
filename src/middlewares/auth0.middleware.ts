import { AUTH0_AUDIENCE, AUTH0_DOMAIN } from '@config';
import { RequestWithUserDetails } from '@interfaces/auth.interface';
import { NextFunction, Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { ManagementClient } from 'auth0';

export const validateAccessToken = auth({
    issuerBaseURL: `https://${AUTH0_DOMAIN}`,
    audience: AUTH0_AUDIENCE
});

export const addUserDetailsMiddleware = async (
    req: RequestWithUserDetails,
    res: Response,
    next: NextFunction
) => {
    const userId = req.auth.payload.sub;
    const client = new ManagementClient({
        token: req.auth.token,
        domain: AUTH0_DOMAIN
    });

    const userDetails = await client.getUser({ id: userId });
    let username = userDetails.email;
    if (userDetails.user_metadata?.name) {
        username = userDetails.user_metadata.name;
    }

    req.userId = userId;
    req.username = username;

    next();
};
