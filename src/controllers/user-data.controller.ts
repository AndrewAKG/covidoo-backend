import { NextFunction, Request, Response } from 'express';
import { CreateUserDataDto } from '@/dtos/user-data.dto';
import { UserData } from '@/interfaces/user-data.interface';
import UserDataService from '@/services/user-data.service';

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

    public getUserHistoryById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.id;
            const findUserHistory: UserData[] = await this.userDataService.findUserHistoryById(
                userId
            );

            res.status(200).json({ data: findUserHistory });
        } catch (error) {
            next(error);
        }
    };

    public createUserData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: CreateUserDataDto = req.body;
            const createUserData: UserData = await this.userDataService.createUserData(userData);

            res.status(201).json({ data: createUserData });
        } catch (error) {
            next(error);
        }
    };
}

export default UsersDataController;
