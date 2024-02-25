import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET, URL } from '../constants';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Body() body: any, @Res() res: any) {
    try {
      const user = await this.authService.create(body);

      if (user === undefined) {
        return res.json({ succes: false, message: 'User already exists' });
      }
      const payload = { user };
      const jwt = this.jwtService.sign(payload, {
        secret: JWT_SECRET,
      });

      res.cookie('jwt', jwt);
      return res.json({ succes: true, message: 'User created' });
    } catch (e) {
      return res.json({ succes: false, message: 'User created' });
    }
  }

  @Post('login')
  async login(@Body() body: any, @Res() res: any) {
    try {
      const user: any = await this.authService.findsignup(body);
      if (user === undefined) {
        return res.json({ succes: false, message: 'Wrong user name' });
      } else if (user === 'wrong password') {
        return res.json({ succes: false, message: 'Wrong password' });
      } else if (user !== 'wrong login' && user !== undefined) {
        const payload = { user };
        const jwt = this.jwtService.sign(payload, {
          secret: JWT_SECRET,
        });
        res.cookie('jwt', jwt);

        return res.json({ succes: true, message: 'redirect to dashboard' });
      }
    } catch (e) {
      return res.json({ succes: false, message: 'User do not exist' });
    }
  }

  @Get('logout')
	async logout(@Res() res: any) {
		try {
			res.clearCookie('jwt');
			res.redirect(`${URL}:3000`);
			return 'logout';
		} catch (e) {
			console.log('Error logout: ', e);
		}
	}
}
