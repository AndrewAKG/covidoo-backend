import { NextFunction, Request, Response } from 'express';
import { UserData, CreateUserDataRequest } from '@/interfaces/user-data.interface';
import UserDataService from '@/services/user-data.service';
import { RequestWithUserId } from '@/interfaces/auth.interface';

class UsersDataController {
    public userDataService = new UserDataService();

    public getAllUsersData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllUsersData: UserData[] = await this.userDataService.findAllUsersData();

            res.status(200).json({ data: findAllUsersData });
        } catch (error) {
            next(error);
        }
    };

    public getUserDataHistory = async (
        req: RequestWithUserId,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId: string = req.userId;
            const findUserHistory: UserData[] = await this.userDataService.getUserDataHistory(
                userId
            );

            res.status(200).json({ data: findUserHistory });
        } catch (error) {
            next(error);
        }
    };

    public createUserData = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
        try {
            const userData: CreateUserDataRequest = {
                ...req.body,
                userId: req.userId
            };

            const createUserData: UserData = await this.userDataService.createUserData(userData);

            res.status(201).json({ data: createUserData });
        } catch (error) {
            next(error);
        }
    };
}

export default UsersDataController;
