document.addEventListener("DOMContentLoaded", function(){
    //Welcome message
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

    //Calendar
    const calendarGrid = document.getElementById("calendar-grid");
    const calendarMonth = document.getElementById("calendar-month");

    let currentDate = new Date();

    function createCalendar(){
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();
        let firstDay = new Date(year, month, 1).getDay();
        let lastDate = new Date(year, month + 1, 0).getDate();

        calendarMonth.textContent = currentDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric"
        });
        calendarGrid.innerHTML = "";

        //Day names
        const days = ["S", "M", "T", "W", "T", "F", "S"];
        days.forEach(function (day){
            let dayElement = document.createElement("div");
            dayElement.className = "calendar-day";
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });

        //Empty spaces before the first date
        for (let i = 0; i < firstDay; i++){
            let emptyCell = document.createElement("div");
            emptyCell.className = "calendar-date empty";
            calendarGrid.appendChild(emptyCell);
        }

        //Calendar dates
        for (let date = 1; date <= lastDate; date++){
            let dateElement = document.createElement("div");
            dateElement.className = "calendar-date";
            dateElement.textContent = date;

            let today = new Date();

            if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()){
                dateElement.classList.add("today");
            }
            calendarGrid.appendChild(dateElement);
        }
    }
    createCalendar();
    
    function changeMonth(direction){
        calendarGrid.classList.add("fade-out");
        setTimeout(function(){
            currentDate.setDate(1);
            currentDate.setMonth(currentDate.getMonth() + direction);
            createCalendar();
            calendarGrid.classList.remove("fade-out");
        }, 200);
    }

    document.getElementById("prev-month").addEventListener("click", function (){
        changeMonth(-1);
    });

    document.getElementById("next-month").addEventListener("click", function (){
        changeMonth(1);
    });

    //To-do list
    const todoInput = document.getElementById("to-do-input");
    const addTodoButton = document.getElementById("add-to-do-btn");
    const todoList = document.getElementById("to-do-list-container");

    let todoTasks = JSON.parse(localStorage.getItem("LIFE9_tasks")) || [];

    function saveTasks(){
        localStorage.setItem("LIFE9_tasks", JSON.stringify(todoTasks));
    }

    function displayTasks(){
        todoList.innerHTML = "";
        todoTasks.forEach(function (task, index){
            let listItem = document.createElement("li");
            listItem.className = "to-do-item";

            if (task.completed){
                listItem.classList.add("completed");
            }
            let taskText = document.createElement("span");
            taskText.textContent = task.text;

            let actions = document.createElement("div");
            actions.className = "to-do-actions";

            //Complete checkbox
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;

            checkbox.addEventListener("change", function (){
                todoTasks[index].completed = checkbox.checked;
                saveTasks();
                displayTasks();
            });

            //Delete button
            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
            deleteButton.setAttribute("aria-label", "Delete task");

            deleteButton.addEventListener("click", function (){
                todoTasks.splice(index, 1);
                saveTasks();
                displayTasks();
            });

            actions.appendChild(checkbox);
            actions.appendChild(deleteButton);
            listItem.appendChild(taskText);
            listItem.appendChild(actions);
            todoList.appendChild(listItem);
        });
    }

    function addTask(){
        let taskText = todoInput.value.trim();

        if (taskText === ""){
            alert("Please enter a task.");
            return;
        }
        todoTasks.push({
            text: taskText,
            completed: false
        });
        saveTasks();
        displayTasks();
        todoInput.value = "";
    }

    addTodoButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function (event){
        if (event.key === "Enter"){
            addTask();
        }
    });
    displayTasks();


    //Quests
    const questCheckboxes = document.querySelectorAll(".quest-item input");
    questCheckboxes.forEach(function (checkbox){
        let savedProgress = localStorage.getItem(checkbox.id);

        checkbox.checked = savedProgress === "true";
        checkbox.addEventListener("change", function () {
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    });


    //Weather
    const temperature = document.getElementById("weather-temperature");
    const weatherDescription = document.getElementById("weather-description");
    const weatherIcon = document.getElementById("weather-icon");

    function getWeather(latitude, longitude){
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;
        fetch(url)
            .then(function (response){
                if (!response.ok){
                    throw new Error("Weather information unavailable");
                }
                return response.json();
            })
            .then(function (data){
                let temp = Math.round(data.current.temperature_2m);
                let code = data.current.weather_code;

                temperature.textContent = temp + "°C";

                if (code === 0){
                    weatherDescription.textContent = "Sunny";
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
                    weatherDescription.textContent = "Snowy";weatherIcon.className = "bi bi-snow";
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
                temperature.textContent = "_ _ °C";
            });
    }

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            function (position){
                getWeather(
                    position.coords.latitude,
                    position.coords.longitude
                );
            },
            function(){
                weatherDescription.textContent = "Location Permission Needed";
            }
        );
    }
    else{
        weatherDescription.textContent = "Location Unavailable";
    }
});