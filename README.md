# Examenopdracht Front-end Web Development & Web Services

> Schrap hierboven eventueel wat niet past

- Student: BEKIR AYTAC KARAKUS
  - Studentennummer: 202406918
- E-mailadres: bekir.karakus@student.hogent.be

## Vereisten


- [NodeJS v22 (LTS)](https://nodejs.org)
- [pnpm](https://pnpm.io)
- [MySQL Community Server v8](https://dev.mysql.com/downloads/mysql/)
- Docker



## Front-end

## Opstarten

> Schrijf hier hoe we de applicatie starten (.env bestanden aanmaken, commando's om uit te voeren...)

## Testen

> Schrijf hier hoe we de testen uitvoeren (.env bestanden aanmaken, commando's om uit te voeren...)

## Back-end

## Opstarten

NODE_ENV=development 
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=3307
DB_USER=barber_user
DB_PASS=barber_pass
DB_NAME=barberdb

DATABASE_URL="mysql://barber_user:barber_pass@127.0.0.1:3307/barberdb"

CORS_ORIGINS=["http://localhost:5173"]
CORS_MAX_AGE=10800
LOG_LEVELS=["log","error","warn","debug"]
AUTH_JWT_SECRET=eensuperveiligsecretvoorindevelopment
AUTH_MAX_DELAY=300

Back-end opstarten

pnpm install
pnpm db:migrate
pnpm db:seed
pnpm start:dev

Production

pnpm install
pnpm db:migrate
pnpm start




## Testen

NODE_ENV=testing
PORT=3000

DATABASE_URL=mysql://barber_user:barber_pass@localhost:3310/barberdb_test



AUTH_JWT_SECRET=eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked
AUTH_JWT_AUDIENCE=budget.hogent.be
AUTH_JWT_ISSUER=budget.hogent.be
AUTH_HASH_LENGTH=32
AUTH_HASH_TIME_COST=6
AUTH_HASH_MEMORY_COST=65536
AUTH_MAX_DELAY=2000

LOG_DISABLED=true

Testen

pnpm install
pnpm test:e2e



