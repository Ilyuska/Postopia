import { Request } from "express";
import multer, { FileFilterCallback } from 'multer';
import fs from 'fs';

// Создаем папку uploads, если ее нет
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// //Указываем куда сохранять и под каким именем
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/');
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// Фильтруем файлы (чтоб не загрузилось ничего лишнего)
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Недопустимый тип файла! Разрешены только JPEG, PNG и PDF.') as unknown as null, false);
  }
};

// Создаем ограничение размера файла в 10МВ
const limits = { fileSize: 10 * 1024 * 1024 };

// Конфигурируем итоговый Middleware для обработки изображений
export const upload = multer({ storage, fileFilter, limits });