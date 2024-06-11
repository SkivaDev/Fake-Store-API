import { IsNumber, IsOptional, IsPositive, IsString, Min, ValidateIf } from "class-validator";

export class FilterProductsDto {
    @IsNumber()
    @IsOptional()
    limit: number;
  
    @IsNumber()
    @IsOptional()
    offset: number;
  
    @IsOptional()
    price: number;
  
    @IsOptional()
    @Min(0)
    price_min: number;
  
    @ValidateIf((params) => params.minPrice)
    @IsPositive()
    price_max: number;
  
    @IsOptional()
    @IsString()
    title: string;
  
    @IsOptional()
    @IsNumber()
    categoryId: number;
}