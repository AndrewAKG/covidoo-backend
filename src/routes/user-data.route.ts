import { Router } from 'express';
import UserDataController from '@/controllers/user-data.controller';
import { CreateUserDataDto } from '@/dtos/user-data.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Routes {
    public path = '/users-data';
    public router = Router();
    public userDataController = new UserDataController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.userDataController.getAllUsersData);
        this.router.get(`${this.path}/history`, this.userDataController.getUserHistoryById);
        this.router.post(
            `${this.path}`,
            validationMiddleware(CreateUserDataDto, 'body'),
            this.userDataController.createUserData
        );
    }
}

export default UsersRoute;
