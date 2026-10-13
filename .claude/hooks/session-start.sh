#!/bin/bash
# Reinstall gstack (github.com/garrytan/gstack) in Claude Code cloud sessions,
# whose containers start without anything in ~/.claude/skills.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

GSTACK_DIR="$HOME/.claude/skills/gstack"

# Already installed (e.g. a cached container): nothing to do.
if [ -f "$GSTACK_DIR/SKILL.md" ] && [ -x "$GSTACK_DIR/browse/dist/browse" ]; then
  exit 0
fi

# Drop any half-finished clone from an earlier failed run.
rm -rf "$GSTACK_DIR"
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git "$GSTACK_DIR" >&2
cd "$GSTACK_DIR"
./setup --host claude --quiet >&2
