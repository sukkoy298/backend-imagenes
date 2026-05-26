import "dotenv/config";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import { upload } from "./config/storage";
import { requireAdmin } from "./middleware/auth";
import { requireAuth } from "./middleware/requireAuth";
import emailRouter from "./routes/email";
import { MulterError } from "multer";

interface UploadResponse {
  url: string;
  status: string;
}

const app: Express = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const API_PREFIX = process.env.API_PREFIX || "";

app.use(cors());
app.use(express.json());
app.use(API_PREFIX + "/assets", express.static(path.join(__dirname, "../uploads")));
app.use(API_PREFIX + "/send-email", requireAuth, emailRouter);

app.post(API_PREFIX + "/upload", requireAdmin, (req: Request, res: Response, next: NextFunction) => {
  upload.single("file")(req, res, (err) => {
    if (err) return next(err);

    if (!req.file) {
      res.status(400).json({ url: null, status: "error", message: "No se envió ningún archivo" });
      return;
    }

    const url = `${BASE_URL}${API_PREFIX}/assets/${req.file.filename}`;
    const response: UploadResponse = { url, status: "success" };
    res.json(response);
  });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(413).json({ url: null, status: "error", message: "El archivo supera el límite de 5MB" });
      return;
    }
    res.status(400).json({ url: null, status: "error", message: err.message });
    return;
  }

  if (err.message?.includes("Solo se permiten")) {
    res.status(400).json({ url: null, status: "error", message: err.message });
    return;
  }

  res.status(500).json({ url: null, status: "error", message: "Error interno del servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${BASE_URL}`);
});

export default app;
