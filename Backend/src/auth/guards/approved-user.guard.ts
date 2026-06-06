import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

@Injectable()
export class ApprovedUserGuard
  implements CanActivate
{
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (user.status !== "approved") {
      throw new ForbiddenException(
        "Your account is not approved yet"
      );
    }
    return true;
  }
}