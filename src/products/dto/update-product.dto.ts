import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Max, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    @MinLength(3)
    @IsOptional()
    name?: string;

    @IsString()
    @MaxLength(250)
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(1)
    @Max(10000)
    @IsOptional()
    price?: number;

    @IsString({ each: true })
    @IsUrl({}, { each: true })
    @IsNotEmpty({ each: true })
    @IsOptional()
    images?: string[];

    @IsNumber()
    @IsOptional()
    categoryId?: number;
}
