
document.addEventListener("DOMContentLoaded", function(){

    // Welcome message
    let userName = localStorage.getItem("LIFE9_username");

    if (!userName){
        userName = prompt("Enter your name:");

        if (userName && userName.trim() !== ""){
            userName = userName.trim();
            localStorage.setItem("LIFE9_username", userName);
        }
        else{
            userName = "User";
        }
    }

    document.getElementById("user-display-name").textContent = userName;

    // Current date
    const todayDate = document.getElementById("today-date");

    if (todayDate){
        todayDate.textContent = new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    }

    
    // Calendar and To-do List
    const calendarGrid = document.getElementById("calendar-grid");
    const calendarMonth = document.getElementById("calendar-month");
    const prevMonth = document.getElementById("prev-month");
    const nextMonth = document.getElementById("next-month");

    const todoInput = document.getElementById("to-do-input");
    const addTodoButton = document.getElementById("add-to-do-btn");
    const todoList = document.getElementById("to-do-list-container");

    let currentDate = new Date();
    let selectedDate = formatDate(new Date());

    // Create a local date key (YYYY-MM-DD)
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    // Load saved tasks
    let todoTasks = JSON.parse(localStorage.getItem("LIFE9_tasks")) || [];

    function saveTasks() {
        localStorage.setItem("LIFE9_tasks", JSON.stringify(todoTasks));
    }

    // Selected date information
    let selectedDateNote = document.createElement("p");
    selectedDateNote.className = "calendar-selected-note";
    selectedDateNote.style.margin = "10px 12px 12px";
    selectedDateNote.style.fontSize = "13px";
    selectedDateNote.style.color = "#52789b";

    calendarGrid.parentElement.appendChild(selectedDateNote);

    // Display calendar
    function createCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        calendarMonth.textContent = currentDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric"
        });

        calendarGrid.innerHTML = "";

        // Day names
        const days = ["S", "M", "T", "W", "T", "F", "S"];

        days.forEach(function(day) {
            const dayElement = document.createElement("div");
            dayElement.className = "calendar-day";
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });

        // Empty spaces
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.className = "calendar-date empty";
            calendarGrid.appendChild(emptyCell);
        }

        // Calendar dates
        for (let date = 1; date <= lastDate; date++) {
            const dateElement = document.createElement("button");
            dateElement.type = "button";
            dateElement.className = "calendar-date";
            dateElement.textContent = date;

            const dateKey = formatDate(new Date(year, month, date));
            const todayKey = formatDate(new Date());

            if (dateKey === todayKey) {
                dateElement.classList.add("today");
            }

            if (dateKey === selectedDate) {
                dateElement.classList.add("selected");
            }

            // Add a dot if this date has a task
            const hasTasks = todoTasks.some(function(task) {
                return task.date === dateKey;
            });

            if (hasTasks) {
                dateElement.classList.add("has-tasks");
            }

            dateElement.setAttribute(
                "aria-label",
                new Date(year, month, date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                })
            );

            dateElement.addEventListener("click", function() {
                selectedDate = dateKey;
                createCalendar();
                displayTasks();
            });

            calendarGrid.appendChild(dateElement);
        }

        // Display selected date
        const selected = new Date(selectedDate + "T12:00:00");

        selectedDateNote.textContent = "Selected date: " +
            selected.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            });
    }

    // Change month
    function changeMonth(direction) {
        calendarGrid.classList.add("fade-out");

        setTimeout(function() {
            currentDate.setDate(1);
            currentDate.setMonth(currentDate.getMonth() + direction);

            createCalendar();
            calendarGrid.classList.remove("fade-out");
        }, 200);
    }

    prevMonth.addEventListener("click", function() {
        changeMonth(-1);
    });

    nextMonth.addEventListener("click", function() {
        changeMonth(1);
    });

    // Display tasks
    function displayTasks() {
        todoList.innerHTML = "";

        todoTasks.forEach(function(task, index) {
            const listItem = document.createElement("li");
            listItem.className = "to-do-item";

            if (task.completed) {
                listItem.classList.add("completed");
            }

            const taskInfo = document.createElement("div");
            taskInfo.className = "todo-task-info";

            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            taskInfo.appendChild(taskText);

            // Show scheduled date
            if (task.date) {
                const taskDate = document.createElement("small");
                taskDate.className = "todo-task-date";

                taskDate.textContent = new Date(
                    task.date + "T12:00:00"
                ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                });

                taskInfo.appendChild(taskDate);
            }

            const actions = document.createElement("div");
            actions.className = "to-do-actions";

            // Complete checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.setAttribute("aria-label", "Mark task as completed");

            checkbox.addEventListener("change", function() {
                todoTasks[index].completed = checkbox.checked;
                saveTasks();
                displayTasks();
                createCalendar();
            });

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
            deleteButton.setAttribute("aria-label", "Delete task");

            deleteButton.addEventListener("click", function() {
                todoTasks.splice(index, 1);
                saveTasks();
                displayTasks();
                createCalendar();
            });

            actions.appendChild(checkbox);
            actions.appendChild(deleteButton);

            listItem.appendChild(taskInfo);
            listItem.appendChild(actions);

            todoList.appendChild(listItem);
        });
    }

    // Add task to selected date
    function addTask() {
        const taskText = todoInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        todoTasks.push({
            text: taskText,
            completed: false,
            date: selectedDate
        });

        saveTasks();
        displayTasks();
        createCalendar();

        todoInput.value = "";
        todoInput.focus();
    }

    addTodoButton.addEventListener("click", addTask);

    todoInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Initial display
    createCalendar();
    displayTasks();


    // Preparedness checklist
    const questCheckboxes = document.querySelectorAll(".quest-item input");

    questCheckboxes.forEach(function(checkbox){
        let savedProgress = localStorage.getItem(checkbox.id);

        checkbox.checked = savedProgress === "true";

        checkbox.addEventListener("change", function(){
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    });

    // Weather
    const temperature = document.getElementById("weather-temperature");
    const weatherDescription = document.getElementById("weather-description");
    const weatherIcon = document.getElementById("weather-icon");

    function getWeather(latitude, longitude){        
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;

        fetch(url)
            .then(function(response){
                if (!response.ok){
                    throw new Error("Weather information unavailable");
                }

                return response.json();
            })
            .then(function(data){
                let temp = Math.round(data.current.temperature_2m);
                let code = data.current.weather_code;

                temperature.textContent = temp + "°C";

                if (code === 0){
                    weatherDescription.textContent = "Clear Sky";
                    weatherIcon.className = "bi bi-sun-fill";
                }
                else if (code <= 3){
                    weatherDescription.textContent = "Partly Cloudy";
                    weatherIcon.className = "bi bi-cloud-sun-fill";
                }
                else if (code <= 48){
                    weatherDescription.textContent = "Foggy";
                    weatherIcon.className = "bi bi-cloud-fog-fill";
                }
                else if (code <= 67 || (code >= 80 && code <= 82)){
                    weatherDescription.textContent = "Rainy";
                    weatherIcon.className = "bi bi-cloud-rain-fill";
                }
                else if (code >= 71 && code <= 77){
                    weatherDescription.textContent = "Snowy";
                    weatherIcon.className = "bi bi-snow";
                }
                else if (code >= 95){
                    weatherDescription.textContent = "Thunderstorm";
                    weatherIcon.className = "bi bi-cloud-lightning-rain-fill";
                }
                else{
                    weatherDescription.textContent = "Cloudy";
                    weatherIcon.className = "bi bi-cloud-fill";
                }
            })
            .catch(function(){
                weatherDescription.textContent = "Weather Unavailable";
                temperature.textContent = "-- °C";
                weatherIcon.className = "bi bi-cloud-slash";
            });
    }

    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                getWeather(
                    position.coords.latitude,
                    position.coords.longitude
                );
            },
            function() {
                getWeather(16.8409, 96.1735);
                weatherDescription.textContent = "Loading Yangon weather...";
            },
            {
                timeout: 10000,
                maximumAge: 600000
            }
        );
    } else {
        getWeather(16.8409, 96.1735);
    }
});
