const API_BASE = "http://localhost:8080";

const userEmail = localStorage.getItem("userEmail");

// Show/Hide Add Task Modal
function showAddTaskModal() {
    document.getElementById("taskModal").classList.remove("hidden");
}
function hideAddTaskModal() {
    document.getElementById("taskModal").classList.add("hidden");
}

// Fetch userId using email
async function getUserIdByEmail(email) {
    const res = await fetch(`${API_BASE}/users/email/${email}`);
    if (res.ok) {
        const user = await res.json();
        return user.id;
    } else {
        alert("User not found");
    }
}

// Load tasks for the user
async function loadTasks(userId) {
    const status = document.getElementById("statusFilter").value;
    let url = `${API_BASE}/users/${userId}/tasks`;
    if (status !== "ALL") {
        url += `?status=${status}`;
    }

    const res = await fetch(url);
    const tasks = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.innerHTML = `
      <strong>${task.title}</strong> - ${task.status}<br/>
      ${task.description}<br/>
      Due: ${task.dueDate}<br/>
      ${task.status === "PENDING" ? `<button onclick="markCompleted(${task.id})">Mark as Completed</button>` : ""}
      <hr/>
    `;
        list.appendChild(taskDiv);
    });
}

// Filter tasks
async function filterTasks() {
    const userId = await getUserIdByEmail(userEmail);
    loadTasks(userId);
}

// Mark task as completed
async function markCompleted(taskId) {
    const res = await fetch(`${API_BASE}/tasks/${taskId}/status?status=COMPLETED`, {
        method: "PUT",
    });

    if (res.ok) {
        alert("Task marked as completed");
        init();
    } else {
        alert("Failed to update task status");
    }
}

// Add new task
document.getElementById("addTaskForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const userId = await getUserIdByEmail(userEmail);
    const task = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        dueDate: document.getElementById("dueDate").value,
    };

    const res = await fetch(`${API_BASE}/users/${userId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });

    if (res.ok) {
        alert("Task added");
        document.getElementById("addTaskForm").reset();
        hideAddTaskModal();
        init();
    } else {
        alert("Failed to add task");
    }
});

// Initial load
async function init() {
    const userId = await getUserIdByEmail(userEmail);
    loadTasks(userId);
}

// Load on start
window.onload = () => {
    if (!userEmail) {
        alert("Please login first.");
        window.location.href = "login.html";
    } else {
        init();
    }
};
