<div align="center">

<img src="{{logo}}" alt="{{repoName}} logo" width="96" />

# {{repoName}}

### Supabase-powered app by {{authorName}}

[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Postgres](https://img.shields.io/badge/Postgres-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Repo](https://img.shields.io/badge/GitHub-{{repoName}}-181717?style=for-the-badge&logo=github)]({{repoUrl}})

</div>

## Overview

{{repoName}} uses Supabase for auth, Postgres, and storage so you can move fast without bolting on a custom backend first.

## Stack

- Supabase (Auth, Database, Storage, Edge Functions)
- TypeScript
- Your frontend / API framework

## Features

- Email or OAuth authentication
- Row Level Security on public tables
- File uploads with storage policies
- Serverless functions for privileged work

## Getting started

### 1. Clone

```bash
git clone {{repoUrl}}
cd {{repoName}}
npm install
```

### 2. Environment

```bash
cp .env.example .env
```

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> Keep the **service role** key on the server only.

### 3. Run

```bash
npm run dev
```

## Database & RLS

Document tables, migrations, and policies that protect user data.

```bash
npx supabase db push
```

## Auth

List supported providers and where session checks happen in the app.

## Storage

| Bucket | Access |
| --- | --- |
| `avatars` | Authenticated read/write for owner |
| `public` | Public read |

## Edge functions

Document deployed functions and example invocations.

## Security checklist

- [ ] RLS enabled on exposed tables
- [ ] No service-role key in the client
- [ ] Input validation before writes
- [ ] Secrets stored in env / vault

## Contact

- Email: [{{email}}](mailto:{{email}})
- LinkedIn: [{{authorName}}](https://linkedin.com/in/{{linkedin}})
- Repository: [{{repoUrl}}]({{repoUrl}})

## License

MIT © {{authorName}}
