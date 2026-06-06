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
}