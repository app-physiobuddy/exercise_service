# Run app in dev

docker-compose up --build
cd app
npx prisma migrate dev --name init 

__no exec do docker server__
npx prisma generate

na console normal de novo
npx prisma studio

changes in schema.prisma
npx prisma db push

## Notas
### Categories
Não fiz o check para retornar apenas categories com isdeleted = false
no delete category nao faz o check para ver se ja tava deleted, portanto retorna sempre true