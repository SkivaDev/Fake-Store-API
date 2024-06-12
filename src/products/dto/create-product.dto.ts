import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MaxLength(250)
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(1)
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
