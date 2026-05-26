import { Request, Response, NextFunction } from "express";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ status: "error", message: "Token no proporcionado" });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    const { decode } = await import("@auth/core/jwt");
    const possibleSalts = ["__Secure-authjs.session-token", "authjs.session-token"];

    let payload: Record<string, unknown> | null = null;
    for (const salt of possibleSalts) {
      try { payload = await decode({ token, secret: process.env.AUTH_SECRET!, salt }); } catch { continue; }
      if (payload) break;
    }

    if (!payload) {
      res.status(401).json({ status: "error", message: "Token inválido o expirado" });
      return;
    }

    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ status: "error", message: "Token inválido o expirado" });
  }
}
