import { CreateUserDto, UserDto, UserListDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export const USER_SERVICE = 'USER SERVICE';

export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
}

export interface IUserService {
  create(createUserDto: CreateUserDto);

  findAll(): Promise<UserListDto[]>;

  findOne(id: string): Promise<UserDto | undefined>;

  update(id: string, updateUserDto: UpdateUserDto);

  remove(id: string);
}
