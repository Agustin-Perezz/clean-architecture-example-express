## RTK (Rust Token Killer)

Prefer using `rtk` as a proxy for CLI commands to save tokens (60-90% savings). It hooks transparently—e.g. `rtk git status`, `rtk pnpm check`, etc. See `RTK.md` for full reference.

- Always try `rtk <cmd>` first when running shell commands (git, pnpm, npm, cargo, etc.)
- If `rtk` is unavailable or a command fails, fall back to the raw command
- Use `rtk gain` to check token savings, `rtk discover` to find missed opportunities