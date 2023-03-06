import moment from 'moment';
import mongoose, { Model, Document } from 'mongoose';
import request from 'supertest';
import App from '../app';
import { CreateUserDataDto } from '../dtos/user-data.dto';
import { UserData } from '../interfaces/user-data.interface';
import UsersDataRoute from '../routes/user-data.route';
import { RequestWithAuth } from '../interfaces/auth.interface';
import { Response, NextFunction } from 'express';

jest.mock('auth0', () => {
    return {
        ManagementClient: jest.fn().mockImplementation(() => {
            return {
                getUser: jest.fn().mockImplementation(async () => {
                    return {
                        email: 'test@test.com',
                        user_metadata: {
                            name: 'username1'
                        }
                    };
                })
            };
        })
    };
});

jest.mock('express-oauth2-jwt-bearer', () => {
    return {
        auth: jest.fn().mockImplementation(() => {
            const func = (request: RequestWithAuth, response: Response, next: NextFunction) => {
                request.auth = {
                    header: {},
                    payload: {
                        sub: 'auth0|user1'
                    },
                    token: 'accessToken'
                };
                next();
            };

            return func;
        })
    };
});

let usersDataRoute: UsersDataRoute;
let userDataModel: Model<UserData & Document>;

beforeAll(() => {
    usersDataRoute = new UsersDataRoute();
    userDataModel = usersDataRoute.userDataController.userDataService.userData;
});

describe('Testing Users Data', () => {
    describe('[GET] /users-data', () => {
        it('should return 200 for getAllUsersData if found', async () => {
            userDataModel.aggregate = jest.fn().mockReturnValue([
                {
                    _id: 'qpwoeiruty',
                    userId: 'auth0|user1',
                    username: 'username1',
                    latitude: 31.5,
                    longitude: 30.5,
                    oxygenLevel: 90,
                    temperature: 38,
                    timestamp: moment().unix()
                },
                {
                    _id: 'qpwoeirdw3ey',
                    userId: 'auth0|user2',
                    username: 'username2',
                    latitude: 32.5,
                    longitude: 31.5,
                    oxygenLevel: 97,
                    temperature: 39,
                    timestamp: moment().unix()
                }
            ]);

            (mongoose as any).connect = jest.fn();
            const app = new App([usersDataRoute]);
            return request(app.getServer()).get(`${usersDataRoute.path}`).expect(200);
        });

        it('should return 404 for getAllUsersData if not found', async () => {
            userDataModel.aggregate = jest.fn().mockReturnValue([]);

            (mongoose as any).connect = jest.fn();
            const app = new App([usersDataRoute]);
            return request(app.getServer()).get(`${usersDataRoute.path}`).expect(404);
        });
    });

    describe('[GET] /users-data/history', () => {
        it('should return 200 for getUserDataHistory if found', async () => {
            userDataModel.find = jest.fn().mockReturnValue([
                {
                    _id: 'qpwoeiruty',
                    userId: 'auth0|user1',
                    username: 'username1',
                    latitude: 31.5,
                    longitude: 30.5,
                    oxygenLevel: 90,
                    temperature: 38,
                    timestamp: moment().subtract(1, 'day').unix()
                },
                {
                    _id: 'qpwoeirdw3ey',
                    userId: 'auth0|user1',
                    username: 'username1',
                    latitude: 32.5,
                    longitude: 31.5,
                    oxygenLevel: 97,
                    temperature: 39,
                    timestamp: moment().unix()
                }
            ]);

            (mongoose as any).connect = jest.fn();
            const app = new App([usersDataRoute]);
            return request(app.getServer()).get(`${usersDataRoute.path}/history`).expect(200);
        });

        it('should return 404 for getUserDataHistory if not found', async () => {
            userDataModel.find = jest.fn().mockReturnValue([]);

            (mongoose as any).connect = jest.fn();
            const app = new App([usersDataRoute]);
            return request(app.getServer()).get(`${usersDataRoute.path}/history`).expect(404);
        });
    });

    describe('[POST] /users-data', () => {
        it('should return 201 for successful creation', async () => {
            const userData: CreateUserDataDto = {
                latitude: 32.5,
                longitude: 31.5,
                oxygenLevel: 97,
                temperature: 39
            };

            userDataModel.create = jest.fn().mockReturnValue({
                _id: '60706478aad6c9ad19a31c84',
                userId: 'auth0|user1',
                username: 'username1',
                latitude: 32.5,
                longitude: 31.5,
                oxygenLevel: 97,
                temperature: 39,
                timestamp: moment().unix()
            });

            (mongoose as any).connect = jest.fn();
            const app = new App([usersDataRoute]);
            return request(app.getServer())
                .post(`${usersDataRoute.path}`)
                .send(userData)
                .expect(201);
        });

        it('should return 400 for bad request', async () => {
            const userData = {
                latitude: '32.5',
                longitude: 31.5,
                oxygenLevel: '97',
                temperature: 39
            };

            (mongoose as any).connect = jest.fn();
            const app = new App([usersDataRoute]);
            return request(app.getServer())
                .post(`${usersDataRoute.path}`)
                .send(userData)
                .expect(400);
        });
    });
});
