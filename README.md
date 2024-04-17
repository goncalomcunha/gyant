## Gyant coding challenge

#### Start the environment

```bash
docker compose up gyant-app
```

#### API Docs

:point_right: http://localhost:8081/docs

#### Automated Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

#### Manual tests

```bash
# Create prebooking, receive webhook 10 seconds later
curl -X POST 'http://localhost:8081/api/v1/appointments' -H 'content-type: application/json' --data-raw '{"slotId": "17ade17b-6530-4621-8635-9951c1ed1c72"}'
```
