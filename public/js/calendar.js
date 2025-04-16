// Event calendar
document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: '/api/events',
        eventClick: function(info) {
            const event = info.event;
            const lang = localStorage.getItem('language') || 'en';
            
            const title = lang === 'np' ? 
                (event.extendedProps.title_np || event.title) : 
                event.title;
                
            const description = lang === 'np' ? 
                (event.extendedProps.description_np || event.extendedProps.description) : 
                event.extendedProps.description;
            
            alert(`${title}\n\n${description}\n\nDate: ${event.start.toLocaleDateString()}`);
        }
    });
    
    calendar.render();
    
    // Refresh calendar when language changes
    document.querySelector('.language-toggle').addEventListener('click', () => {
        calendar.refetchEvents();
    });
});