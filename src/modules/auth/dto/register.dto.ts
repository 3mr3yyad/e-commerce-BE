import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class RegisterDto {
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/, {
        message: 'Password too weak',
    })
    password: string;

    @IsOptional()
    @Transform(({ value }) => value ? new Date(value) : undefined)
    @IsDate()
    dob?: Date;

    @IsString()
    @MinLength(2)
    @MaxLength(200)
    @IsOptional()
    address?: string;

    @IsString()
    @Matches(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/)
    @IsOptional()
    phoneNumber?: string;
}
