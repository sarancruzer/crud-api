import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserDto, UserDto, UserListDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUserService } from './interface/user.interface';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const errors = await validate(createUserDto); // Validate Fileds
    if (errors.length > 0) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }

    const { email } = createUserDto;
    const isExistUser = await this.userRepository.findOneBy({ email });
    if (isExistUser) {
      throw new HttpException(
        'Your email already exists!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = new User();
    const newUserValue = Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUserValue);
  }

  async findAll(): Promise<UserListDto[]> {
    const users = await this.userRepository.find();
    const usersData = plainToInstance(UserListDto, users);
    return usersData;
  }

  async findOne(id: string): Promise<UserDto | undefined> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        { message: 'User not found!' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const userData = plainToInstance(UserDto, user);
    return userData;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const errors = await validate(updateUserDto);
    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        { message: 'User not found!', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const updateUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(updateUser);
  }

  async remove(id: string) {
    const deleteResponse = await this.userRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new HttpException(
        { message: 'User not found!', deleteResponse },
        HttpStatus.BAD_REQUEST,
      );
    }
    return 'User deleted successfully';
  }
}
