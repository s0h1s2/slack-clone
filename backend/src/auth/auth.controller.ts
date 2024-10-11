import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(): string {
    return 'Hello';
  }
}
