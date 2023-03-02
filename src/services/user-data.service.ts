import { CreateUserDataDto } from '@/dtos/user-data.dto';
import { HttpException } from '@exceptions/HttpException';
import { UserData } from '@/interfaces/user-data.interface';
import { isEmpty } from '@utils/util';
import userDataModel from '@/models/user-data.model';

class UserDataService {
    public userData = userDataModel;

    public async findAllUsersData(): Promise<UserData[]> {
        const usersData: UserData[] = await this.userData.find();
        return usersData;
    }

    public async findUserHistoryById(userId: string): Promise<UserData[]> {
        if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

        const userHistory: UserData[] = await this.userData.find({ userId });
        if (!userHistory) throw new HttpException(404, 'No history found');

        return userHistory;
    }

    public async createUserData(userData: CreateUserDataDto): Promise<UserData> {
        if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

        const createUserData: UserData = await this.userData.create(userData);

        return createUserData;
    }
}

export default UserDataService;
