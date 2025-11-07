import { IsNotEmpty, IsString, Length } from "class-validator";
import { Types } from "mongoose";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @Length(2, 100)
    name: string;

    logo?: Object;
}
