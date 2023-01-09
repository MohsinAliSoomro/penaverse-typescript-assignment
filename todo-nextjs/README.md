# Nextjs Todo APP

Steps

```
npx create-next-app my-app
```

```
npm install prisma --save-dev
```

```
npx prisma init
```

```
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Todo Model
```
model todo {
  id          String     @default(cuid()) @id
  title       String
  content     String?
  isCompleted Boolean @default(false)
  createdAt   DateTime  @default(now()) @map(name: "created_at")
  updatedAt   DateTime  @updatedAt @map(name: "updated_at")
}
```