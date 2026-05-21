import { Request, Response, NextFunction } from "express";

const ALLOWED_ROLES = ["admin", "gerente"];

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ url: null, status: "error", message: "Token no proporcionado" });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    const { decode } = await import("@auth/core/jwt");
    const payload = await decode({
      token,
      secret: process.env.AUTH_SECRET!,
      salt: "Auth.js",
    });

    if (!payload) {
      res.status(401).json({ url: null, status: "error", message: "Token inválido o expirado" });
      return;
    }

    if (!ALLOWED_ROLES.includes(payload.role as string)) {
      res.status(403).json({ url: null, status: "error", message: "Acceso denegado: se requiere rol admin o gerente" });
      return;
    }

    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ url: null, status: "error", message: "Token inválido o expirado" });
  }
}
