import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter';
import postRouter from './routes/postRouter';


dotenv.config(); // Загрузка переменных окружения из .env файла
const app = express(); // Создание экземпляра приложения
const PORT = process.env.PORT || 3000; // Порт сервера (по умолчанию 3000)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase'; // Строка подключения к MongoDB

// Подключение к MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.use(cors()); // Middleware для обработки CORS
app.use(express.json()); // Middleware для парсинга JSON

app.use('/', userRouter)
app.use('/', postRouter)

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});