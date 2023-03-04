import { Request } from 'express';
import { AuthResult } from 'express-oauth2-jwt-bearer';

export interface RequestWithAuth extends Request {
    auth: AuthResult;
}

export interface RequestWithUserDetails extends RequestWithAuth {
    userId: string;
    username: string;
}
