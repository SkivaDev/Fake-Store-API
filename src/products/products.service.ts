import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {

  constructor(private prisma:PrismaService) {}

  
  create(createProductDto: CreateProductDto) {

    const newProduct = { ...createProductDto };

    return this.prisma.product.create({
      data: {
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        categoryId: newProduct.categoryId,
        // image: {
        //   create: newProduct.image.map((url) => ({
        //     url,
        //   })),
        // },
      }
    });
  }


  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
