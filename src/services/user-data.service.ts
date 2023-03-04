import { HttpException } from '@exceptions/HttpException';
import { CreateUserDataRequest, UserData } from '@/interfaces/user-data.interface';
import { isEmpty } from '@utils/util';
import userDataModel from '@/models/user-data.model';
import moment from 'moment';

class UserDataService {
    public userData = userDataModel;

    public async findAllUsersData(): Promise<UserData[]> {
        const usersData: UserData[] = await this.userData.find();
        return usersData;
    }

    public async getUserDataHistory(userId: string): Promise<UserData[]> {
        if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

        const userHistory: UserData[] = await this.userData.find({ userId });
        if (!userHistory) throw new HttpException(404, 'No history found');

        return userHistory;
    }

    public async createUserData(userData: CreateUserDataRequest): Promise<UserData> {
        if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

        const userDataWithTimestamp: UserData = {
            ...userData,
            timestamp: moment().unix(),
            date: moment().format('DD-MM-YYYY')
        };

        const createUserData: UserData = await this.userData.create(userDataWithTimestamp);

        return createUserData;
    }
}

export default UserDataService;
