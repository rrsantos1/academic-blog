# Etapa 1: Build
FROM node:18 AS build-stage

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo de dependências para o contêiner
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do projeto para o contêiner
COPY . .

# Gera os arquivos otimizados para produção
RUN npm run build

# Etapa 2: Servir os arquivos estáticos
FROM nginx:stable-alpine AS production-stage

# Copia os arquivos construídos para o diretório padrão do NGINX
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copia um arquivo customizado de configuração do NGINX (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta padrão do NGINX
EXPOSE 80

# Inicia o NGINX
CMD ["nginx", "-g", "daemon off;"]