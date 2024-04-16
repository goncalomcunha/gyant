## Description

Gyant coding challenge

## Start the environment

```bash
docker compose up -d gyant-app
```

## Set env files

```bash
cp .env.template env.development
cp .env.template env.test
```

## Automated Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## API

##### Create provider

```bash
curl -X POST 'http://localhost:8081/providers' \
  -H 'content-type: application/json' \
  -d '{}'
```

##### List providers

```bash
curl 'http://localhost:8081/providers'
```
