export interface CreateUserDataRequest {
    userId: string;
    latitude: number;
    longitude: number;
    address: string;
    temperature: number;
}

export interface UserData {
    userId: string;
    latitude: number;
    longitude: number;
    address: string;
    temperature: number;
    date: string;
    timestamp: number;
}
