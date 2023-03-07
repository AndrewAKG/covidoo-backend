import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
    NODE_ENV,
    PORT,
    DB_CONNECTION_URL,
    LOG_FORMAT,
    LOG_DIR,
    ORIGIN,
    AUTH0_DOMAIN,
    AUTH0_AUDIENCE
} = process.env;
