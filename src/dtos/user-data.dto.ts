import { IsNumber, IsString } from 'class-validator';

export class CreateUserDataDto {
    @IsNumber()
    public latitude: number;

    @IsNumber()
    public longitude: number;

    @IsString()
    public address: string;

    @IsNumber()
    public temperature: number;
}
