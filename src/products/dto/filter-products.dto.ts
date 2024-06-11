import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString, Min, ValidateIf } from "class-validator";

export class FilterProductsDto {
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    limit?: number;
  
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    offset?: number;
  
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    price?: number;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    price_min?: number;
  
    @ValidateIf((params) => params.minPrice)
    @IsPositive()
    @Type(() => Number)
    price_max?: number;
  
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    categoryId?: number;
}