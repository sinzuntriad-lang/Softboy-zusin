RENDER SETUP
1. Upload all files to a PRIVATE GitHub repo, make a Web Service on Render (render.yaml included).
2. Env vars: FB_COOKIES (your cookie), BANAT_ADMIN_IDS (your FB id, or *).
3. Free UptimeRobot monitor -> https://YOUR-APP.onrender.com/health every 5 min.

DASHBOARD: no password by default. Anyone with the URL can control the bot.
To add a password later, set env var CELESTIAL_DASHBOARD_API_KEY on Render.

OPTIONAL TUNING (env vars)
BANAT_THREAD_COOLDOWN_MS=2500   min gap between replies in a GC
BANAT_GLOBAL_SEND_LIMIT=3       GCs replying at the same time
BANAT_MAX_CPS=28                typing speed
BANAT_MIN_TYPING_MS=900         how long "typing..." shows at least
BANAT_REFRESH_MINUTES=360       scheduled reconnect
