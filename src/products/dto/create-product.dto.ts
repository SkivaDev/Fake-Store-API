import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Matches, MaxLength, Min, MinLength } from "class-validator";

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
    @IsUrl({protocols: ['http', 'https']}, { each: true })
    @IsNotEmpty({ each: true })
    @Matches(/(https?:\/\/.*\.(?:png|jpg))/, { each: true, message: 'Invalid image url'})
    images: string[];

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
}
