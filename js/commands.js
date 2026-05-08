// commands.js — Portfolio data for Pravin Nayakar

const commands = {

  help: `
  ┌─────────────────────────────────────────┐
  │         AVAILABLE COMMANDS              │
  └─────────────────────────────────────────┘

  whoami        →  Who am I
  skills        →  Tech stack & tools
  projects      →  Things I've built
  experience    →  Work history
  contact       →  Reach me
  stats         →  Live server utilisation
  clear         →  Clear terminal
`,

  whoami: `
  ┌─────────────────────────────────────────┐
  │         PRAVIN NAYAKAR                  │
  │         DevOps Engineer                 │
  └─────────────────────────────────────────┘

  Location  :  Chennai, India
  Status    :  Open to DevOps opportunities
  Focus     :  Infrastructure · Automation · Deployment

  I'm a DevOps-focused engineer who went from building
  frontends to falling in love with what runs behind them.

  I manage real Linux servers, configure NGINX from scratch,
  write CI/CD pipelines that actually ship, and host everything
  on my own cloud VPS — because the best way to learn
  infrastructure is to break it yourself.

  Currently at TCS, actively targeting a full DevOps role
  in Chennai. I build things, document them, and share them.
`,

  skills: `
  ┌─────────────────────────────────────────┐
  │         TECH STACK                      │
  └─────────────────────────────────────────┘

  Infrastructure
  ──────────────
  ▸ Linux (Ubuntu / Debian)    — daily driver
  ▸ NGINX                      — reverse proxy, SSL, static hosting
  ▸ Docker                     — containerised deployments
  ▸ VPS / Cloud                — self-managed production server
  ▸ SSH                        — key auth, tunnelling, hardening

  Automation & CI/CD
  ──────────────────
  ▸ GitHub Actions             — pipelines for auto-deploy
  ▸ Shell Scripting            — bash automation & cron jobs
  ▸ Git                        — branching, workflows, hooks

  Cloud & Monitoring
  ──────────────────
  ▸ AWS Basics                 — EC2, S3, IAM
  ▸ System Monitoring          — uptime, CPU/RAM, logs

  Dev Background
  ──────────────
  ▸ JavaScript / Node.js       — scripting & backend APIs
  ▸ HTML / CSS                 — frontend fundamentals
  ▸ Kony (Temenos)             — mobile app platform (prior role)
`,

  projects: `
  ┌─────────────────────────────────────────┐
  │         PROJECTS                        │
  └─────────────────────────────────────────┘

  01 — Personal Cloud VPS
  ───────────────────────
  Self-managed Ubuntu VPS running NGINX as a reverse proxy,
  serving this portfolio site with SSL. Node.js backend
  exposes a live /api/stats endpoint for real-time CPU,
  RAM and uptime metrics.

  Stack: Ubuntu · NGINX · Node.js · PM2

  02 — GitHub Actions CI/CD Pipeline
  ────────────────────────────────────
  Automated deployment workflow — push to main, code lands
  on the server. Zero manual SSH deploys. Built using
  GitHub Actions with SSH deploy keys and remote exec.

  Stack: GitHub Actions · SSH · Bash

  03 — NGINX Reverse Proxy Setup
  ───────────────────────────────
  Configured NGINX to route multiple services on a single
  server, handle SSL termination via Certbot, and serve
  static files with caching headers.

  Stack: NGINX · Certbot · Let's Encrypt

  04 — Terminal Portfolio (this site)
  ─────────────────────────────────────
  A hacker-aesthetic portfolio built entirely in vanilla
  HTML, CSS and JS — no frameworks. Runs on the VPS.
  Tap-based UI for both desktop and mobile.

  Stack: HTML · CSS · JS · NGINX
`,

  experience: `
  ┌─────────────────────────────────────────┐
  │         EXPERIENCE                      │
  └─────────────────────────────────────────┘

  TATA CONSULTANCY SERVICES (TCS)
  Software Engineer  ·  2022 – Present
  ────────────────────────────────────────
  Started in application development with a focus on
  Kony (Temenos) mobile platform and frontend engineering.

  Over time, shifted focus toward infrastructure and DevOps —
  managing deployments, configuring servers, and building
  automation workflows independently alongside project work.

  Key areas:
  ▸ Frontend & mobile app development (Kony platform)
  ▸ Linux server administration (personal + VPS projects)
  ▸ NGINX configuration and production deployments
  ▸ CI/CD automation with GitHub Actions
  ▸ Self-hosted infrastructure on cloud VPS

  ────────────────────────────────────────
  HOMELAB / SELF-TAUGHT DEVOPS
  Ongoing
  ────────────────────────────────────────
  Outside of work, I run a personal homelab where I
  experiment with Docker, networking, automation and
  anything else that looks interesting on a Friday night.

  This is where most of the real learning happens.
`,

  contact: `
  ┌─────────────────────────────────────────┐
  │         CONTACT                         │
  └─────────────────────────────────────────┘

  Email     :  pnayakar7@gmail.com
  GitHub    :  github.com/electroboi-30
  LinkedIn  :  linkedin.com/in/pravinnayakar
  Server    :  154.61.74.145

  I'm currently open to DevOps roles in Chennai.
  If you're hiring or want to collaborate — reach out.
`,

};
