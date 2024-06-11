import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(private prisma:PrismaService) {}

  
  async create(createProductDto: CreateProductDto): Promise<any> {

    const { categoryId } = createProductDto;

    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    const newProduct = await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        categoryId: category.id,
      },
    })

    const images = createProductDto.images.map(async (url) => {
      const newImage = await this.prisma.image.create({
        data: {
          url,
          productId: newProduct.id,
        },
      });

      return newImage.url;
    });


    console.log(images);
    return { ...newProduct, category, images};
  }


  async findAll() {
    const products = await this.prisma.product.findMany({
      include: {
        category: true,
        images: true,
      },
    });

    return products.map((product) => {
      const { category, images, ...rest } = product;
      return {
        id: rest.id,
        name: rest.name,
        price: rest.price,
        description: rest.description,
        images: images.map((image) => JSON.stringify([image.url])),
        creationAt: rest.createdAt,
        updatedAt: rest.updatedAt,
        category: {
          id: category.id,
          name: category.name,
          image: category.image,
          creationAt: category.createdAt,
          updatedAt: category.updatedAt,
        },
      };
    });
  }

  async findOne(id: number) {
    
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        images: true,
      },
    });

    const { category, images, ...rest } = product;

    return {
      id: rest.id,
      name: rest.name,
      price: rest.price,
      description: rest.description,
      images: images.map((image) => JSON.stringify([image.url])),
      creationAt: rest.createdAt,
      updatedAt: rest.updatedAt,
      category: {
        id: category.id,
        name: category.name,
        image: category.image,
        creationAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    };
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
