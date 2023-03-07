import { Routes } from '@interfaces/routes.interface';
import { NextFunction, Request, Response, Router } from 'express';

class IndexRoute implements Routes {
    public path = '/';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json({ message: 'success' });
        });
    }
}

export default IndexRoute;
