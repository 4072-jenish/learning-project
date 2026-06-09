import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { IsEmail } from 'class-validator';
import { VerifyOtpDto } from './dto/verify-otp.dto';

export class SendOtpDto {
  @IsEmail()
  email!: string;
}


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: any) {
    return {
      success: true,
      user: req.user,
    };
  }

  @Post('sendOtp')
  sendOtp(@Body() body: SendOtpDto) {
    return this.authService.sendOtpEmail(body.email);
  }

  @Post('verifyOtp')
  verifyOtp(@Body() body: VerifyOtpDto) {
    return this.authService.verifyOtp(body);
  }
}