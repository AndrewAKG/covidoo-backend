import { NextFunction, Request, Response } from 'express';
import { UserData, CreateUserDataRequest } from '@interfaces/user-data.interface';
import UserDataService from '@services/user-data.service';
import { RequestWithUserDetails } from '@interfaces/auth.interface';

class UsersDataController {
    public userDataService = new UserDataService();

    public getAllUsersData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllUsersData: UserData[] = await this.userDataService.getAllUsersData();

            if (findAllUsersData.length) {
                res.status(200).json({ data: findAllUsersData });
            } else {
                res.status(404).json({ message: 'No users data found' });
            }
        } catch (error) {
            next(error);
        }
    };

    public getUserDataHistory = async (
        req: RequestWithUserDetails,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId: string = req.userId;
            const findUserHistory: UserData[] = await this.userDataService.getUserDataHistory(
                userId
            );

            if (findUserHistory.length) {
                res.status(200).json({ data: findUserHistory });
            } else {
                res.status(404).json({ message: 'user has no vitals history' });
            }
        } catch (error) {
            next(error);
        }
    };

    public createUserData = async (
        req: RequestWithUserDetails,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userData: CreateUserDataRequest = {
                ...req.body,
                userId: req.userId,
                username: req.username
            };

            const createUserData: UserData = await this.userDataService.createUserData(userData);

            res.status(201).json({ data: createUserData });
        } catch (error) {
            next(error);
        }
    };
}

export default UsersDataController;
