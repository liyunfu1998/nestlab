FROM node:18.0-alpine3.14 as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18.0-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]

# 此次采用多阶段构建第一阶段构建出镜像包含src、node_modules的，第二阶段构建出镜像包含dist的，
# 这样做的目的是为了减少镜像的体积，因为dist是构建出的静态文件，不需要每次都重新构建，所以可以将其放在第二阶段构建。
# alpine 版本也是为了减少镜像的体积
# 构建命令：docker build -t aaa:ccc .
# 运行命令：docker run -p 3000:3000  aaa

