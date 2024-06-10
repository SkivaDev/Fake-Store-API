import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    // Add the fields to be updated
    @IsString()
    @MinLength(3)
    @IsOptional()
    name?: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    description?: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    image?: string;
}
