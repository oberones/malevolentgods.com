---
title: Ritual Indexer
summary: A local indexing and retrieval service for keeping project notes, fragments, and references searchable without handing that memory to a hosted platform.
publishedAt: 2026-04-06
featured: true
status: active
projectType: system
tags:
  - search
  - local-first
  - memory
stack:
  - TypeScript
  - Postgres
  - Docker
  - Nginx
links:
  - label: Service
    href: /services/ritual-indexer/
    kind: service
  - label: Dashboard
    href: /dashboards/ritual-indexer/
    kind: dashboard
  - label: Docs
    href: /docs/ritual-indexer/
    kind: docs
heroImage: ''
---

Ritual Indexer is conceived as a local-first retrieval layer for project notes, technical fragments, and structured references that should stay on infrastructure you control.

Instead of outsourcing that memory to a hosted service, the idea is to run indexing and lookup as a service behind your own reverse proxy, alongside the rest of the stack.

That makes it a better fit for a site and tool ecosystem where small internal services can be composed together without turning every useful feature into another external dependency.
