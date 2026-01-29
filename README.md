# MONTADOR CONECTA

## Sobre o Projeto
Aplicativo web para conectar marcenarias, lojistas e montadores de móveis.
Desenvolvido com Laravel (Backend) e React/Inertia (Frontend).

## Requisitos
- PHP >= 8.2
- Composer
- Node.js & NPM
- MySQL ou PostgreSQL

## Instalação

1. Clone o repositório.
2. Instale as dependências do PHP:
   ```bash
   composer install
   ```
3. Instale as dependências do JavaScript:
   ```bash
   npm install
   ```
4. Copie o arquivo de configuração e gere a chave:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
5. Configure o banco de dados no arquivo `.env`.
6. Execute as migrações:
   ```bash
   php artisan migrate
   ```
7. Inicie o servidor de desenvolvimento:
   ```bash
   php artisan serve
   ```
8. Em outro terminal, inicie o build do frontend:
   ```bash
   npm run dev
   ```

## Estrutura
- **Backend**: Laravel 11
- **Frontend**: React + TypeScript + Tailwind CSS (via Inertia.js)
- **Banco de Dados**: MySQL
- **Autenticação**: Laravel Breeze (Personalizado)

## Funcionalidades da Fase 1
- Cadastro de Montadores, Marcenarias e Lojistas.
- Agenda do Montador.
- Gestão de Serviços (CRUD).
- Sistema de Avaliação.
