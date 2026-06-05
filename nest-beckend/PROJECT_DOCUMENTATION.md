# NestJS Blog Backend Documentation

## 1. Project Overview

This is a backend application built with NestJS that implements a blog platform with user authentication, authorization, blog management, comments, likes, shares, file upload, and admin moderation.

The project is designed as a modular NestJS application using PostgreSQL via TypeORM and JWT-based authentication.

## 2. Technology Stack

- NestJS (Node.js framework)
- TypeScript
- PostgreSQL (database)
- TypeORM (ORM)
- Passport JWT (authentication)
- Cloudinary (image upload storage)
- Multer (file upload middleware)
- bcrypt (password hashing)
- class-validator / class-transformer (DTO validation)

## 3. Core Modules

### AppModule
- Entry point for the NestJS application.
- Loads configuration globally with `ConfigModule.forRoot()`.
- Configures TypeORM with `TypeOrmModule.forRootAsync`.
- Imports feature modules:
  - `UsersModule`
  - `AuthModule`
  - `BlogsModule`
  - `UploadModule`
  - `AdminModule`
  - `LikesModule`
  - `CommentsModule`
  - `SharesModule`

### AuthModule
- Responsible for user registration and login.
- Uses `JwtModule` for token signing and `JwtStrategy` for validating bearer tokens.
- Uses the `User` entity for authentication operations.

### UsersModule
- Manages user creation, retrieval, update, deletion, and user-related analytics.
- Provides aggregated user activity data via `findData(id)`.

### BlogsModule
- Manages blog posts, including creation, update, deletion, and status filtering.
- Supports blog approval workflow and detailed single-blog retrieval with relation counts.

### UploadModule
- Handles image upload operations.
- Uploads images to Cloudinary using `cloudinary.uploader.upload_stream`.
- Supports uploading new images and replacing existing images.

### AdminModule
- Admin-only management module with role-based access control.
- Provides analytics, user management, blog management, and moderation endpoints.

### LikesModule
- Provides like toggling for blogs.
- Ensures unique user-blog likes using a database unique constraint.

### CommentsModule
- Handles creation, retrieval, update, and deletion of comments.
- Associates comments with both user and blog entities.

### SharesModule
- Tracks share actions for blogs and optional share platform metadata.
- Supports share count retrieval.

## 4. Data Models and Relationships

### User Entity (`src/users/entities/user.entity.ts`)
Fields:
- `id`
- `name`
- `email`
- `password`
- `role` (`user` or `admin`)
- `isDeleted`
- `status` (`pending`, `approved`, `rejected`)
- `createdAt`, `updatedAt`

Relations:
- `blogs`: one user can author many blogs
- `likes`: one user can like many blogs
- `comments`: one user can create many comments
- `shares`: one user can share many blogs

### Blog Entity (`src/blogs/entities/blog.entity.ts`)
Fields:
- `id`
- `title`
- `content`
- `imageUrl`
- `status` (`pending`, `approved`, `rejected`)
- `createdAt`, `updatedAt`

Relations:
- `author`: each blog belongs to one user
- `likes`: one blog can receive many likes
- `comments`: one blog can receive many comments
- `shares`: one blog can receive many shares

### Comment Entity (`src/comments/entities/comment.entity.ts`)
Fields:
- `id`
- `text`
- `createdAt`, `updatedAt`

Relations:
- `blog`: each comment belongs to a blog
- `user`: each comment belongs to a user

### Like Entity (`src/likes/entities/like.entity.ts`)
Fields:
- `id`
- `createdAt`

Relations:
- `blog`: each like belongs to a blog
- `user`: each like belongs to a user

Database constraint:
- `@Unique(['blog', 'user'])` ensures a user can like the same blog only once.

### Share Entity (`src/shares/entities/share.entity.ts`)
Fields:
- `id`
- `platform` (optional)
- `createdAt`

Relations:
- `blog`: each share belongs to a blog
- `user` (optional): the user who shared the blog

Notes:
- When a user is deleted, related shares are set to `NULL` for the user relation.
- When a blog is deleted, associated likes, comments, and shares are deleted via `CASCADE`.

## 5. Security and Access Control

### Authentication
- Uses JWT tokens signed by `AuthService`.
- Token payload includes `id`, `email`, `role`, and `status`.
- `JwtStrategy` validates tokens and attaches user payload to `req.user`.
- Protected routes use `JwtAuthGuard`.

### Authorization
- `ApprovedUserGuard` ensures only users with `status === 'approved'` may create/update/delete blogs.
- `RolesGuard` protects admin routes using the `@Roles('admin')` decorator.

## 6. Request / Data Flow

### User registration and login
1. `POST /auth/register` receives `{ name, email, password }`.
2. `AuthService.register()` hashes the password and creates a `User` record.
3. A JWT token is returned.
4. `POST /auth/login` validates credentials and returns a JWT token.

### Creating a blog
1. Client sends `POST /blog` with blog data and bearer token.
2. `JwtAuthGuard` verifies the token.
3. `ApprovedUserGuard` checks the user status.
4. `BlogsService.create()` saves the blog with `author: user`.

### Reading blogs
- `GET /blog` returns approved blogs with author relation.
- `GET /blog/approved`, `/blog/pending`, `/blog/rejected` filter by status.
- `GET /blog/:id` loads blog details plus related comments, likes, and shares.

### Likes
- `POST /likes/:blogId/toggle` toggles a like for the authenticated user.
- `GET /likes/blog/:blogId` returns the like count.

### Comments
- `POST /comments/blog/:blogId` creates a comment for an authenticated user.
- `GET /comments/blog/:blogId` returns comments for a blog with user info.
- `PATCH /comments/:commentId` updates a comment if owned by the user.
- `DELETE /comments/:commentId` deletes a comment if owned by the user.

### Shares
- `POST /shares/blog/:blogId` records a share event for a blog.
- `GET /shares/blog/:blogId` returns the total shares count.

### Admin moderation
- Admin-only routes under `admin/` manage users and blogs.
- Admin analytics use counts from users and blog status categories.
- Admin can approve/reject blogs and approve/reject users.

### Image Upload
- `POST /upload` uploads an image to Cloudinary and returns `imageUrl`.
- `POST /upload/update` replaces an existing image and deletes the old Cloudinary asset.

## 7. API Endpoint Summary

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

### Blogs
- `GET /blog`
- `GET /blog/approved`
- `GET /blog/pending`
- `GET /blog/rejected`
- `GET /blog/:id`
- `GET /blog/my-blogs`
- `POST /blog`
- `PATCH /blog/:id`
- `DELETE /blog/:id`

### Comments
- `POST /comments/blog/:blogId`
- `GET /comments/blog/:blogId`
- `PATCH /comments/:commentId`
- `DELETE /comments/:commentId`

### Likes
- `POST /likes/:blogId/toggle`
- `GET /likes/blog/:blogId`

### Shares
- `POST /shares/blog/:blogId`
- `GET /shares/blog/:blogId`

### Upload
- `POST /upload`
- `POST /upload/update`

### Admin
- `GET /admin/analytics`
- `GET /admin/users`
- `DELETE /admin/users/:id`
- `PATCH /admin/users/:id/role`
- `PATCH /admin/users/:id/approve`
- `PATCH /admin/users/:id/reject`
- `GET /admin/blogs`
- `DELETE /admin/blogs/:id`
- `GET /admin/pending/blogs`
- `PATCH /admin/blogs/:id/approve`
- `GET /admin/approved/blogs`
- `PATCH /admin/blogs/:id/reject`
- `GET /admin/rejected/blogs`
- `GET /admin/blogs/search?title=...`

## 8. Notes on Database Schema

- The database is initialized automatically with `synchronize: true`.
- All entities are auto-loaded via `autoLoadEntities: true`.
- Connection details are provided by the `DATABASE_URL` environment variable.
- SSL is enabled with `rejectUnauthorized: false`.

## 9. Why the Architecture Works

- NestJS modules isolate responsibilities and make each feature independently testable.
- TypeORM entities and relations ensure a consistent relational schema between users, blogs, comments, likes, and shares.
- JWT authentication separates login from protected actions and allows stateless API sessions.
- Authorization guards enforce approval and admin-only access before the service layer is executed.
- Upload handling is separated into its own module, keeping file storage concerns isolated from blog business logic.

## 10. Practical Usage Summary

- A new user can register and login.
- Once approved by an admin, users can create blogs, comment, like, and share.
- Admins can moderate blog posts and manage user approvals.
- Uploaded blog images are stored in Cloudinary and returned as image URLs.

## 11. Important Environment Variables

- `DATABASE_URL`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

---

This document is generated from the current project layout and reflects the actual services, controllers, modules, and entity relationships present in the codebase.
