import { HttpException } from '@exceptions/HttpException';
import { CreateUserDataRequest, UserData } from '@interfaces/user-data.interface';
import { isEmpty } from '@utils/util';
import userDataModel from '@models/user-data.model';
import moment from 'moment';

class UserDataService {
    public userData = userDataModel;

    public async getAllUsersData(): Promise<UserData[]> {
        const usersData: UserData[] = await this.userData.aggregate([
            {
                $group: {
                    _id: '$userId',
                    latitude: { $last: '$latitude' },
                    longitude: { $last: '$longitude' },
                    temperature: { $last: '$temperature' },
                    username: { $last: '$username' },
                    timestamp: { $last: '$timestamp' }
                }
            },
            {
                $project: {
                    userId: '$_id',
                    latitude: '$latitude',
                    longitude: '$longitude',
                    temperature: '$temperature',
                    username: '$username',
                    timestamp: '$timestamp'
                }
            },
            {
                $sort: {
                    timestamp: -1
                }
            }
        ]);

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
            timestamp: moment().unix()
        };

        const createUserData: UserData = await this.userData.create(userDataWithTimestamp);

        return createUserData;
    }
}

export default UserDataService;
