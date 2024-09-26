import {Event} from "./events.model.ts";

export function renderHtmlForTelegram(events: Event[]):string{
    return events.map(event => {
        return `
            <div class="event">
                <b>Event Brief:</b> <span>${event.event_brief}</span><br>
                <b>Event Date:</b> <span>${event.event_date}</span><br>
            </div>
        `;
    }).join(""); // Joining the array to create a single HTML string
}

const events: Event[] = [
    { id: 12, event_brief: "Event One", event_date: "2024-10-01" },
    { id: 3, event_brief: "Event Two", event_date: "2024-11-15" }
];

const eventsHtml = renderHtmlForTelegram(events);
console.log(eventsHtml);