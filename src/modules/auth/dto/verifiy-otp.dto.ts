import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class VerifyOtpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Length(5)
    @IsString()
    @IsNotEmpty()
    otp: string;
}