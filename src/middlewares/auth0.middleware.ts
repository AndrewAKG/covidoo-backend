import { AUTH0_AUDIENCE, AUTH0_DOMAIN } from '@/config';
import { RequestWithUserId } from '@/interfaces/auth.interface';
import { NextFunction, Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

export const validateAccessToken = auth({
    issuerBaseURL: `https://${AUTH0_DOMAIN}`,
    audience: AUTH0_AUDIENCE
});

export const addUserIdMiddleware = async (
    req: RequestWithUserId,
    res: Response,
    next: NextFunction
) => {
    req.userId = req.auth.payload.sub;
    next();
};
