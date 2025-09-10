// Task arrays
let undoneTasks = [];
let doneTasks = [];

// ✅ Save tasks in localStorage
function saveTasks() {
  localStorage.setItem("undoneTasks", JSON.stringify(undoneTasks));
  localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
}

// ✅ Load tasks from localStorage
function loadTasks() {
  const undone = localStorage.getItem("undoneTasks");
  const done = localStorage.getItem("doneTasks");

  undoneTasks = undone ? JSON.parse(undone) : [];
  doneTasks = done ? JSON.parse(done) : [];

  renderTasks();
}


// Add task
function addTask() {
  let taskInputEl = document.querySelector("#taskInput");
  let taskDateEl = document.querySelector("#taskDate");
  let taskTimeEl = document.querySelector("#taskTime");

  let taskInput = taskInputEl.value.trim();
  let taskDate = taskDateEl.value;
  let taskTime = taskTimeEl.value;
    // Get values from input fields
    
    if (taskInput === "" && taskDate === "" && taskTime === "") {
      alert("⚠️ Please enter a task, date, and time.");
      return;
    } else if (taskInput === "") {
      alert("⚠️ Task description is missing. Please enter your task.");
      return;
    } else if (taskDate === "") {
      alert("⚠️ Task date is missing. Please select a date.");
      return;
    } else if (taskTime === "") {
      alert("⚠️ Task time is missing. Please select a time.");
      return;
    }

    // Create task object (shorthand property syntax)
    let taskTodo = {
        taskInput,
        taskDate,
        taskTime
    };

    // 🚫 Duplicate check (compare taskInput, taskDate, taskTime)
    let isDuplicate = undoneTasks.some(
      (task) =>
        task.taskInput === taskTodo.taskInput &&
        task.taskDate === taskTodo.taskDate &&
        task.taskTime === taskTodo.taskTime
    );
  
    if (isDuplicate) {
      showMessage("⚠️ Duplicate task! This task already exists.");
      return; // stop adding duplicate
    }
    
       // Add task to the list
    
    undoneTasks.push(taskTodo);
    saveTasks(); // ✅ save to localStorage
    showMessage("✅ Task added successfully!", "green");

    // Print all tasks in console
    undoneTasks.forEach((task) => {
        console.log(`Task: ${task.taskInput}, Date: ${task.taskDate}, Time: ${task.taskTime}`);
    });

        //✅ Now we can clear the inputs safely
    taskInputEl.value = "";
    taskDateEl.value = "";
    taskTimeEl.value = "";
    renderTasks();
}

// Mark as Done
function markDone(index) {
  const task = undoneTasks.splice(index, 1)[0];
  doneTasks.push(task);
  saveTasks(); // ✅ save to localStorage
  showMessage("✔ Good job! Task marked as done.", "green");
  renderTasks();
}

// Mark as Undone
function markUndone(index) {
  const task = doneTasks.splice(index, 1)[0];
  undoneTasks.push(task);
  saveTasks(); // ✅ save to localStorage
  showMessage("🤦‍♀️ Task moved to undo .");
  renderTasks();
}

// Delete task
function deleteTask(list, index) {
  list.splice(index, 1);
  saveTasks(); // ✅ save to localStorage
  showMessage("❌Task Deleted.");
  renderTasks();
}

// Render tasks
function renderTasks() {
  const undoneDiv = document.getElementById("undoneTasks");
  const doneDiv = document.getElementById("doneTasks");
  undoneDiv.innerHTML = "";
  doneDiv.innerHTML = "";

  undoneTasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
      ${task.taskInput} - ${task.taskDate} ${task.taskTime}
      <div>
        <button class="done-btn" onclick="markDone(${index})">Done</button>
        <button class="delete-btn" onclick="deleteTask(undoneTasks, ${index})">Delete</button>
      </div>
    `;
    undoneDiv.appendChild(div);
  });

  doneTasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
    <div >
    <span><strong>${task.taskInput}</strong></span>
    <span style="color: gray; font-size: 0.9em;">
      ${task.taskDate} | ${task.taskTime}
    </span>
  </div>
      <div>
        <button class="undo-btn" onclick="markUndone(${index})">Undo</button>
        <button class="delete-btn" onclick="deleteTask(doneTasks, ${index})">Delete</button>
      </div>
    `;
    doneDiv.appendChild(div);
  });

  // Summary
  document.getElementById("summary").innerText =
    `Total Undone: ${undoneTasks.length} | Total Done: ${doneTasks.length}`;
}

// message display function
function showMessage(text, type="info") {
  const msgBox = document.getElementById("messageBox");
  msgBox.innerText = text;
  msgBox.className = `message ${type}`;
  msgBox.style.display = "block";
  setTimeout(() => msgBox.style.display = "none", 2000);
}

// ✅ Load tasks when page loads
window.onload = loadTasks;