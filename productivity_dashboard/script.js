const dashboard = document.getElementById("dashboard");

const featureCards = document.querySelectorAll(".feature-card");

const featurePages = document.querySelectorAll(".feature-page");

const backButtons = document.querySelectorAll(".backbtn");



function openFeature(id){

    dashboard.style.display = "none";

    featurePages.forEach(page=>{

        page.classList.remove("active");
        page.classList.add("hidden");

    });

    const current = document.getElementById(id);

    current.classList.remove("hidden");
    current.classList.add("active");

}

featureCards.forEach(card=>{

    card.addEventListener("click",()=>{

        openFeature(card.dataset.target);

    });

});

backButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        featurePages.forEach(page=>{

            page.classList.remove("active");
            page.classList.add("hidden");

        });

        dashboard.style.display="block";

    });

});




const themeToggle=document.getElementById("themetoggle");

const savedTheme=localStorage.getItem("theme");

if(savedTheme==="dark"){

    document.body.classList.add("dark");

    themeToggle.innerHTML=
    '<i class="fa-solid fa-sun"></i>';

}

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeToggle.innerHTML=
        '<i class="fa-solid fa-sun"></i>';

        localStorage.setItem("theme","dark");

    }else{

        themeToggle.innerHTML=
        '<i class="fa-solid fa-moon"></i>';

        localStorage.setItem("theme","light");

    }

});



const dateElement=document.getElementById("currentDate");

const timeElement=document.getElementById("currentTime");

function updateDateTime(){

    const now=new Date();

    const dateOptions={

        weekday:"long",

        year:"numeric",

        month:"long",

        day:"numeric"

    };

    dateElement.textContent=
    now.toLocaleDateString("en-US",dateOptions);

    timeElement.textContent=
    now.toLocaleTimeString();

}

updateDateTime();

setInterval(updateDateTime,1000);



function updateBackground(){

    const hour=new Date().getHours();

    let gradient="";

    if(hour>=5 && hour<12){

        gradient=
        "linear-gradient(135deg,#FFE082,#81D4FA)";

    }

    else if(hour>=12 && hour<17){

        gradient=
        "linear-gradient(135deg,#90CAF9,#42A5F5)";

    }

    else if(hour>=17 && hour<20){

        gradient=
        "linear-gradient(135deg,#FFB74D,#F4511E)";

    }

    else{

        gradient=
        "linear-gradient(135deg,#0F172A,#1E293B)";

    }

    document.body.style.background=gradient;

}

updateBackground();

setInterval(updateBackground,60000);



const taskInput = document.getElementById("taskinput");
const addTaskBtn = document.getElementById("addtask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.important) {
            li.classList.add("important");
        }

        li.innerHTML = `

            <span class="task-text ${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div class="actions">

                <button
                    class="star-btn"
                    data-action="important"
                    data-index="${index}"
                    title="Important">

                    ⭐

                </button>

                <button
                    class="complete-btn"
                    data-action="complete"
                    data-index="${index}"
                    title="Complete">

                    ✔

                </button>

                <button
                    class="delete-btn"
                    data-action="delete"
                    data-index="${index}"
                    title="Delete">

                    🗑

                </button>

            </div>

        `;

        taskList.appendChild(li);

    });

}


function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text: text,

        completed: false,

        important: false

    });

    saveTasks();

    renderTasks();

    taskInput.value = "";

    taskInput.focus();

}


addTaskBtn.addEventListener("click", addTask);


taskInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        addTask();

    }

});



taskList.addEventListener("click", function (e) {

    const button = e.target.closest("button");

    if (!button) return;

    const action = button.dataset.action;
    const index = button.dataset.index;

    if (action === "important") {

        tasks[index].important = !tasks[index].important;

    }

    if (action === "complete") {

        tasks[index].completed = !tasks[index].completed;

    }

    if (action === "delete") {

        tasks.splice(index, 1);

    }

    saveTasks();

    renderTasks();

});



renderTasks();



const plannerInputs = document.querySelectorAll(".plannerInput");



function loadPlanner() {

    const plannerData = JSON.parse(localStorage.getItem("planner")) || {};

    plannerInputs.forEach(input => {

        const time = input.dataset.time;

        input.value = plannerData[time] || "";

    });

}


function savePlanner() {

    let plannerData = {};

    plannerInputs.forEach(input => {

        plannerData[input.dataset.time] = input.value;

    });

    localStorage.setItem("planner", JSON.stringify(plannerData));

}



plannerInputs.forEach(input => {

    input.addEventListener("input", savePlanner);

});

loadPlanner();



const goalInput = document.getElementById("goalinput");
const addGoalBtn = document.getElementById("addgoal");
const goalList = document.getElementById("goalList");
const goalProgress = document.getElementById("goalProgress");

let goals = JSON.parse(localStorage.getItem("goals")) || [];



function saveGoals() {

    localStorage.setItem("goals", JSON.stringify(goals));

}



function updateGoalProgress() {

    const completed = goals.filter(goal => goal.completed).length;

    goalProgress.textContent =
        `${completed} of ${goals.length} Completed`;

}


function renderGoals() {

    goalList.innerHTML = "";

    goals.forEach((goal, index) => {

        const li = document.createElement("li");

        li.innerHTML = `

            <span class="goal-text ${goal.completed ? "completed" : ""}">

                ${goal.text}

            </span>

            <div class="actions">

                <button
                    class="complete-btn"
                    data-action="complete"
                    data-index="${index}">

                    ✔

                </button>

                <button
                    class="delete-btn"
                    data-action="delete"
                    data-index="${index}">

                    🗑

                </button>

            </div>

        `;

        goalList.appendChild(li);

    });

    updateGoalProgress();

}



function addGoal() {

    const text = goalInput.value.trim();

    if (text === "") {

        alert("Please enter a goal.");

        return;

    }

    goals.push({

        text: text,

        completed: false

    });

    goalInput.value = "";

    saveGoals();

    renderGoals();

}



addGoalBtn.addEventListener("click", addGoal);



goalInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        addGoal();

    }

});



goalList.addEventListener("click", function (e) {

    const button = e.target.closest("button");

    if (!button) return;

    const action = button.dataset.action;

    const index = button.dataset.index;

    if (action === "complete") {

        goals[index].completed = !goals[index].completed;

    }

    if (action === "delete") {

        goals.splice(index, 1);

    }

    saveGoals();

    renderGoals();

});



renderGoals();



const timerDisplay = document.getElementById("timerdisplay");
const sessionType = document.getElementById("sessionType");

const startTimerBtn = document.getElementById("starttimer");
const pauseTimerBtn = document.getElementById("pausetimer");
const resetTimerBtn = document.getElementById("resettimer");



let workMinutes = 25;
let totalSeconds = workMinutes * 60;

let timer = null;
let isRunning = false;



function updateTimerDisplay() {

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}



function startPomodoro() {

    if (isRunning) return;

    isRunning = true;

    timer = setInterval(() => {

        if (totalSeconds <= 0) {

            clearInterval(timer);

            isRunning = false;

            timerDisplay.textContent = "00:00";

            sessionType.textContent = "Session Complete 🎉";

            alert("Pomodoro Completed! Take a short break.");

            return;

        }

        totalSeconds--;

        updateTimerDisplay();

    }, 1000);

}



function pausePomodoro() {

    clearInterval(timer);

    isRunning = false;

}



function resetPomodoro() {

    clearInterval(timer);

    isRunning = false;

    totalSeconds = workMinutes * 60;

    sessionType.textContent = "Work Session";

    updateTimerDisplay();

}



startTimerBtn.addEventListener("click", startPomodoro);

pauseTimerBtn.addEventListener("click", pausePomodoro);

resetTimerBtn.addEventListener("click", resetPomodoro);



updateTimerDisplay();


const quoteText = document.getElementById("quotetext");
const quoteAuthor = document.getElementById("quoteauthor");
const newQuoteBtn = document.getElementById("newquote");

async function getQuote() {

    quoteText.textContent = "Loading...";
    quoteAuthor.textContent = "";

    try {

        const response = await fetch("https://dummyjson.com/quotes/random");

        if (!response.ok) {
            throw new Error("Unable to fetch quote");
        }

        const data = await response.json();

        quoteText.textContent = `"${data.quote}"`;
        quoteAuthor.textContent = `— ${data.author}`;

    } catch (error) {

        quoteText.textContent =
            "Stay positive. Every small step counts.";

        quoteAuthor.textContent = "— Productivity Dashboard";

    }

}

newQuoteBtn.addEventListener("click", getQuote);

getQuote();



const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");

const weatherCityName = document.getElementById("weathercityname");
const weatherDegree = document.getElementById("weatherdegree");
const weatherStatus = document.getElementById("weatherstatus");
const weatherHumidity = document.getElementById("weatherhumidity");
const weatherWind = document.getElementById("weatherwind");

const API_KEY = "YOUR_API_KEY";

async function getWeather(lat, lon) {

    try {

        const url =
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error("Weather unavailable");

        }

        const data = await response.json();

        city.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        condition.textContent = data.weather[0].main;
        humidity.textContent =
            `Humidity ${data.main.humidity}%`;

        weatherCityName.textContent = data.name;
        weatherDegree.textContent =
            `${Math.round(data.main.temp)}°C`;

        weatherStatus.textContent =
            data.weather[0].description;

        weatherHumidity.textContent =
            `${data.main.humidity}%`;

        weatherWind.textContent =
            `${data.wind.speed} m/s`;

    }

    catch (error) {

        city.textContent = "Unavailable";
        temperature.textContent = "--";
        condition.textContent = "Weather unavailable";
        humidity.textContent = "--";

        weatherCityName.textContent = "Unavailable";
        weatherDegree.textContent = "--";
        weatherStatus.textContent =
            "Unable to load weather";
        weatherHumidity.textContent = "--";
        weatherWind.textContent = "--";

    }

}


function loadWeather() {

    if (!navigator.geolocation) {

        city.textContent = "Not Supported";

        return;

    }

    navigator.geolocation.getCurrentPosition(

        position => {

            getWeather(

                position.coords.latitude,

                position.coords.longitude

            );

        },

        () => {

            city.textContent = "Location Denied";
            condition.textContent =
                "Enable location permission.";

        }

    );

}

loadWeather();



window.addEventListener("load", () => {

    updateDateTime();

    updateBackground();

    renderTasks();

    renderGoals();

    loadPlanner();

});



console.log("Productivity Dashboard Loaded Successfully");