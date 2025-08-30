import { Hono } from "hono";
import { cors } from "hono/cors";
import {
  authMiddleware,
  exchangeCodeForSessionToken,
  getOAuthRedirectUrl,
  deleteSession,
  MOCHA_SESSION_TOKEN_COOKIE_NAME,
} from "@getmocha/users-service/backend";
import { getCookie, setCookie } from "hono/cookie";

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for all routes
app.use("/*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

// Auth routes
app.get('/api/oauth/google/redirect_url', async (c) => {
  const redirectUrl = await getOAuthRedirectUrl('google', {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  return c.json({ redirectUrl }, 200);
});

app.post("/api/sessions", async (c) => {
  const body = await c.req.json();

  if (!body.code) {
    return c.json({ error: "No authorization code provided" }, 400);
  }

  const sessionToken = await exchangeCodeForSessionToken(body.code, {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 60 * 24 * 60 * 60, // 60 days
  });

  return c.json({ success: true }, 200);
});

app.get("/api/users/me", authMiddleware, async (c) => {
  return c.json(c.get("user"));
});

app.get('/api/logout', async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (typeof sessionToken === 'string') {
    await deleteSession(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });
  }

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true,
    maxAge: 0,
  });

  return c.json({ success: true }, 200);
});

// Data API routes (removed auth middleware for local development)
app.get("/api/sales", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM sales_data ORDER BY id"
  ).all();

  return c.json(results);
});

app.get("/api/analytics", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM user_analytics ORDER BY date DESC LIMIT 30"
  ).all();

  return c.json(results);
});

app.get("/api/metrics", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM performance_metrics ORDER BY timestamp DESC"
  ).all();

  return c.json(results);
});

// Real-time data simulation endpoint
app.get("/api/realtime", async (c) => {
  const timestamp = new Date().toISOString();
  const metrics = [
    {
      name: 'Active Users',
      value: Math.floor(Math.random() * 5000) + 15000,
      change: (Math.random() - 0.5) * 10,
      color: '#3B82F6'
    },
    {
      name: 'Revenue',
      value: Math.floor(Math.random() * 50000) + 200000,
      change: (Math.random() - 0.3) * 15,
      color: '#10B981'
    },
    {
      name: 'Conversion Rate',
      value: Math.random() * 5 + 2.5,
      change: (Math.random() - 0.5) * 2,
      color: '#8B5CF6'
    },
    {
      name: 'Bounce Rate',
      value: Math.random() * 20 + 25,
      change: (Math.random() - 0.7) * 5,
      color: '#EF4444'
    }
  ];

  return c.json({ timestamp, metrics });
});

export default app;
