import { Hono } from 'hono'
import { serveStatic } from 'hono/deno'

const app = new Hono()
app.use('/static/*', serveStatic({ root: './' }))

app.get('/', async (c) => {
    const filename = "./digest.html";

    try {
        const text = await Deno.readTextFile(filename);
        return c.json({body:text})
    } catch (_) {
        return c.text("Error reading file");
    }
})

Deno.serve(app.fetch)
