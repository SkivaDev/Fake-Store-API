import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, role, avatar } = createUserDto;

    /*
    // Verificar si el nombre de usuario ya existe
    const userNameExists = await this.prisma.user.findUnique({
      where: {
        name: name,
      },
    });

    if (userNameExists) {
      throw new NotFoundException(`User with name ${name} already exists.`);
    }
    */

    // Verificar si el email ya existe
    const userEmailExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userEmailExists) {
      return new NotFoundException(`User with email ${email} already exists.`);
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
      return new NotFoundException(`User with id ${id} not found.`);
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
