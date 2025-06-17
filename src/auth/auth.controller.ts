import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { EMULoginDto } from './dto/emu-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginDto.phone,
      loginDto.password,
    );
    return this.authService.login(user);
  }

  @Post('refresh')
  @HttpCode(200)
  async refreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshToken(body.refreshToken);
  }

  @Post('emu/login')
  @HttpCode(200)
  async emergencyUnitLogin(@Body() loginDto: EMULoginDto) {
    const user = await this.authService.validateEMU(
      loginDto.username,
      loginDto.password,
    );
    return this.authService.loginEMU(user);
  }

  @Post('emu/refresh')
  @HttpCode(200)
  async emergencyUnitRefreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshTokenEMU(body.refreshToken);
  }
}
