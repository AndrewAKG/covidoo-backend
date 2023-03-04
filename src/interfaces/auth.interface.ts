import { Request } from 'express';
import { AuthResult } from 'express-oauth2-jwt-bearer';

export interface RequestWithAuth extends Request {
    auth: AuthResult;
}

export interface RequestWithUserId extends RequestWithAuth {
    userId: string;
}
