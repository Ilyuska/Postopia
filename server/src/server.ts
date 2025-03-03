import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config(); // Загрузка переменных окружения из .env файла
const app = express(); // Создание экземпляра приложения
const PORT = process.env.PORT || 5000; // Порт сервера (по умолчанию 5000)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase'; // Строка подключения к MongoDB

// Подключение к MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.use(cors()); // Middleware для обработки CORS
app.use(express.json()); // Middleware для парсинга JSON

// Базовый маршрут
app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

// // Обработка ошибок сервера
// app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal Server Error' });
// });

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});