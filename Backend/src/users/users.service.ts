import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from 'src/likes/entities/like.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Share } from 'src/shares/entities/share.entity';
import { Blog } from 'src/blogs/entities/blog.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Share)
    private shareRepository: Repository<Share>,
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) { }

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(
    page = 1,
    limit = 10,
    search = '',
    role?: string,
  ) {
    const query = this.userRepository.createQueryBuilder('user');

    // Search
    if (search) {
      query.where( 'user.name ILIKE :search OR user.email ILIKE :search', { search: `%${search}%` },
      );
    }

    // Filter by role
    if (role) {
      query.andWhere('user.role = :role', { role });
    }

    // Pagination
    query.skip((page - 1) * limit).take(limit);

    // Latest first
    query.orderBy('user.createdAt', 'DESC');

    const [users, total] = await query.getManyAndCount();

    return {
      success: true,
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: number) {
    const user = this.userRepository.findOneBy({});
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new Error('User not found');
    }
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    return await this.userRepository.remove(user);
  }

  async findData(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }

    const [likes, comments, shares, blogs] = await Promise.all([
      this.likeRepository.find({
        where: { user: { id } },
        relations: { blog: true }
      }),
      this.commentRepository.find({
        where: { user: { id } },
        relations: { blog: true },
      }),
      this.shareRepository.find({
        where: { user: { id } },
        relations: { blog: true }
      }),
      this.blogRepository.find({
        where: { author: { id } },
        relations: {
          likes: true,
          comments: true,
          shares: true,
        },
      }),
    ]);
    return { 
      user, 
      likes, 
      comments, 
      shares, 
      blogs 
    };
  }
}

