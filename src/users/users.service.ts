import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users=[
    {
      userId: 1,
      userEmail: 'bomin1996@gmail.com',
      password: 'bo123456789',
    },
  ];
  async findOne(userEmail: string): Promise<User | undefined> {
    return this.users.find((user) => user.userEmail === userEmail);
  }
}
