# FILL IN LATER. THIS IS WORKING WITH DATA IN REACT 

STEPS TO GET APP RUNNING AFTER FRESH GITHUB PULL:

create a new .env file in the root of the project with a single line:
DATABASE_URL="file:./dev.db"

npm install
npx prisma generate
npx prisma migrate dev --name init
ts-node src/lib/prisma/seed.ts

(
    you might have to install ts-node separately: (with sudo for elevated privileges)
    npm install -g typescript
    npm install -g ts-node
)



this is the clip with just REST services and no server components

Install Primsa with sqllite

https://www.prisma.io/docs/getting-started/quickstart

npm install ts-node --save-dev
npm install prisma --save-dev
npx prisma init --datasource-provider sqlite
add model to schema.prisma
npx prisma migrate dev --name init
npx prisma generate

npx prisma migrate reset

ts-node src/lib/prisma/seed.ts
