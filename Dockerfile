FROM node:20

WORKDIR /app


COPY . .

RUN npm install
# RUN npm run build
RUN npm install prisma@latest
WORKDIR /app/packages/db
RUN npx prisma generate


EXPOSE 3000

WORKDIR /app
CMD [ "npm", "run", "dev" ]
