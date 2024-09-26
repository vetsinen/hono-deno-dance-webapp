import { Hono } from 'hono'
import { serveStatic } from 'hono/deno'
import { createClient } from 'jsr:@supabase/supabase-js@2'

const app = new Hono()
app.use('/static/*', serveStatic({ root: './' }))
const supabase = createClient('https://wepnusszkcvcxrtnwpbe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcG51c3N6a2N2Y3hydG53cGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4ODcwNzQsImV4cCI6MjAyMjQ2MzA3NH0.6vYE9OyGZ0yGwgeFpL6U3sS5eJVPhyEn1tE_owSdynI')

app.get('/', (c) => {
    return c.json({body:'Hello Hono!'})
})

app.get('/digest', async (c) => {
    const { data, error } = await supabase
        .from('posts')
        .select('id, event_brief, event_date, created_at')
        .eq('status', 'torepost').eq('category','danceparty').
        limit(25).order('created_at', { ascending: false });
    return c.json({status: 'ok', body:'Hello Hono!'})
})

Deno.serve(app.fetch)
