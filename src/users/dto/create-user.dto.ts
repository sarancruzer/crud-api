import { OmitType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  mobileNumber: string;

  password: string;
}

export class UserListDto extends OmitType(CreateUserDto, [
  'password',
] as const) {}

export class UserDto extends OmitType(CreateUserDto, ['password'] as const) {}
