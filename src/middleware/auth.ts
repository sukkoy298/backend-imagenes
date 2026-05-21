import { Request, Response, NextFunction } from "express";

let _jwtDecrypt: ((token: string, secret: Uint8Array) => Promise<{ payload: Record<string, unknown> }>) | null = null;

async function getJwtDecrypt() {
  if (!_jwtDecrypt) {
    const jose = await import("jose");
    _jwtDecrypt = jose.jwtDecrypt;
  }
  return _jwtDecrypt!;
}

const getSecret = () => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET no está configurado en las variables de entorno");
  }
  return new TextEncoder().encode(secret);
};

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
    const decrypt = await getJwtDecrypt();
    const { payload } = await decrypt(token, getSecret());

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
