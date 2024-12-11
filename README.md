# Tech Challenge - Academic Blog

Antes de mais nada, clone o projeto do backend, conforme abaixo:

Clone o projeto

```bash
  git clone https://github.com/talinedacosta/academic-blog_api.git
````

Faça todas as configurações no backend e depois siga com os passos abaixo.

#### Executando projeto com a imagem rrsnaza/academic-blog
Para executar o projeto no Docker utilizando a imagem rrsnaza/academic-blog, é necessário criar o arquivo docker-compose.yml e executar o comando docker-compose up -d

Crie a pasta do projeto e o arquivo docker-compose.yml

```bash
  mkdir academic-blog
  cd academic-blog
  vim docker-compose.yml
```
Adicione as informações a seguir dentro do docker-compose.yml

```bash
  version: '3.8'

services:
  app:
    image: rrsnaza/academic-blog:latest
    container_name: academic-blog-app
    ports:
      - "5173:80" 
    environment:
      - NODE_ENV=production
    restart: always
```

Rode o comando docker-compose up -d para baixar e rodar as imagens

```bash
  docker-compose up -d
```
 Pronto, verifique se a aplicação está rodando normalmente em http://localhost:5173/ 

#### Executando projeto localmente

Clone o projeto

```bash
  git clone https://github.com/rrsantos1/academic-blog.git
```

Entre no diretório do projeto

```bash
  cd academic-blog
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```
 
A página estará rodando na porta http://localhost:5173``