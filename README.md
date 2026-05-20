# ML & Data Engineering Course

Course materials for a two-day session on CI/CD, Docker, and Jenkins applied to ML and data systems. Each day is a self-contained React slide deck built with Vite; supporting exercises and PDFs live alongside the decks.

## Layout

| Path | What it is |
|------|------------|
| `Day1/` | Slide deck — *CI/CD for ML & Data Systems* |
| `Day2/` | Slide deck — *Docker for Beginners* |
| `Capstone/` | Capstone assignment site — 4 HIT-PYTHON-2026 groups, 3 new features each + shared CI/CD requirement |
| `Day2/example-app/` | Full-stack demo app (Node + Express + Postgres + Redis + Prometheus + Grafana) used in the Day 2 lesson |
| `exercise/jenkins_tutorial/` | Hands-on Jenkins pipeline for deploying a house-price prediction model |
| `pdfs/` | Printable PDF versions of both decks |

## Running a slide deck or the Exercise site

All three sites share the same scripts.

```bash
cd Day1   # or: cd Day2 / cd Capstone
npm install
npm run dev      # start dev server at http://127.0.0.1:5173
npm run build    # production build
npm test         # node --test
```

Published URLs (auto-deployed from `main`):

- Day 1 slide deck: <https://0121ient.github.io/ml-data-engineering/Day1/>
- Day 2 slide deck: <https://0121ient.github.io/ml-data-engineering/Day2/>
- Capstone exercise site: <https://0121ient.github.io/ml-data-engineering/Capstone/>

## Running the Docker demo app (Day 2)

```bash
cd Day2/example-app
docker compose up --build
```

- App: <http://localhost:3000>
- Prometheus: <http://localhost:9090>
- Grafana: <http://localhost:3001> (admin / admin)

See `Day2/example-app/README.md` for details.

## Running the Jenkins exercise

```bash
cd exercise/jenkins_tutorial
docker compose -f docker-compose.yaml up -d
```

Retrieve the initial admin password from `/var/jenkins_home/secrets/initialAdminPassword` inside the Jenkins container. See `exercise/jenkins_tutorial/README.md` for the full workflow.

## Requirements

- Node.js 20+ and npm (for the slide decks)
- Docker and Docker Compose (for the demo app and Jenkins exercise)
