import type { MiddlewareHandler } from "hono";

export const roleMiddleware = (
  role: string
): MiddlewareHandler => {
  return async (c, next) => {
    const payload = c.get("jwtPayload") as {
        id : number,
        email : string,
        name : string,
        role : string
    };

    if (!payload) {
      return c.json(
        { message: "bhai sahab role kidhr hai aapka kon ho aap !!" },
        401
      );
    }

    if (payload.role !== role) {
      return c.json(
        { message: "bhai aap to ye nahi ker sakte !!" },
        403
      );
    }

    await next();
  };
};