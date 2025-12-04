import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ accessToken: string; user: User }> {
    // find & validate
    const user = this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException('Failed to authenticate', {
        description: 'Unauthorized',
      });
    }

    // generate accessToken
    const payload = { userId: user.userId, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user,
    };
  }
}
