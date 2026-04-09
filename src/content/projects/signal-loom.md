---
title: Signal Loom
summary: An experiment in connecting small reverse-proxied services into a cohesive creative and operational surface instead of a pile of disconnected local tools.
publishedAt: 2026-04-03
featured: true
status: prototype
projectType: infrastructure
tags:
  - orchestration
  - services
  - self-hosted
stack:
  - Docker Compose
  - Nginx
  - Node.js
  - Prometheus
links:
  - label: Service
    href: /services/signal-loom/
    kind: service
  - label: Dashboard
    href: /dashboards/signal-loom/
    kind: dashboard
  - label: Repo
    href: /repos/signal-loom/
    kind: repo
heroImage: ''
---

Signal Loom explores what happens when a cluster of small self-hosted services is treated like one environment instead of a list of ports and tabs.

The work is less about container count than about routing, coherence, and giving related tools enough shared structure that the whole system feels navigable by humans as well as operators.
