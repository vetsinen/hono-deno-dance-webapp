import {Event} from "./events.model.ts";
import {events} from "./events.model.ts";

export function renderHtmlForTelegram(events: object[]): string {
    const today = new Date().toLocaleDateString('en-CA'); // 'en-CA' formats as 'YYYY-MM-DD'
    const cities: object = {"Київ": 69523, "Дніпро": 75286, "Львів": 75292, "Одеса": 75294, "Тернопіль": 75417}
    const formatter = new Intl.DateTimeFormat("uk-UA", {
        weekday: "long",
        day: "numeric",
        month: "long"
    })
    for (let i = 0; i < events.length; i++) {
        events[i].human_date = formatter.format(new Date(events[i].event_date))
    }

    return '<b>дайджест вечірок на тиждень</b>✨' +
        events.map(event => {
            return `
                <b><span>${event.human_date}</span></b>
                ${event.event_brief}
        `;
        }).join(""); // Joining the array to create a single HTML string
}

// const data: Event[] = [
//     { id: 12, event_brief: "Event One", event_date: "2024-10-01" },
//     { id: 3, event_brief: "Event Two", event_date: "2024-11-15" }
// ];
// const data = await events()
const eventsHtml = renderHtmlForTelegram(await events());
console.log(eventsHtml);