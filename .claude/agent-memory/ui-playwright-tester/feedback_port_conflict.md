---
name: Port 3000 conflict — WebLab dev server starts on alternate port
description: Port 3000 is occupied by another app on this machine; WebLab dev server starts on 3002 or higher
type: feedback
---

When running `npm run dev` for WebLab, port 3000 is frequently occupied by a different Next.js app ("School Information System" running Convex + auth). WebLab's dev server automatically tries the next available port.

Additionally, if two WebLab dev server processes are started, the second will fail with a `.next/dev/lock` error.

**Why:** The machine runs multiple Next.js projects concurrently. Port 3000 goes to whichever project started first.

**How to apply:**
1. Always check the terminal log at `/tmp/weblab-dev.log` to see which port was assigned.
2. Use `PORT=3005 npm run dev` to force a known port and avoid conflicts with other known projects.
3. If dev server fails to start (lock error), run `rm -f .next/dev/lock` before retrying.
4. Verify the correct app is running: `curl -sL http://localhost:PORT/ | grep '<title>'` — look for "WebLab" not "School Information System".
5. Never assume port 3000 — always verify.
