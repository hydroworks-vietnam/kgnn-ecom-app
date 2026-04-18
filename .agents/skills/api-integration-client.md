---
name: api-integration-client
description: Reusable skill for generating TypeScript API service clients from OpenAPI 3.0 specs
version: 1.0.0
inclusion: manual
---

# API Integration Skill

Generates TypeScript API service clients from OpenAPI 3.0 specifications.

## Usage

1. Place your `API-SPECS.yaml` or `openapi.yaml` in the workspace root
2. Run the skill to generate services under `services/` folder
3. Import and use generated services in your components

## Generated Structure

```
services/
├── api-client.ts           # Base axios client with interceptors
├── types.ts                # TypeScript interfaces from schemas
├── {domain}/               # One folder per domain (e.g., categories, products)
│   ├── index.ts            # Domain exports
│   └── types.ts            # Domain-specific types (optional)
```

## Domain File Pattern

Each domain gets a service file with CRUD methods:

```typescript
// services/{domain}.ts
export const {domain}Service = {
  list: (params?) => api.get('/v1/{path}', { params }),
  get: (id: string) => api.get('/v1/{path}/{id}', { params: { id } }),
  create: (data: CreateRequest) => api.post('/v1/{path}', data),
  update: (id: string, data: UpdateRequest) => api.put(`/v1/{path}/${id}`, data),
  delete: (id: string) => api.delete(`/v1/{path}/${id}`),
}
```

## Excluded Tags

Internal monitoring tags are excluded:
- Health, HealthCheck, Monitoring