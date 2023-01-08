CREATE TABLE cakes (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "price" NUMERIC NOT NULL,
  "image" TEXT NOT NULL,
  "description" TEXT
);

CREATE TABLE clients (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" VARCHAR NOT NULL
);

CREATE TABLE orders(
    "id" SERIAL PRIMARY KEY,
    "clientId" INTEGER NOT NULL REFERENCES "clients"("id"),
    "cakeId" INTEGER NOT NULL REFERENCES "cakes"("id"),
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "totalPrice" NUMERIC NOT NULL
);