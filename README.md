## Description

Gyant coding challenge

## Running the containers

```bash
docker compose up -d gyant-app
```

## Automated Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## API Documentation

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
