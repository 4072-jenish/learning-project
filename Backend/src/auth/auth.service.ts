import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Resend } from 'resend';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async register(body: any) {
    const { name, email, password } = body;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Email already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10,
    );

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      success: true,
      message: 'Register successful',
      token,
      user: payload,
    };
  }

  async login(body: any) {
    const { email, password } = body;
    console.log( email , password );

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const isPasswordMatched =
      await bcrypt.compare(
        password,
        user.password,
      );

    if (!isPasswordMatched) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    };

    const token = this.jwtService.sign(payload);

    return {
      success: true,
      message: 'Login successful',
      token,
      user: payload,
    };
  }

  private resend = new Resend(process.env.RESEND_API_KEY);
  async sendOtpEmail(email: string) {
    const otp = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    await this.resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Blog Platform <onboarding@resend.dev>',
      to: email,
      subject: 'Verify your email',
      html: `<h1>${otp}</h1>`,
    });
    return {
      success: true,
      message: 'OTP sent successfully',
    };
  }

  async verifyOtp(body: { email: string; otp: string }) {
    const { email, otp } = body;

    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (!user.emailOtp) {
      throw new BadRequestException( 'No OTP found. Please request a new OTP.' );
    }
    if (!user.emailOtpExpiresAt) {
      throw new BadRequestException( 'OTP expiration not found.', );
    }
    if (new Date() > user.emailOtpExpiresAt) {
      throw new BadRequestException( 'OTP has expired. Please request a new OTP.' );
    }
    if (user.emailOtp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }
    user.isEmailVerified = true;
    user.emailOtp = null as any;
    user.emailOtpExpiresAt = null as any;
    await this.userRepository.save(user);
    return {
      success: true,
      message: 'Email verified successfully',
    };
  }

}