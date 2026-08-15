// Get saved activities from localStorage
let activities = JSON.parse(localStorage.getItem("fitnessActivities")) || [];


// Form submission
document.getElementById("fitnessForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const activity = document.getElementById("activity").value;
    const duration = Number(document.getElementById("duration").value);
    const steps = Number(document.getElementById("steps").value);
    const calories = Number(document.getElementById("calories").value);
    const water = Number(document.getElementById("water").value);
    const date = document.getElementById("date").value;


    // Create activity record
    const newActivity = {
        activity: activity,
        duration: duration,
        steps: steps,
        calories: calories,
        water: water,
        date: date
    };


    // Add record
    activities.push(newActivity);


    // Save to localStorage
    localStorage.setItem(
        "fitnessActivities",
        JSON.stringify(activities)
    );


    // Clear form
    document.getElementById("fitnessForm").reset();


    // Update app
    updateDashboard();
    displayActivities();
    updateChart();


    alert("Fitness activity saved successfully!");


});


// Update dashboard
function updateDashboard() {

    const today = new Date().toISOString().split("T")[0];

    let totalSteps = 0;
    let totalWorkout = 0;
    let totalCalories = 0;
    let totalWater = 0;


    activities.forEach(function(item) {

        if (item.date === today) {

            totalSteps += item.steps;
            totalWorkout += item.duration;
            totalCalories += item.calories;
            totalWater += item.water;

        }

    });


    document.getElementById("stepsDisplay").innerText = totalSteps;

    document.getElementById("workoutDisplay").innerText =
        totalWorkout;

    document.getElementById("caloriesDisplay").innerText =
        totalCalories;

    document.getElementById("waterDisplay").innerText =
        totalWater;

}


// Display saved activities
function displayActivities() {

    const activityList = document.getElementById("activityList");

    activityList.innerHTML = "";


    if (activities.length === 0) {

        activityList.innerHTML =
            "<p>No activities recorded yet.</p>";

        return;

    }


    activities.forEach(function(item) {

        const activityDiv = document.createElement("div");

        activityDiv.className = "activity-item";


        activityDiv.innerHTML = `
            <h3>${item.activity}</h3>
            <p>📅 Date: ${item.date}</p>
            <p>⏱️ Workout: ${item.duration} minutes</p>
            <p>👟 Steps: ${item.steps}</p>
            <p>🔥 Calories: ${item.calories}</p>
            <p>💧 Water: ${item.water} glasses</p>
        `;


        activityList.appendChild(activityDiv);

    });

}


// Update weekly graph
function updateChart() {

    const days = [
        "mon",
        "tue",
        "wed",
        "thu",
        "fri",
        "sat",
        "sun"
    ];


    // Reset bars
    days.forEach(function(day) {

        document.getElementById(day + "Bar").style.height =
            "10px";

    });


    activities.forEach(function(item) {

        const date = new Date(item.date);

        const dayNumber = date.getDay();

        let dayName;


        if (dayNumber === 0) {
            dayName = "sun";
        } else if (dayNumber === 1) {
            dayName = "mon";
        } else if (dayNumber === 2) {
            dayName = "tue";
        } else if (dayNumber === 3) {
            dayName = "wed";
        } else if (dayNumber === 4) {
            dayName = "thu";
        } else if (dayNumber === 5) {
            dayName = "fri";
        } else {
            dayName = "sat";
        }


        const bar = document.getElementById(dayName + "Bar");


        // Increase bar according to workout time
        let height = item.duration * 3;


        if (height < 10) {
            height = 10;
        }

        if (height > 250) {
            height = 250;
        }


        bar.style.height = height + "px";

    });

}


// Load saved data when page opens
updateDashboard();
displayActivities();
updateChart();