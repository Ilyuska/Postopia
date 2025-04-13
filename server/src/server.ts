import express, {Express} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter';
import postRouter from './routes/postRouter';
import path from 'path';



dotenv.config(); // Загрузка переменных окружения из .env файла
const app: Express = express(); // Создание экземпляра приложения
const PORT = process.env.PORT || 3000; // Порт сервера (по умолчанию 3000)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase'; // Строка подключения к MongoDB

// Подключение к MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors()); //Для обработки запросов с Frontend
app.use(express.json()); // Парсинг JSON файлов
app.use('/uploads', express.static('uploads')); //Делает папку с изображениями доступной всем

//Подключаем свои routes
app.use('/', userRouter)
app.use('/posts', postRouter)

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});