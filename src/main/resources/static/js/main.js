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
            loadTasks(userId);
            document.getElementById("addTaskForm").reset();
        } else {
            alert("Error adding task.");
        }
    });

    // Handle Close Modal
    document.getElementById("closeModal").addEventListener("click", () => {
        document.getElementById("taskModal").classList.add("hidden");
    });
});

async function loadTasks(userId) {
    const res = await fetch(`http://localhost:8080/users/${userId}/tasks`);
    const tasks = await res.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
      <strong>${task.title}</strong> - ${task.status}<br/>
      ${task.description}<br/>
      Due: ${task.dueDate}<br/>
      ${task.status === "PENDING" ? `<button onclick="markCompleted(${task.id})">Mark as Completed</button>` : ""}
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
        loadTasks(userId);
    } else {
        alert("Failed to update task.");
    }
}
