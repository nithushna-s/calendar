// script.js

document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.getElementById('calendar');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Function to get the current date in 'YYYY-MM-DD' format
    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Function to get the last day of the month
    function getLastDayOfMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    // Function to generate the calendar for a specific month and year
    function generateCalendar(year, month) {
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = getLastDayOfMonth(year, month);
        calendarContainer.innerHTML = '';

        let date = 1;

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('calendar-day');

                if ((i === 0 && j < firstDay) || date > lastDay) {
                    // Empty cells before the first day and after the last day
                    dayDiv.textContent = '';
                } else {
                    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    dayDiv.textContent = date;
                    dayDiv.dataset.date = dateString;

                    // Add an event listener to handle clicking on a day
                    dayDiv.addEventListener('click', () => handleDayClick(dayDiv));
                    date++;

                    // Highlight the current day
                    highlightCurrentDay(dayDiv);
                }

                calendarContainer.appendChild(dayDiv);
            }
        }
    }

    // Function to handle clicking on a day
    function handleDayClick(dayDiv) {
        const date = dayDiv.dataset.date;
        alert(`Clicked on ${date}`);
    }

    // Function to update the displayed month and year
    function updateMonthYearDisplay(year, month) {
        const monthNames = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];

        document.getElementById('currentMonthYear').textContent = `${monthNames[month]} ${year}`;
    }

    // Function to show the previous month
    window.previousMonth = function () {
        const currentDate = new Date(document.querySelector('#currentMonthYear').textContent);
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const newYear = newDate.getFullYear();
        const newMonth = newDate.getMonth();
        generateCalendar(newYear, newMonth);
        updateMonthYearDisplay(newYear, newMonth);
    };

    // Function to show the next month
    window.nextMonth = function () {
        const currentDate = new Date(document.querySelector('#currentMonthYear').textContent);
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const newYear = newDate.getFullYear();
        const newMonth = newDate.getMonth();
        generateCalendar(newYear, newMonth);
        updateMonthYearDisplay(newYear, newMonth);
    };

    // Function to highlight the current day
    function highlightCurrentDay(dayDiv) {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const currentDate = today.getDate();

        const dayDate = new Date(dayDiv.dataset.date);
        if (dayDate.getMonth() === currentMonth && dayDate.getFullYear() === currentYear && dayDate.getDate() === currentDate) {
            dayDiv.classList.add('current-day');
        }
    }

    // Function to initialize the calendar when the page loads
    function initializeCalendar() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        generateCalendar(currentYear, currentMonth);
        updateMonthYearDisplay(currentYear, currentMonth);
    }

    // Call the initializeCalendar function when the page loads
    initializeCalendar();
});
