# server

ЗАПУСК

1) Скачать репозиторий в удобное место
2) Прописать в терминале репозитория npm install
3) Запустить репозиторий npm start
4) Доступ локакльно по:

// Указываем заголовки(не обязательно)
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// Создаём объект для отправки 
const raw = JSON.stringify({
  "username": "test",
  "password": "test"
});

// Создаём объект параметров запроса
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

// Отправляем запрос 
fetch("http://localhost:8080/login", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
