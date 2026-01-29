# Guia de Deploy - Montador Conecta

Este guia descreve os passos para realizar o deploy da aplicação em um ambiente de produção (VPS, Shared Hosting, ou PaaS).

## Requisitos do Servidor

- PHP >= 8.2
- Extensões PHP: BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML
- Composer
- Node.js & NPM (para build dos assets)
- Banco de Dados (MySQL 8.0+ ou PostgreSQL)
- Servidor Web (Nginx ou Apache)

## Passos para Deploy

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/montador-conecta.git
cd montador-conecta
```

### 2. Instalar Dependências PHP

```bash
composer install --optimize-autoloader --no-dev
```

### 3. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure as credenciais de produção:

```bash
cp .env.example .env
nano .env
```

Ajuste as seguintes variáveis:
- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL=https://seu-dominio.com`
- Configurações de Banco de Dados (`DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`)

### 4. Gerar Chave da Aplicação

```bash
php artisan key:generate
```

### 5. Executar Migrações

```bash
php artisan migrate --force
```

### 6. Instalar Dependências Frontend e Build

```bash
npm install
npm run build
```

### 7. Otimizações de Cache (Laravel)

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 8. Configurar Permissões

Certifique-se de que o servidor web tenha permissão de escrita nas pastas de armazenamento:

```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

## Configuração do Servidor Web (Exemplo Nginx)

```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    root /var/www/montador-conecta/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```
