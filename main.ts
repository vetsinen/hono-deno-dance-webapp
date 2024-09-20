import { Hono } from 'hono'

const app = new Hono()

app.get('/', async (c) => {
    const filename = "./event.fragment.html";

    try {
        const text = await Deno.readTextFile(filename);
        return c.json({body:text})
    } catch (_) {
        return c.text("Error reading file");
    }
})

Deno.serve(app.fetch)
