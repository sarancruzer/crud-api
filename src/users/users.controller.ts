import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Put,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService, USER_SERVICE } from './interface/user.interface';
import { HttpExceptionFilter } from '../shared/exception-filters/http-exception.filter';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly usersService: IUserService,
  ) {}

  @Post('create')
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe())
  createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('all')
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get('one/:id')
  @UseFilters(new HttpExceptionFilter())
  getUserById(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put('update/:id')
  @UseFilters(new HttpExceptionFilter())
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('remove/:id')
  @UseFilters(new HttpExceptionFilter())
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
