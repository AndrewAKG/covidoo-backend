import { IsNumber, Max, Min } from 'class-validator';

export class CreateUserDataDto {
    @IsNumber()
    public latitude: number;

    @IsNumber()
    public longitude: number;

    @IsNumber()
    @Min(80)
    @Max(100)
    public oxygenLevel: number;

    @IsNumber()
    @Min(36)
    @Max(41)
    public temperature: number;
}
