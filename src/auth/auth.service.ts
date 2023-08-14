import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async vaildateUser(userEmail: string, password: string): Promise<any> {
    const user = await this.userService.findOne(userEmail);
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { userEmail: user.userEmail, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
