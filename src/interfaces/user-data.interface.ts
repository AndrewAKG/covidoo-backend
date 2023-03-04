export interface CreateUserDataRequest {
    userId: string;
    username: string;
    latitude: number;
    longitude: number;
    address: string;
    temperature: number;
}

export interface UserData {
    userId: string;
    username: string;
    latitude: number;
    longitude: number;
    address: string;
    temperature: number;
    timestamp: number;
}
