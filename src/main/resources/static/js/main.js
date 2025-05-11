let allTasks = [];
let isEditMode = false;

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message');
    const toastClose = toast.querySelector('.toast-close');

    toast.className = `toast ${type}`;
    toastMessage.textContent = message;

    if (type === 'success') {
        toastIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
    } else {
        toastIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
    }

    toast.classList.add('show');

    // Clear previous event listener if any
    toastClose.removeEventListener('click', hideToast);

    // Add new event listener
    toastClose.addEventListener('click', hideToast);

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('show');
}

document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        window.location.href = "login.html";
        return;
    }

    loadTasks(userId);

    document.getElementById("taskForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        // Form validation
        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();
        const dueDate = document.getElementById("dueDate").value;

        if (!title || !description || !dueDate) {
            showToast("Please fill in all fields", 'error');
            return;
        }

        const task = { title, description, dueDate };

        try {
            const url = isEditMode
                ? `http://localhost:8080/tasks/${document.getElementById("taskId").value}`
                : `http://localhost:8080/users/${userId}/tasks`;

            const method = isEditMode ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });

            if (res.ok) {
                showToast(isEditMode ? "Task updated!" : "Task added!");
                await loadTasks(userId);
                document.getElementById("taskForm").reset();
                closeModal();
            } else {
                throw new Error("Failed to save task");
            }
        } catch (error) {
            console.error("Error:", error);
            showToast(error.message, 'error');
        }
    });

    document.getElementById("statusFilter").addEventListener("change", filterTasks);
    document.getElementById("closeModal").addEventListener("click", closeModal);

    // Add event listener for toast close button
    document.querySelector(".toast-close").addEventListener("click", hideToast);
});

function toggleTaskModal(editTask = null) {
    const modal = document.getElementById("taskModal");
    const modalTitle = document.querySelector(".modal-title");
    const submitBtn = document.querySelector("#taskForm button[type='submit']");

    if (editTask) {
        // Edit mode
        isEditMode = true;
        modalTitle.textContent = "Edit Task";
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Task';

        document.getElementById("taskId").value = editTask.id;
        document.getElementById("title").value = editTask.title;
        document.getElementById("description").value = editTask.description;
        document.getElementById("dueDate").value = editTask.dueDate;
    } else {
        // Add mode
        isEditMode = false;
        modalTitle.textContent = "Add New Task";
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Save Task';
        document.getElementById("taskForm").reset();
    }

    modal.classList.toggle("active");
}

function closeModal() {
    document.getElementById("taskModal").classList.remove("active");
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

async function loadTasks(userId) {
    try {
        const res = await fetch(`http://localhost:8080/users/${userId}/tasks`);
        if (!res.ok) throw new Error("Failed to fetch tasks");
        allTasks = await res.json();
        filterTasks();
    } catch (error) {
        console.error("Error:", error);
        showToast("Error loading tasks", 'error');
    }
}

function filterTasks() {
    const selectedStatus = document.getElementById("statusFilter").value;
    const filtered = selectedStatus === "ALL"
        ? allTasks
        : allTasks.filter(task => task.status === selectedStatus);
    renderTasks(filtered);
}

function renderTasks(tasksToRender) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    if (tasksToRender.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-tasks"></i>
                </div>
                <p class="empty-text">No tasks found</p>
                <button onclick="toggleTaskModal()" class="btn btn-primary">
                    Create New Task
                </button>
            </div>
        `;
        return;
    }

    tasksToRender.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.className = `task-card ${task.status.toLowerCase()}`;
        taskElement.setAttribute("data-status", task.status);

        taskElement.innerHTML = `
            <div class="task-header">
                <h3 class="task-title">${task.title}</h3>
                <span class="task-status ${task.status.toLowerCase()}">${task.status}</span>
            </div>
            <p class="task-description">${task.description}</p>
            <div class="task-due">
                <i class="far fa-calendar-alt"></i>
                <span>Due: ${formatDate(task.dueDate)}</span>
            </div>
            <div class="task-actions">
                <button onclick="editTask(${task.id})" class="btn btn-secondary action-btn">
                    <i class="far fa-edit"></i> Edit
                </button>
                ${
            task.status === "PENDING"
                ? `<button onclick="markCompleted(${task.id})" class="btn btn-success action-btn">
                            <i class="far fa-check-circle"></i> Complete
                          </button>`
                : ""
        }
                <button onclick="deleteTask(${task.id})" class="btn btn-danger action-btn">
                    <i class="far fa-trash-alt"></i> Delete
                </button>
            </div>
        `;
        taskList.appendChild(taskElement);
    });
}

async function editTask(taskId) {
    const task = allTasks.find(t => t.id == taskId);
    if (task) {
        toggleTaskModal(task);
    }
}

async function markCompleted(taskId) {
    try {
        const res = await fetch(`http://localhost:8080/tasks/${taskId}/status?status=COMPLETED`, {
            method: "PUT"
        });

        if (res.ok) {
            showToast("Task marked as completed!");
            const userId = localStorage.getItem("userId");
            await loadTasks(userId);
        } else {
            throw new Error("Failed to update task");
        }
    } catch (error) {
        console.error("Error:", error);
        showToast(error.message, 'error');
    }
}

async function deleteTask(taskId) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
        const res = await fetch(`http://localhost:8080/tasks/${taskId}`, {
            method: "DELETE"
        });

        if (res.ok) {
            showToast("Task deleted!");
            const userId = localStorage.getItem("userId");
            await loadTasks(userId);
        } else {
            throw new Error("Failed to delete task");
        }
    } catch (error) {
        console.error("Error:", error);
        showToast(error.message, 'error');
    }
}

function formatDate(dateString) {
    if (!dateString) return "No due date";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}