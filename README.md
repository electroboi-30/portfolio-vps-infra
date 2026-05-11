#  Portfolio VPS Infrastructure

[![Deploy to VPS](https://github.com/electroboi-30/Test_VPS/actions/workflows/deploy.yml/badge.svg)](https://github.com/electroboi-30/Test_VPS/actions)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Linux_VPS-FCC624?style=flat&logo=linux&logoColor=black)

> Personal portfolio website self-hosted on a cloud VPS, with a real-time Node.js system stats API and automated deployments via GitHub Actions.

---

##  Live Links

| Service | URL |
|---|---|
|  Portfolio Site | [https://rootssh.me](https://rootssh.me) |
|  VPS Stats API | [https://rootssh.me/api/stats](https://rootssh.me/api/stats) |

---

##  Architecture

```
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │   Nginx (80)    │  ← Reverse proxy + static file server
              └────────┬────────┘
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
  ┌──────────────┐         ┌─────────────────┐
  │  index.html  │         │  Node.js Server  │  ← /api/stats endpoint
  │  (Portfolio) │         │  (System Metrics)│
  └──────────────┘         └─────────────────┘
```

- **Nginx** serves static HTML/CSS/JS for the portfolio and proxies `/api/*` requests to the Node.js backend
- **Node.js backend** exposes `/api/stats` with real-time CPU, memory, and uptime data fetched from the Linux system
- **GitHub Actions** SSHs into the VPS on every push to `main` and pulls the latest code automatically

---

## ⚙️ CI/CD Pipeline

Every push to `main` triggers an automated deployment:

```
Push to main
     │
     ▼
GitHub Actions Workflow
     │
     ├─ SSH into VPS
     ├─ git pull latest code
     ├─ Restart Node.js service (if needed)
     └─ Site is live
```

The workflow file lives at `.github/workflows/deploy.yml`.

---

##  Stats API Response

Hitting `/api/stats` returns live server metrics:

```json
{
  "cpu": "12%",
  "memory": {
    "total": "2GB",
    "used": "780MB",
    "free": "1.22GB"
  },
  "uptime": "3 days, 4 hours"
}
```

---

##  Project Structure

```
Test_VPS/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions CI/CD pipeline
├── js/                      # Additional scripts
├── index.html               # Main portfolio page
├── mobile.html              # Mobile-optimised version
├── style.css                # Desktop styles
├── mobile.css               # Mobile styles
├── script.js                # Frontend JS
└── mobile.js                # Mobile JS
```

---

##  Stack

| Layer | Technology |
|---|---|
| Web Server / Reverse Proxy | Nginx |
| Backend API | Node.js |
| Frontend | HTML, CSS, JavaScript |
| CI/CD | GitHub Actions |
| Hosting | Linux Cloud VPS |

---

##  What I Learned

- Configuring Nginx as both a static server and a reverse proxy
- Writing a GitHub Actions workflow for automated SSH deployments
- Building a lightweight system metrics API in Node.js without external monitoring tools
- Managing a live Linux server including process management and networking

---

##  Roadmap

- [ ] Add Dockerfile and containerize the app
- [ ] Set up a custom domain with SSL (Let's Encrypt)
- [ ] Add Prometheus + Grafana for proper metrics dashboarding
- [ ] Expand CI/CD pipeline with a health check step post-deploy
