import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString({ each: true })
    @IsUrl({}, { each: true })
    @IsNotEmpty({ each: true })
    images: string[];

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
}
