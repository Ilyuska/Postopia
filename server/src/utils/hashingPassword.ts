import bcrypt from 'bcrypt';

export const hashingPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10); // Генерируем соль для хэширования
    const hash = await bcrypt.hash(password, salt); // Хэшируем данные
    return hash;
};