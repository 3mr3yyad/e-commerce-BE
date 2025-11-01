import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class ResetPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Length(5)
    @IsString()
    @IsNotEmpty()
    otp: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/, {
        message: 'Password too weak',
    })
    password: string;
}