import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { IsAvailableUserDto } from './dto/isAvailable-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, role, avatar } = createUserDto;

    // Verificar si el email ya existe
    const userEmailExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userEmailExists) {
      throw new NotFoundException(`User with email ${email} already exists.`);
    }

    // Crear el nuevo usuario si no hay conflictos
    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
        avatar,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    const { name, email, password, role, avatar } = updateUserDto;

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
        role,
        avatar,
      },
    });

  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async isAvailable(isAvailableUserDto: IsAvailableUserDto) {

    const { email } = isAvailableUserDto;
    
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !user;
  }
}
