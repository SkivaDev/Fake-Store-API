import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    @MinLength(3)
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsString({ each: true })
    @IsUrl({}, { each: true })
    @IsNotEmpty({ each: true })
    @IsOptional()
    image?: Array<string>;

    @IsNumber()
    @IsOptional()
    categoryId?: number;
}
