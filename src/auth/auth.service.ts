import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

export interface PayloadJwt {
  sub: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(name: string, pass: string) {
    const user = await this.usersService.findBy({ name });
    if (!this.usersService.checkPassHash(pass, user.password)) {
      throw new UnauthorizedException();
    }
    const payload: PayloadJwt = { sub: user.id, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
