export interface CreateUserDataRequest {
    userId: string;
    username: string;
    latitude: number;
    longitude: number;
    oxygenLevel: number;
    temperature: number;
}

export interface UserData {
    userId: string;
    username: string;
    latitude: number;
    longitude: number;
    oxygenLevel: number;
    temperature: number;
    timestamp: number;
}
