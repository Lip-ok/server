const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors'); // Импортируем cors
const { Client } = require('pg');

// Конфигурация подключения
const client = new Client({
    user: 'user1', // Имя пользователя
    host: 'localhost', // Хост
    database: 'userdatabase', // Имя базы данных
    password: 'password1', // Пароль
    port: 5432, // Порт
  });

  // Подключение к базе данных
client.connect()
.then(() => {
  console.log('Подключение к базе данных успешно!');
})
.catch(err => {
  console.error('Ошибка подключения к базе данных:', err.stack);
});

const app = express();
const PORT = 8080;

// Секретный ключ для подписи токенов
const SECRET_KEY = 'auth-app';

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Включаем CORS
app.use(cors()); // Это разрешит все источники

// Эндпоинт для получения пользователей
app.get('/users', (req, res) => {
  client.query('SELECT * FROM users', (err, result) => {
      if (err) {
          console.error('Ошибка выполнения запроса:', err.stack);
          return res.status(500).send('Ошибка выполнения запроса');
      }
      res.json(result.rows); // Отправляем пользователей в формате JSON
  });
});

// Эндпоинт для авторизации
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Здесь должна быть ваша логика проверки пользователя
    // Например, вы можете проверить имя пользователя и пароль в базе данных
    if (username === 'test' && password === 'test') {
        // Генерация токена
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }

    return res.status(401).json({ message: 'Неверные учетные данные' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
