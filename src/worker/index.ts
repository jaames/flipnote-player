import { Hono } from 'hono';

const app = new Hono<{ Bindings: Env }>();

app.get('/api/', (c) => c.json({ ok: true, service: 'flipnote-player' }));

export default app;
