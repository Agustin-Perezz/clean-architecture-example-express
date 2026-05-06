## RTK (Rust Token Killer)

**CRITICAL: RTK saves 60-90% tokens on CLI commands.** Always use it.

`rtk` is a transparent proxy for CLI commands that hooks into existing tools. It intercepts calls to git, pnpm, npm, cargo, docker, and many more—routing them through a Rust proxy that eliminates redundant work and compresses output.

### Mandatory Usage

- **First choice**: Prefix ALL shell commands with `rtk` (git, pnpm, npm, cargo, docker, kubectl, etc.)
- **No exceptions**: Even for trivial commands like `git status` or `pnpm install`—always try `rtk` first
- **Fallback only**: If `rtk` is unavailable or a command fails, use the raw command directly

### How It Works

```
rtk git status    →  git status (with token-efficient routing)
rtk pnpm check    →  pnpm check (with output compression)
rtk npm test      →  npm test (with reduced token overhead)
```

### Utilities

- `rtk gain` — Check your current token savings
- `rtk discover` — Find commands where RTK isn't being used
- `rtk --help` — See all available commands and options

See `RTK.md` for complete reference.