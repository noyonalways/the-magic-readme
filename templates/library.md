<div align="center">

# {{repoName}}

**A focused library for developers who want clean APIs**

[![npm](https://img.shields.io/badge/npm-package-CB3837?style=flat-square&logo=npm)]({{repoUrl}})
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178C6?style=flat-square&logo=typescript&logoColor=white)]({{repoUrl}})
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)]({{repoUrl}})

```bash
npm install {{repoName}}
```

</div>

## Why {{repoName}}

- Small surface area
- Predictable API
- Great TypeScript types
- Sensible defaults

## Install

```bash
npm install {{repoName}}
# or
pnpm add {{repoName}}
```

## Quick example

```ts
import { createClient } from "{{repoName}}";

const client = createClient({
  // options
});

const result = await client.run();
console.log(result);
```

## API

### `createClient(options)`

Creates a configured client instance.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `baseUrl` | `string` | — | API base URL |
| `timeout` | `number` | `5000` | Request timeout in ms |

## Development

```bash
git clone {{repoUrl}}
cd {{repoName}}
npm install
npm test
npm run build
```

## Contributing

Issues and PRs are welcome. Please include tests for new behavior.

## Maintainer

**{{authorName}}** · [{{email}}](mailto:{{email}}) · [LinkedIn](https://linkedin.com/in/{{linkedin}})

## License

MIT © {{authorName}}
