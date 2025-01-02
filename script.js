let eventsData = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
};

function addEvent(day) {
    const eventName = prompt("Nom de l'événement :");
    const eventTime = prompt("Heure de l'événement (format HH:MM) :");

    if (eventName && eventTime) {
        const newEvent = { name: eventName, time: eventTime };
        eventsData[day].push(newEvent);
        displayEvents(day);
        setReminder(eventName, eventTime);
    }
}

function displayEvents(day) {
    const dayElement = document.getElementById(day);
    const eventsList = dayElement.querySelector(".events");
    eventsList.innerHTML = '';
    eventsData[day].forEach(event => {
        const eventItem = document.createElement('li');
        eventItem.textContent = `${event.name} - ${event.time}`;
        eventsList.appendChild(eventItem);
    });
}

function setReminder(eventName, eventTime) {
    const [hour, minute] = eventTime.split(':');
    const eventDate = new Date();
    eventDate.setHours(hour);
    eventDate.setMinutes(minute);
    eventDate.setSeconds(0);

    if (Notification.permission === 'granted') {
        const timeUntilEvent = eventDate.getTime() - Date.now();
        if (timeUntilEvent > 0) {
            setTimeout(() => {
                new Notification(`Rappel : ${eventName}`, {
                    body: `Il est temps pour votre événement ${eventName}!`,
                    icon: 'icons/icon-192x192.png'
                });
            }, timeUntilEvent);
        }
    } else {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                setReminder(eventName, eventTime);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Object.keys(eventsData).forEach(day => displayEvents(day));
    const currentDate = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('current-date').textContent = currentDate;
});
