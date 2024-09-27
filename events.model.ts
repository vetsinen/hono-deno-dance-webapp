import { createClient } from 'jsr:@supabase/supabase-js@2'
const supabase = createClient('https://wepnusszkcvcxrtnwpbe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcG51c3N6a2N2Y3hydG53cGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4ODcwNzQsImV4cCI6MjAyMjQ2MzA3NH0.6vYE9OyGZ0yGwgeFpL6U3sS5eJVPhyEn1tE_owSdynI')

export function greet(name: string): string {
    return `Hello, ${name}!`;
}

export type Event = {
    id: number; // Unique identifier for the event
    event_brief: string; // Brief description of the event
    event_date: string; // Date of the event in 'YYYY-MM-DD' format
};

export async function events(city='Київ'):Promise<Event[]>{
    try {
        const today = new Date().toLocaleDateString('en-CA'); // 'en-CA' formats as 'YYYY-MM-DD'

        const { data, error } = await supabase
            .from('posts')
            .select('id, event_brief, event_date')
            .eq('status', 'torepost')
            .eq('category', 'danceparty')
            .eq('city', city)
            .gte('event_date', today) // Select records with current or future event_date
            .order('event_date', { ascending: false }) // Order by date
            .limit(25); // Limit results to 25
        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error fetching events:', error.message);
        return [];
    }
}

// console.log(greet("world"))
const data: Event[] | null = await events(); console.log(data)