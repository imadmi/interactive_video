import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { signeinDto } from './auth.tdo';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {


  async hashCode(code: string): Promise<string> {
    const saltRounds = 2;
    const hashedCode = await bcrypt.hash(code, saltRounds);
    return hashedCode;
  }

  async compareCode(code: string, hashedCode: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(code, hashedCode);
    return isMatch;
  }

  async create(user: signeinDto) {
    const pass = await this.hashCode(user.password);

    const userexit = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });
    if (userexit) {
      return undefined;
    }

    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: pass,
      },
    });
    return newUser;
  }

  async findsignup(body: {
    email: string;
    password: string;
  }): Promise<User | undefined | string> {
    const userexit = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (userexit) {
      const isMatch = await bcrypt.compare(body.password, userexit.password);
      if (isMatch) {
        return userexit;
      } else {
        return 'wrong password';
      }
    } else {
      return undefined;
    }
  }


}
