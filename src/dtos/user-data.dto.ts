import { IsNumber, IsString } from 'class-validator';

export class CreateUserDataDto {
    @IsNumber()
    public latitude: number;

    @IsNumber()
    public longitude: number;

    @IsNumber()
    public oxygenLevel: number;

    @IsNumber()
    public temperature: number;
}
