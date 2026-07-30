# Этап 1: Сборка приложения
FROM node:20-alpine AS builder

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы с зависимостями
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production && npm cache clean --force

# Копируем весь исходный код
COPY . .

# Собираем проект (создаёт папку dist)
RUN npm run build

# Этап 2: Запуск (используем лёгкий веб-сервер)
FROM nginx:alpine

# Копируем собранные файлы из первого этапа в папку, которую раздаёт nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем конфиг nginx (опционально, если хотите кастомизировать)
# COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80 (стандартный для HTTP)
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]