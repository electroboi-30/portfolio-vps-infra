// commands.js — Portfolio data for Pravin Nayakar

const commands = {

  help: `
  ┌─────────────────────────────────────────┐
  │  AVAILABLE COMMANDS                      │
  └─────────────────────────────────────────┘

  whoami        Overview
  skills        Technical stack
  projects      Selected work
  experience    Professional background
  contact       Get in touch
  stats         Live server metrics
  clear         Clear terminal
`,

  whoami: `
  ┌─────────────────────────────────────────┐
  │  PRAVIN NAYAKAR                          │
  │  DevOps Engineer                         │
  └─────────────────────────────────────────┘

  Location    Chennai, India
  Status      Open to DevOps opportunities
  Focus       Infrastructure, Automation, CI/CD

  Engineer transitioning from frontend and mobile
  development into infrastructure and DevOps, with
  ~4.5 years of professional experience at TCS.

  I manage a self-hosted Linux/VPS environment end to
  end — server provisioning, NGINX and reverse proxy
  configuration, containerised services, CI/CD pipelines,
  and monitoring — as a working proof of the skills listed
  below, not just a resume line.

  Currently pursuing AWS Solutions Architect Associate
  certification and building toward Kubernetes (CKA).
`,

  skills: `
  ┌─────────────────────────────────────────┐
  │  TECHNICAL STACK                         │
  └─────────────────────────────────────────┘

  Infrastructure & Systems
  ─────────────────────────
  Linux (Ubuntu/Debian)     Server administration
  NGINX                     Reverse proxy, SSL/TLS, static hosting
  Docker                    Containerised service deployment
  Portainer                 Container management
  SSH                       Key-based auth, tunnelling, hardening

  Automation & CI/CD
  ─────────────────────────
  GitHub Actions            Automated deploy pipelines
  Shell Scripting           Bash automation, cron
  Git                       Branching workflows, hooks

  Cloud & Monitoring
  ─────────────────────────
  AWS                       EC2, S3, IAM
  Prometheus / Grafana      Metrics collection & dashboards
  Cloudflare Tunnel         Secure remote access

  Currently Building
  ─────────────────────────
  AWS SAA-C03               In progress
  Kubernetes (CKA track)    In progress
  Terraform                 In progress

  Development Background
  ─────────────────────────
  JavaScript / Node.js      Scripting & backend APIs
  HTML / CSS                Frontend fundamentals
  Kony (Temenos)             Mobile app platform (prior role)
`,

  projects: `
  ┌─────────────────────────────────────────┐
  │  PROJECTS                                │
  └─────────────────────────────────────────┘

  01 — Personal Cloud VPS
  ─────────────────────────
  Self-managed Ubuntu VPS running NGINX as a reverse
  proxy with SSL, serving this portfolio. A Node.js
  backend exposes a live /api/stats endpoint reporting
  real-time CPU, RAM, and uptime metrics.

  Stack: Ubuntu · NGINX · Node.js · PM2

  02 — CI/CD Deployment Pipeline
  ─────────────────────────
  Automated deployment workflow triggered on push to
  main — code is built, tested, and shipped to the
  server via SSH deploy keys with no manual steps.

  Stack: GitHub Actions · SSH · Bash

  03 — NGINX Reverse Proxy & Multi-Service Routing
  ─────────────────────────
  Configured NGINX to route multiple services on a
  single host, with SSL termination via Certbot and
  cached static file delivery.

  Stack: NGINX · Certbot · Let's Encrypt

  04 — Homelab Monitoring Stack
  ─────────────────────────
  Docker-based observability stack for a personal
  homelab — Prometheus scraping node-exporter metrics,
  visualised in Grafana, with services managed through
  Portainer and exposed securely via Cloudflare Tunnel.

  Stack: Docker · Prometheus · Grafana · Portainer

  05 — Terminal Portfolio (this site)
  ─────────────────────────
  Hacker-aesthetic portfolio built in vanilla HTML,
  CSS, and JS — no frameworks. Deployed on the VPS
  with a command-based UI for desktop and mobile.

  Stack: HTML · CSS · JS · NGINX
`,

  experience: `
  ┌─────────────────────────────────────────┐
  │  EXPERIENCE                              │
  └─────────────────────────────────────────┘

  Tata Consultancy Services (TCS)
  Software Engineer  ·  2022 – Present
  ─────────────────────────────────────────
  Began in application development on the Kony
  (Temenos) mobile platform, focused on frontend
  engineering for banking applications.

  Progressively shifted focus toward infrastructure
  and DevOps — managing deployments, configuring
  servers, and building automation workflows
  independently alongside core project work.

  Key areas:
  · Frontend & mobile application development (Kony)
  · Linux server administration
  · NGINX configuration and production deployments
  · CI/CD automation with GitHub Actions
  · Self-hosted infrastructure design and operations

  ─────────────────────────────────────────
  Independent Infrastructure Projects
  Ongoing
  ─────────────────────────────────────────
  Design and operate a personal homelab and VPS
  covering containerisation, networking, monitoring,
  and automation — used as an applied testbed for
  DevOps practices ahead of a full-time transition.
`,

  contact: `
  ┌─────────────────────────────────────────┐
  │  CONTACT                                 │
  └─────────────────────────────────────────┘

  Email       pnayakar7@gmail.com
  GitHub      github.com/electroboi-30
  LinkedIn    linkedin.com/in/pravinnayakar
  Website     https://rootssh.me

  Open to DevOps roles in Chennai.
  Reach out for opportunities or collaboration.
`,

};
