# Docker Workshop Orders App

Small full-stack app for the Day2 Docker workshop.

## Stack

- Web UI: static HTML, CSS, and JavaScript served by the API container
- API: Node.js and Express
- Database: PostgreSQL
- Cache: Redis
- Metrics: Prometheus endpoint at `/metrics`
- Monitoring: Prometheus and Grafana

## Run

```bash
docker compose up --build
```

Open:

- App: http://localhost:3000
- API health: http://localhost:3000/health
- Metrics: http://localhost:3000/metrics
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001

Grafana login:

- User: `admin`
- Password: `admin`

## Stop

```bash
docker compose down
```

Remove volumes too:

```bash
docker compose down -v
```
