import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { get } from 'http';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller('auth')
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService,
  ) {}
  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    // return req.user;
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('/helloworld')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/health')
  @ApiOperation({
    summary: 'auth health check',
    description: 'auth application 이 정상 상태인지 체크한다.',
  })
  getHealth(): string {
    return this.appService.getHealth();
  }
}
