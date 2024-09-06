import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {

    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });

  }

  async delete(id: number) {
    // Verificar si la categoría existe
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: { include: { images: true } } }, // Incluir productos e imágenes
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }

    // Eliminar imágenes y productos relacionados en paralelo
    await Promise.all(
      category.products.map(async (product) => {
        // Eliminar todas las imágenes asociadas al producto
        await Promise.all(
          product.images.map((image) =>
            this.prisma.image.delete({ where: { id: image.id } }),
          ),
        );

        // Eliminar el producto después de eliminar las imágenes
        await this.prisma.product.delete({ where: { id: product.id } });
      }),
    );

    // Eliminar la categoría
    const deletedCategory = await this.prisma.category.delete({
      where: { id },
    });

    // Devolver la respuesta
    return {
      id: deletedCategory.id,
      name: deletedCategory.name,
      description: deletedCategory.description,
      image: deletedCategory.image,
      createdAt: deletedCategory.createdAt,
      updatedAt: deletedCategory.updatedAt,
    };
  }
}
