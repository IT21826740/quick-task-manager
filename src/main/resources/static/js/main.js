let allTasks = [];

document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
    }

    loadTasks(userId);

    // Handle Add Task Form Submit
    document.getElementById("addTaskForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const task = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            dueDate: document.getElementById("dueDate").value,
        };

        const res = await fetch(`http://localhost:8080/users/${userId}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });

        if (res.ok) {
            alert("Task added!");
            await loadTasks(userId); // reload and re-render
            document.getElementById("addTaskForm").reset();
            closeModal(); // Close modal after adding task
        } else {
            alert("Error adding task.");
        }
    });

    // Handle Filter Change
    document.getElementById("statusFilter").addEventListener("change", filterTasks);

    // Handle Close Modal
    document.getElementById("closeModal").addEventListener("click", closeModal);
});

function toggleTaskModal() {
    document.getElementById("taskModal").classList.toggle("hidden");
}

function closeModal() {
    document.getElementById("taskModal").classList.add("hidden");
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

async function loadTasks(userId) {
    const res = await fetch(`http://localhost:8080/users/${userId}/tasks`);
    allTasks = await res.json(); // store globally
    filterTasks(); // Apply selected filter after loading
}

function filterTasks() {
    const selectedStatus = document.getElementById("statusFilter").value;

    if (selectedStatus === "ALL") {
        renderTasks(allTasks);
    } else {
        const filtered = allTasks.filter(task => task.status === selectedStatus);
        renderTasks(filtered);
    }
}

function renderTasks(tasksToRender) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    if (tasksToRender.length === 0) {
        taskList.innerHTML = "<p>No tasks found.</p>";
        return;
    }

    tasksToRender.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
      <strong>${task.title}</strong> - ${task.status}<br/>
      ${task.description}<br/>
      Due: ${task.dueDate}<br/>
      ${task.status === "PENDING" ? `<button onclick="markCompleted(${task.id})">Mark as Completed</button>` : "<span style='color:green;'>✔ Completed</span>"}
      <hr/>
    `;
        taskList.appendChild(taskElement);
    });
}

async function markCompleted(taskId) {
    const res = await fetch(`http://localhost:8080/tasks/${taskId}/status?status=COMPLETED`, {
        method: "PUT"
    });

    if (res.ok) {
        alert("Task marked as completed.");
        const userId = localStorage.getItem("userId");
        await loadTasks(userId); // Reload and re-filter
    } else {
        alert("Failed to update task.");
    }
}
