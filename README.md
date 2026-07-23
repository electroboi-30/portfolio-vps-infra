#  Portfolio VPS Infrastructure

[![Deploy to VPS](https://github.com/electroboi-30/portfolio-vps-infra/actions/workflows/deploy.yml/badge.svg)](https://github.com/electroboi-30/portfolio-vps-infra/actions)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=flat&logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=flat&logo=grafana&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Linux_VPS-FCC624?style=flat&logo=linux&logoColor=black)

> Personal portfolio fully containerized on a cloud VPS with a Node.js system stats API, Prometheus + Grafana monitoring, SSL, and automated deployments via GitHub Actions.

---

## Live Links

| Service | URL |
|---|---|
| Portfolio Site | [https://rootssh.me](https://rootssh.me) |
| VPS Stats API | [https://rootssh.me/api/stats](https://rootssh.me/api/stats) |
| Grafana Dashboard | [https://grafana.rootssh.me](https://grafana.rootssh.me) |

---

## Architecture

```
                         Internet
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
         rootssh.me              grafana.rootssh.me
                \                       /
                 └──────────┬──────────┘
                            ▼
               ┌─────────────────────┐
               │   Nginx Container   │  ← Reverse proxy + SSL termination
               │   (ports 80, 443)   │
               └──────┬──────────────┘
                      │
          ┌───────────┴────────────┐
          ▼                        ▼
  ┌──────────────┐       ┌──────────────────┐
  │  index.html  │       │  node-app:3000   │  ← /api/* (internal only)
  │  (Portfolio) │       │  System Metrics  │
  └──────────────┘       └──────────────────┘

  ┌──────────────┐       ┌──────────────────┐
  │  Prometheus  │  ←──  │  Node Exporter   │  ← VPS hardware metrics
  │  :9090       │       │  :9100           │
  └──────┬───────┘       └──────────────────┘
         │
         ▼
  ┌──────────────┐
  │   Grafana    │  ← Live dashboards
  │   :3000      │
  └──────────────┘
```

---

## Stack

| Layer | Technology |
|---|---|
| Web Server / Reverse Proxy | Nginx (Docker) |
| Backend API | Node.js (Docker) |
| Metrics Collection | Prometheus + Node Exporter |
| Monitoring Dashboard | Grafana |
| Containerization | Docker + Docker Compose |
| SSL | Let's Encrypt (Certbot) |
| Frontend | HTML, CSS, JavaScript |
| CI/CD | GitHub Actions |
| Hosting | Linux Cloud VPS (2 vCPU, 2GB RAM, 50GB) |

---

## Project Structure

```
portfolio-vps-infra/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline
├── app/
│   ├── server.js               # Node.js stats API
│   ├── package.json
│   └── Dockerfile              # Node.js container build
├── nginx/
│   └── default.conf            # Nginx routing + SSL config
├── prometheus/
│   └── prometheus.yml          # Prometheus scrape config
├── public/                     # Nginx webroot (only this is served)
│   ├── index.html              # Portfolio page
│   ├── style.css
│   ├── script.js
│   ├── js/                     # Frontend scripts
│   ├── fonts/                  # Self-hosted webfonts
│   └── favicon/
├── .env.example                # Copy to .env on the VPS, fill in real secrets
├── docker-compose.yml          # All 5 services wired together
```

---

## Services

| Container | Role | Port |
|---|---|---|
| `nginx` | Reverse proxy, serves static files, SSL termination | 80, 443 |
| `node-app` | System stats API (`/api/stats`) | 3000 (internal) |
| `prometheus` | Scrapes and stores metrics every 15s | 9090 (internal) |
| `grafana` | Visualizes metrics as dashboards | 3000 (internal) |
| `node-exporter` | Exposes VPS hardware metrics to Prometheus | 9100 (internal) |

> Only nginx is exposed to the internet. All other containers communicate internally via Docker network.

---

## CI/CD Pipeline

Every push to `main` triggers an automated deployment:

```
git push origin main
        │
        ▼
GitHub Actions triggers
        │
        ▼
SSH into VPS
        │
        ├── git pull origin main
        ├── docker stop/rm old containers
        ├── docker-compose down
        └── docker-compose up -d --build
                │
                ├── node-app health check passes
                └── nginx starts → site is live
```

---

## Stats API

Hitting `/api/stats` returns live server metrics:

```json
{
  "cpu": "5.8%",
  "ram": "42.7%",
  "uptime": "11 mins"
}
```

---

## Local Development

```bash
# clone the repo
git clone https://github.com/electroboi-30/portfolio-vps-infra.git
cd portfolio-vps-infra

# start all services
docker-compose up --build

# visit
http://localhost
```

---

## Deployment

Deployment is fully automated via GitHub Actions on every push to `main`.

Manual deploy if needed:
```bash
cd ~/portfolio-vps-infra
docker-compose down
docker-compose up -d --build
```

---

## What I Built

- Containerized a full-stack app with Docker Compose — nginx + Node.js as isolated containers
- Configured nginx as a reverse proxy routing `/api/*` to Node.js internally (port 3000 never exposed to internet)
- Set up a complete monitoring stack with Prometheus + Grafana accessible at grafana.rootssh.me
- Automated CI/CD pipeline — git push to main triggers SSH deploy and full container rebuild
- SSL with Let's Encrypt on both rootssh.me and grafana.rootssh.me
- Health checks ensuring nginx only starts after Node.js is confirmed alive

---

## Roadmap

- [x] Containerize with Docker + Docker Compose
- [x] Custom domain with SSL (Let's Encrypt)
- [x] Prometheus + Grafana monitoring
- [x] GitHub Actions CI/CD pipeline
- [x] Health checks
- [ ] Portainer for container management
- [ ] Migrate to AWS EC2
- [ ] Terraform for infrastructure as code
- [ ] Kubernetes deployment
