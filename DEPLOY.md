# Запуск сайта на VPS (Ubuntu 26.04)

Инструкция под конкретный сервер: Beget Cloud «Dlya Work»,
1 ядро / 1 ГБ памяти / 10 ГБ диска, доступ `root@155.212.219.251`.

Домен — **zel-servis.ru**.

> Версии пакетов в Ubuntu 26.04 не проверялись вживую. Если команда
> ругается, что пакета нет или версия старая — смотри примечания в
> нужном разделе, там есть запасной путь.

---

## Что где живёт

**Все три проекта живут на этом VPS.** Обычный хостинг Beget отключён:
он стоил 740 ₽/мес и делал ровно то, что Nginx умеет бесплатно —
раздавал статические файлы. Осталось только VPS (11 ₽/день) и
выделенный IP (5 ₽/день), около 480 ₽/мес вместо 1 220 ₽.

| Проект | Как работает |
|---|---|
| «Свой Сервис» | Node.js на внутреннем порту 3000, Nginx проксирует |
| «Сатис» | статика, Nginx отдаёт файлы напрямую |
| Мастерская Веры | то же самое |

Nginx смотрит на домен в запросе и раздаёт по назначению — сайты друг
другу не мешают. Статика почти не ест ресурсов, так что 1 ГБ памяти
хватает.

**Ключевое решение по сборке.** Проект собирается **не на сервере**, а
в GitHub Actions. Причина простая: `npm run build` для Next.js на 1 ГБ
памяти может упасть по нехватке памяти. На сервер приезжает готовый
`standalone`-бандл — около 50 МБ вместо 464 МБ зависимостей, и его
остаётся только запустить.

---

## 1. Первый вход и базовая защита

```bash
ssh root@155.212.219.251
```

Подключиться можно и без своего терминала — в панели Beget у сервера
есть кнопка «Терминал».

Обновляем систему:

```bash
apt update && apt upgrade -y
```

**Swap — обязательно.** Памяти всего 1 ГБ; своп спасёт от падений,
когда её не хватит:

```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

Проверить: `free -h` — в строке Swap должно появиться 2 ГБ.

**Файрвол** — открываем только то, что нужно:

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
```

**Отдельный пользователь для сайта.** Приложение не должно работать
из-под `root` — если его взломают, взломщик получит весь сервер:

```bash
adduser --disabled-password --gecos "" deploy
mkdir -p /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chown -R deploy:deploy /home/deploy/.ssh
```

---

## 2. Node.js, Nginx, certbot

```bash
apt install -y nginx
node -v
```

Нужен Node.js **20 или новее**. Если `node -v` показывает старую версию
или команда не найдена — ставим из репозитория NodeSource:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
```

Certbot для бесплатного SSL:

```bash
apt install -y certbot python3-certbot-nginx
```

> Если пакета `python3-certbot-nginx` в 26.04 не окажется — ставь
> certbot через snap: `snap install --classic certbot`.

---

## 3. Папка приложения

```bash
mkdir -p /var/www/svoi-servis
chown -R deploy:deploy /var/www/svoi-servis
```

Переменные окружения кладём в отдельный файл — в репозиторий они не
попадают:

```bash
nano /etc/svoi-servis.env
```

Содержимое:

```
NODE_ENV=production
PORT=3000
TELEGRAM_BOT_TOKEN=сюда_токен_от_BotFather
TELEGRAM_CHAT_ID=сюда_chat_id
NEXT_PUBLIC_SITE_URL=https://zel-servis.ru
```

Закрываем файл от посторонних глаз:

```bash
chmod 600 /etc/svoi-servis.env
chown deploy:deploy /etc/svoi-servis.env
```

> `NEXT_PUBLIC_PREVIEW` здесь **не задаём**. Он включает режим превью с
> запретом индексации — на боевом сайте это сделает его невидимым для
> поиска.

---

## 4. Автозапуск через systemd

```bash
nano /etc/systemd/system/svoi-servis.service
```

```ini
[Unit]
Description=Svoi Servis (Next.js)
After=network.target

[Service]
Type=simple
User=deploy
WorkingDirectory=/var/www/svoi-servis
EnvironmentFile=/etc/svoi-servis.env
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload
systemctl enable svoi-servis
```

Запускать пока рано — файлов ещё нет, они приедут из GitHub.

**Разрешаем деплою перезапускать только этот сервис** (и ничего больше):

```bash
echo 'deploy ALL=(ALL) NOPASSWD: /bin/systemctl restart svoi-servis' \
  > /etc/sudoers.d/deploy-svoi-servis
chmod 440 /etc/sudoers.d/deploy-svoi-servis
```

---

## 5. Nginx: домен → приложение

```bash
nano /etc/nginx/sites-available/zel-servis.ru
```

```nginx
server {
    listen 80;
    server_name zel-servis.ru www.zel-servis.ru;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/zel-servis.ru /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

### Добавить статический сайт на этот же сервер

Для «Сатиса» и мастерской Веры процесс проще — Node не нужен, Nginx
отдаёт файлы напрямую.

```bash
mkdir -p /var/www/satis
chown -R deploy:deploy /var/www/satis
nano /etc/nginx/sites-available/satis
```

```nginx
server {
    listen 80;
    server_name САЙТ.ru www.САЙТ.ru;
    root /var/www/satis;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/satis /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
certbot --nginx -d САЙТ.ru -d www.САЙТ.ru
```

Файлы заливаются так же, как и основной сайт:

```bash
rsync -az --delete ./ deploy@155.212.219.251:/var/www/satis/
```

Перезапускать ничего не нужно — Nginx подхватывает новые файлы сразу.

---

## 6. SSL

Сначала убедись, что домен уже указывает на сервер:

```bash
dig +short zel-servis.ru
```

Должен ответить `155.212.219.251`. Если пусто — A-запись ещё не
разошлась, подожди (до суток).

```bash
certbot --nginx -d zel-servis.ru -d www.zel-servis.ru
```

Certbot сам перепишет конфиг под HTTPS и настроит автопродление.
Проверить продление: `certbot renew --dry-run`.

---

## 7. Ключ для автодеплоя

**На своём компьютере** (не на сервере) создаём пару ключей:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/zel_deploy -N ""
```

Публичную часть кладём на сервер:

```bash
ssh-copy-id -i ~/.ssh/zel_deploy.pub deploy@155.212.219.251
```

Проверяем, что вход работает: `ssh -i ~/.ssh/zel_deploy deploy@155.212.219.251`

**В GitHub** → репозиторий → Settings → Secrets and variables → Actions:

| Секрет | Значение |
|---|---|
| `VPS_HOST` | `155.212.219.251` |
| `VPS_USER` | `deploy` |
| `VPS_PATH` | `/var/www/svoi-servis` |
| `VPS_SSH_KEY` | содержимое файла `~/.ssh/zel_deploy` (приватный ключ, целиком) |

Там же вкладка **Variables** → создать `VPS_ENABLED` со значением
`true`. Пока её нет, деплой просто пропускается.

После этого любой пуш в ветку `claude/new-chat-repo-belqxp` собирает
сайт и выкладывает его на сервер сам.

---

## 8. Первый запуск

После первого успешного прогона деплоя:

```bash
systemctl start svoi-servis
systemctl status svoi-servis
```

Проверить, что приложение отвечает:

```bash
curl -I http://127.0.0.1:3000
```

Смотреть логи, если что-то не так:

```bash
journalctl -u svoi-servis -f
```

---

## Заливка вручную (аварийный путь)

Если GitHub недоступен, а поправить надо срочно. На своём компьютере:

```bash
npm ci
npm run build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
rsync -az --delete .next/standalone/ deploy@155.212.219.251:/var/www/svoi-servis/
ssh deploy@155.212.219.251 "sudo systemctl restart svoi-servis"
```

Важно: копирование `public` и `.next/static` пропускать нельзя — Next
не кладёт их в standalone сам, и сайт откроется без стилей и фотографий.

---

## Чек-лист перед тем, как звать людей на сайт

- [ ] `https://zel-servis.ru` открывается, замок в адресной строке есть
- [ ] Заявка с реального номера доходит в Telegram
- [ ] `https://zel-servis.ru/robots.txt` **не** содержит запрет индексации
      (если содержит — на сервере задан `NEXT_PUBLIC_PREVIEW`, убрать)
- [ ] `https://zel-servis.ru/sitemap.xml` открывается, ссылки с нужным доменом
- [ ] Страница `/privacy` открывается, в подвале есть ссылка на неё
- [ ] Сайт добавлен в Яндекс.Вебмастер, карта сайта отправлена
