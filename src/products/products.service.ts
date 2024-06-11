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
    return { 
      id: newProduct.id,
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      images: images,
      creationAt: newProduct.createdAt,
      updatedAt: newProduct.updatedAt,
      category: category
    };
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
        category: category
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
      category: category
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const { categoryId, images: newImages } = updateProductDto;

    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    const product = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        price: updateProductDto.price,
        categoryId: category.id,
      },
      include: {
        category: true,
        images: true,
      },
    });

    const { category: categoryData, images, ...rest } = product;


    let newImagesData;

    if (newImages) {
          // Delete all images
    images.map(async (image) => {
      await this.prisma.image.delete({
        where: {
          id: image.id,
        },
      });
    });

    // Create new images
    newImagesData = newImages.map(async (url) => {
      const newImage = await this.prisma.image.create({
        data: {
          url,
          productId: product.id,
        },
      });

      return newImage.url;
    });
  }


    

    return {
      id: rest.id,
      name: rest.name,
      price: rest.price,
      description: rest.description,
      images: images.map((image) => JSON.stringify([image.url])),
      creationAt: rest.createdAt,
      updatedAt: rest.updatedAt,
      category: categoryData
    };
  }

  async remove(id: number) {

    const product = await this.prisma.product.delete({
      where: {
        id,
      },
      include: {
        category: true,
        images: true,
      },
    })

    const { category, images, ...rest } = product;

    // Delete all images
    images.map(async (image) => {
      await this.prisma.image.delete({
        where: {
          id: image.id,
        },
      });
    });

    return {
      id: rest.id,
      name: rest.name,
      price: rest.price,
      description: rest.description,
      images: images.map((image) => JSON.stringify([image.url])),
      creationAt: rest.createdAt,
      updatedAt: rest.updatedAt,
      category: category
    };
  }
}
